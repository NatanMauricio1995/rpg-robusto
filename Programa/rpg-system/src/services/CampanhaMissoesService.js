import repo from '../repositories/CampanhaMissoesRepository';
import val from '../validations/CampanhaMissoesValidation';
import campaignSrv from './CampaignService';
import missionSrv from './MissaoService';
import chapterSrv from './CapituloService';
import { ROLES } from '../constants/roles';

/**
 * CampanhaMissoesService - Regras de negócio para o fluxo FC-004
 */
class CampanhaMissoesService {
  /**
   * Associa uma missão global a uma campanha
   */
  async assignMission(d, currentUser) {
    this._checkPermission(currentUser);

    const data = { ...d, status: 'DISPONIVEL' };
    const v = val.validate(data);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      // Verificar duplicidade
      const exists = await repo.findAssociation(data.campanhaId, data.missaoId);
      if (exists) return { success: false, data: null, error: { message: "Esta missão já está associada a esta campanha." } };

      // Verificar existência das entidades
      const [campaign, mission] = await Promise.all([
        campaignSrv.getCampaign(data.campanhaId),
        missionSrv.findById(data.missaoId)
      ]);

      if (!campaign.success || !campaign.data) return { success: false, data: null, error: { message: "Campanha não encontrada." } };
      if (!mission) return { success: false, data: null, error: { message: "Missão global não encontrada." } };

      if (data.capituloId) {
        const chapter = await chapterSrv.findById(data.capituloId);
        if (!chapter) return { success: false, data: null, error: { message: "Capítulo não encontrado." } };
      }

      const res = await repo.create({
        campanhaId: data.campanhaId,
        missaoId: data.missaoId,
        capituloId: data.capituloId || null,
        status: data.status
      });

      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Atualiza o status de uma missão na campanha
   */
  async updateStatus(id, status, currentUser) {
    this._checkPermission(currentUser);

    const validStatus = ['DISPONIVEL', 'EM_ANDAMENTO', 'CONCLUIDA', 'FALHADA'];
    if (!validStatus.includes(status)) {
      return { success: false, data: null, error: { message: "Status inválido." } };
    }

    try {
      const res = await repo.update(id, { status });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Remove a associação de missão
   */
  async removeMission(id, currentUser) {
    this._checkPermission(currentUser);
    try {
      const res = await repo.delete(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Busca missões de uma campanha
   */
  async getCampaignMissions(campanhaId) {
    try {
      const res = await repo.findByCampaignId(campanhaId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Busca missões de um capítulo específico
   */
  async getChapterMissions(capituloId) {
    try {
      const res = await repo.findByCapituloId(capituloId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Busca uma associação específica
   */
  async getAssociation(campanhaId, missaoId) {
    try {
      const res = await repo.findAssociation(campanhaId, missaoId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Verifica permissão de MESTRE
   */
  _checkPermission(user) {
    if (!user || user.role !== ROLES.MESTRE) {
      throw new Error("Apenas o MESTRE pode realizar esta ação.");
    }
  }
}

export default new CampanhaMissoesService();
