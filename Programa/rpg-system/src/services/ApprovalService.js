import approvalRepository from '../repositories/ApprovalRepository';
import auditService from './AuditService';

// Importação dinâmica de repositórios para mutação de status
import personagemRepository from '../repositories/PersonagemRepository';
import campaignRepository from '../repositories/CampaignRepository';
import missaoRepository from '../repositories/MissaoRepository';
import npcRepository from '../repositories/NpcRepository';
import inimigoRepository from '../repositories/InimigoRepository';
import itemRepository from '../repositories/ItemRepository';
import receitaRepository from '../repositories/ReceitaRepository';

/**
 * ApprovalService - Única porta de entrada para mudanças de status de aprovação.
 * PROIBIÇÃO: Lógicas de aprovação descentralizadas.
 */
class ApprovalService {
  constructor() {
    this.repositories = {
      Personagem: personagemRepository,
      Campanha: campaignRepository,
      Missao: missaoRepository,
      NPC: npcRepository,
      Inimigo: inimigoRepository,
      Item: itemRepository,
      Receita: receitaRepository
    };
  }

  /**
   * Resolve o repositório correto baseado no tipo da entidade
   */
  _getRepository(entityType) {
    const repo = this.repositories[entityType];
    if (!repo) throw new Error(`Repositório para o tipo '${entityType}' não configurado.`);
    return repo;
  }

  /**
   * Valida as permissões do usuário operador
   */
  _validatePermission(user) {
    const role = (user?.role || user?.userRole || '').toUpperCase();
    return ['MESTRE', 'ADMINISTRADOR'].includes(role);
  }

  /**
   * Processa a mudança de status com gravação de histórico e log de auditoria
   */
  async _changeStatus(entityType, entityId, newStatus, user, observation = '') {
    try {
      if (!this._validatePermission(user)) {
        return { success: false, data: null, error: { code: 'FORBIDDEN', message: 'Permissão insuficiente para esta ação.' } };
      }

      const repo = this._getRepository(entityType);
      const entidade = await repo.findById(entityId);
      
      if (!entidade) {
        return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Entidade não localizada.' } };
      }

      const statusAtual = entidade.status || entidade.situacao || 'PENDENTE';
      if (statusAtual === newStatus) {
        return { success: false, data: null, error: { code: 'INVALID_TRANSITION', message: `A entidade já se encontra no estado ${newStatus}.` } };
      }

      // 1. Atualizar a entidade na sua coleção original
      await repo.update(entityId, { 
        status: newStatus, 
        situacao: newStatus, // Compatibilidade com campos legados
        updatedAt: new Date().toISOString() 
      });

      // 2. Gravar no histórico de aprovações
      const historico = await approvalRepository.create({
        entityType,
        entityId,
        statusAnterior: statusAtual,
        statusNovo: newStatus,
        usuarioResponsavel: user.nome || user.name || user.id,
        usuarioResponsavelId: user.id,
        observacao: observation,
        createdAt: new Date().toISOString()
      });

      // 3. Registrar na auditoria global
      await auditService.auditApproval(user, entityType, entityId, entidade.nome || entityType, newStatus, observation);

      return { success: true, data: historico, error: null };
    } catch (e) {
      return { success: false, data: null, error: { code: 'APPROVAL_ERROR', message: e.message } };
    }
  }

  async approve(entityType, entityId, user, observation = '') {
    return this._changeStatus(entityType, entityId, 'APROVADO', user, observation);
  }

  async reject(entityType, entityId, user, motivo = '') {
    return this._changeStatus(entityType, entityId, 'REPROVADO', user, motivo);
  }

  async requestReview(entityType, entityId, user, observacao = '') {
    return this._changeStatus(entityType, entityId, 'EM_AJUSTE', user, observacao);
  }

  async resubmit(entityType, entityId, user) {
    // Nota: Criadores podem reenviar sem ser Mestre/Admin
    try {
      const repo = this._getRepository(entityType);
      const entidade = await repo.findById(entityId);
      if (!entidade) return { success: false, data: null, error: { code: 'NOT_FOUND', message: 'Não encontrado.' } };

      await repo.update(entityId, { status: 'PENDENTE', situacao: 'PENDENTE', updatedAt: new Date().toISOString() });
      
      const hist = await approvalRepository.create({
        entityType, entityId, statusAnterior: entidade.status || 'REPROVADO', statusNovo: 'PENDENTE',
        usuarioResponsavel: user.nome || user.name || user.id, usuarioResponsavelId: user.id,
        observacao: 'Reenviado para análise.', createdAt: new Date().toISOString()
      });

      return { success: true, data: hist, error: null };
    } catch (e) {
      return { success: false, data: null, error: { code: 'RESUBMIT_ERR', message: e.message } };
    }
  }

  async archive(entityType, entityId, user) {
    return this._changeStatus(entityType, entityId, 'ARQUIVADO', user, 'Arquivamento manual administrativo.');
  }

  async getHistory() {
    try {
      const todos = await approvalRepository.findAll('createdAt', 'desc') || [];
      return { success: true, data: todos, error: null };
    } catch (e) {
      return { success: false, data: null, error: { code: 'HISTORY_ERR', message: e.message } };
    }
  }

  async getEntityHistory(entityType, entityId) {
    try {
      const res = await approvalRepository.findByEntity(entityType, entityId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { code: 'ENTITY_HISTORY_ERR', message: e.message } };
    }
  }
}

export default new ApprovalService();
