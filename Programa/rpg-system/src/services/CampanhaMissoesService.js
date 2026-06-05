import repo from '../repositories/CampanhaMissoesRepository';

/**
 * CampanhaMissoesService - Regras de negócio para instâncias de missões em campanhas
 * RN-052: Missões são globais. Campanhas instanciam missões através desta entidade.
 */
class CampanhaMissoesService {
  /**
   * Vincula uma missão global a uma campanha
   */
  async assignMission(d) {
    if (!d.campanhaId || !d.missaoId) {
      return { success: false, data: null, error: { message: "campanhaId e missaoId são obrigatórios." } };
    }

    try {
      const res = await repo.create({
        campanhaId: d.campanhaId,
        missaoId: d.missaoId,
        capituloId: d.capituloId || null,
        status: d.status || 'DISPONIVEL'
      });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Atualiza o status de uma missão na campanha
   */
  async updateStatus(id, status) {
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
   * Busca todas as missões de uma campanha
   */
  async getMissionsByCampaign(campanhaId) {
    try {
      const res = await repo.findByCampanha(campanhaId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Busca detalhes de um vínculo específico
   */
  async getCampanhaMissao(id) {
    try {
      const res = await repo.findById(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Remove um vínculo de missão (caso necessário)
   */
  async removeMissionFromCampaign(id) {
    try {
      const res = await repo.delete(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }
}

export default new CampanhaMissoesService();
