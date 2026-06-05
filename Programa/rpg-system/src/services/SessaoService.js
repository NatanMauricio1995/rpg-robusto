import repo from '../repositories/SessaoRepository';
import val from '../validations/SessaoValidation';
import campaignSrv from './CampaignService';
import chapterSrv from './CapituloService';
import { ROLES } from '../constants/roles';

/**
 * SessaoService - Regras de negócio para Sessões (FC-005)
 */
class SessaoService {
  /**
   * Cria uma nova sessão
   */
  async createSessao(d, currentUser) {
    this._checkPermission(currentUser);
    const v = val.validate(d);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      // Validar campanha
      const camp = await campaignSrv.getCampaign(d.campanhaId);
      if (!camp.success || !camp.data) return { success: false, data: null, error: { message: "Campanha não encontrada." } };

      // Validar capítulo (opcional)
      if (d.capituloId) {
        const cap = await chapterSrv.findById(d.capituloId);
        if (!cap) return { success: false, data: null, error: { message: "Capítulo não encontrado." } };
      }

      // Validar unicidade do número da sessão
      const exists = await repo.findByNumeroSessao(d.campanhaId, d.numeroSessao);
      if (exists) return { success: false, data: null, error: { message: `A sessão número ${d.numeroSessao} já existe nesta campanha.` } };

      const res = await repo.create({
        campanhaId: d.campanhaId,
        capituloId: d.capituloId || null,
        numeroSessao: Number(d.numeroSessao),
        titulo: d.titulo,
        descricao: d.descricao || '',
        dataSessao: d.dataSessao,
        xpSessao: Number(d.xpSessao || 0),
        observacoesMestre: d.observacoesMestre || ''
      });

      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Atualiza uma sessão
   */
  async updateSessao(id, d, currentUser) {
    this._checkPermission(currentUser);
    try {
      const current = await repo.findById(id);
      if (!current) return { success: false, data: null, error: { message: "Sessão não encontrada." } };

      if (d.numeroSessao && Number(d.numeroSessao) !== current.numeroSessao) {
        const exists = await repo.findByNumeroSessao(current.campanhaId, d.numeroSessao);
        if (exists) return { success: false, data: null, error: { message: `A sessão número ${d.numeroSessao} já existe.` } };
      }

      const res = await repo.update(id, d);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Remove uma sessão
   */
  async deleteSessao(id, currentUser) {
    this._checkPermission(currentUser);
    try {
      await repo.delete(id);
      return { success: true, data: id, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Obtém detalhes de uma sessão (com proteção de DD-264)
   */
  async getSessao(id, currentUser) {
    try {
      const res = await repo.findById(id);
      if (!res) return { success: false, data: null, error: { message: "Sessão não encontrada." } };
      
      const sessao = this._sanitize(res, currentUser);
      return { success: true, data: sessao, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Lista sessões por campanha
   */
  async listByCampaign(campanhaId, currentUser) {
    try {
      const res = await repo.findByCampaignId(campanhaId);
      const sessoes = res.map(s => this._sanitize(s, currentUser));
      return { success: true, data: sessoes, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Lista sessões por capítulo
   */
  async listByCapitulo(capituloId, currentUser) {
    try {
      const res = await repo.findByCapituloId(capituloId);
      const sessoes = res.map(s => this._sanitize(s, currentUser));
      return { success: true, data: sessoes, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Proteção de DD-264 e Permissões
   */
  _sanitize(sessao, user) {
    if (!user || user.role !== ROLES.MESTRE) {
      const { observacoesMestre, ...publicData } = sessao;
      return publicData;
    }
    return sessao;
  }

  _checkPermission(user) {
    if (!user || user.role !== ROLES.MESTRE) {
      throw new Error("Ação permitida apenas para o MESTRE.");
    }
  }
}

export default new SessaoService();
