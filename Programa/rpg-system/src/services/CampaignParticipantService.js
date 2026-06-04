import partRepo from '../repositories/CampaignParticipantRepository';
import partVal from '../validations/CampaignParticipantValidation';
import fichaService from './CampanhaPersonagemService';
import personagemService from './PersonagemService';
import inviteRepo from '../repositories/CampaignInviteRepository';

/**
 * CampaignParticipantService - Regras de negócio para participantes
 * Integrado com Fichas de Campanha e Convites
 */
class CampaignParticipantService {
  /**
   * Fluxo Automático Interconectado: Aceite de Convite -> Criação de Participante -> Criação de Ficha
   * Conforme Fluxos FC-002, FC-003 e RN-025 a RN-029
   */
  async joinCampaign({ inviteId, personagemId }) {
    try {
      // 1. Validar e buscar convite
      const invite = await inviteRepo.findById(inviteId);
      if (!invite || invite.status !== 'PENDENTE') {
        return { success: false, data: null, error: { message: "Convite inválido ou já processado." } };
      }

      // 2. Buscar dados do Personagem Base para herança estática
      const charRes = await personagemService.getCharacter(personagemId);
      if (!charRes.success || !charRes.data) {
        return { success: false, data: null, error: { message: "Personagem base não encontrado." } };
      }
      const pBase = charRes.data;

      // 3. Validar duplicidade e regras de negócio via Validation existente
      const v = await partVal.validate({ campanhaId: invite.campanhaId, usuarioId: invite.usuarioId, personagemId });
      if (!v.isValid) return { success: false, data: null, error: v.errors };

      // 4. Inicializar e criar a Ficha de Campanha isolada (Campos obrigatórios + Dados herdados)
      // PROIBIÇÃO: Dados dinâmicos (xp, moedas, inventario) nascem zerados e isolados.
      const fichaData = {
        campanhaId: invite.campanhaId,
        personagemId: personagemId,
        usuarioId: invite.usuarioId,
        nome: pBase.nome,
        raca: pBase.raca,
        subRaca: pBase.subRaca || null,
        classe: pBase.classe,
        subclasse: pBase.subclasse || null,
        atributos: pBase.atributos,
        imagem: pBase.imagem || null,
        nivel: pBase.nivel || 1,
        xp: 0,
        moedas: { po: 0, pp: 0, pc: 0 },
        hpAtual: pBase.hpMaximo || 10,
        hpMaximo: pBase.hpMaximo || 10,
        ca: pBase.ca || 10,
        inventario: [],
        equipamentos: [],
        status: 'ATIVO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const fichaRes = await fichaService.createSheet(fichaData);
      if (!fichaRes.success) return fichaRes;

      // 5. Criar o registro do Participante associando a Ficha gerada
      const partData = {
        campanhaId: invite.campanhaId,
        usuarioId: invite.usuarioId,
        personagemId: personagemId,
        campanhaPersonagemId: fichaRes.data.id,
        papel: 'JOGADOR',
        status: 'ATIVO',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const participantId = await partRepo.create(partData);
      const participant = { id: participantId, ...partData };

      // 6. Atualizar status do convite para concluído
      await inviteRepo.update(inviteId, { status: 'ACEITO', updatedAt: new Date().toISOString() });

      return {
        success: true,
        data: { participant, fichaCampanha: fichaRes.data },
        error: null
      };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async addParticipant(d) { 
    try {
      const res = await partRepo.create(d);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async removeParticipant(id) { 
    try {
      const res = await partRepo.update(id, { status: 'EXPULSO', removedAt: new Date().toISOString() });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async deactivateParticipant(id) { 
    try {
      const res = await partRepo.update(id, { status: 'INATIVO' });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async listParticipants(cId) { 
    try {
      const res = await partRepo.findByCampaign(cId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }
}

export default new CampaignParticipantService();
