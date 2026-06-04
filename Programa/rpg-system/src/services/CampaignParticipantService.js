import partRepo from '../repositories/CampaignParticipantRepository';
import partVal from '../validations/CampaignParticipantValidation';

/**
 * CampaignParticipantService - Regras de negócio para participantes
 */
class CampaignParticipantService {
  async addParticipant(d) {
    const v = await partVal.validate(d);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      const res = await partRepo.create({
        ...d,
        status: 'ATIVO',
        joinedAt: new Date().toISOString()
      });
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
