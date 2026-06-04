import repo from '../repositories/CampaignRepository';
import val from '../validations/CampaignValidation';

/**
 * CampaignService - Regras de negócio para campanhas
 * Conforme Capítulo 16 da Arquitetura BackEnd e Plano de Módulos
 */
class CampaignService {
  /**
   * Cria uma nova campanha
   */
  async createCampaign(d) {
    const v = val.validate(d);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      const res = await repo.create({
        ...d,
        status: 'ATIVA',
        dataInicio: d.dataInicio || new Date().toISOString(),
        dataFim: null,
        mundoId: d.mundoId || null,
        participantes: d.participantes || []
      });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Atualiza dados da campanha
   */
  async updateCampaign(id, d) {
    try {
      const res = await repo.update(id, d);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Encerra oficialmente uma campanha
   */
  async closeCampaign(id) {
    return this.updateCampaign(id, { 
      status: 'ENCERRADA', 
      dataFim: new Date().toISOString() 
    });
  }

  /**
   * Arquiva uma campanha
   */
  async archiveCampaign(id) {
    return this.updateCampaign(id, { status: 'ARQUIVADA' });
  }

  /**
   * Busca detalhes de uma campanha
   */
  async getCampaign(id) {
    try {
      const res = await repo.findById(id);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Lista todas as campanhas
   */
  async getAllCampaigns() {
    try {
      const res = await repo.findAll();
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Adiciona um participante à campanha
   */
  async addParticipant(campaignId, userId) {
    const campaign = await repo.findById(campaignId);
    if (!campaign) return { success: false, data: null, error: { message: "Campanha não encontrada" } };
    
    const participantes = campaign.participantes || [];
    if (participantes.includes(userId)) return { success: false, data: null, error: { message: "Usuário já participa desta campanha" } };
    
    return this.updateCampaign(campaignId, { participantes: [...participantes, userId] });
  }
}

export default new CampaignService();
