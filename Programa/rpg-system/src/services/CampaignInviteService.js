import inviteRepo from '../repositories/CampaignInviteRepository';
import inviteVal from '../validations/CampaignInviteValidation';
import partService from './CampaignParticipantService';

/**
 * CampaignInviteService - Regras de negócio para convites
 */
class CampaignInviteService {
  async sendInvite(d) {
    const v = await inviteVal.validate(d);
    if (!v.isValid) return { success: false, data: null, error: v.errors };

    try {
      const res = await inviteRepo.create({
        ...d,
        status: 'PENDENTE',
        createdAt: new Date().toISOString()
      });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async cancelInvite(id) {
    try {
      const res = await inviteRepo.update(id, { status: 'CANCELADO' });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async rejectInvite(id) {
    try {
      const res = await inviteRepo.update(id, { status: 'RECUSADO' });
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  /**
   * Aceita convite e gera participante ativo automaticamente
   */
  async acceptInvite(id, pId, cpId) {
    try {
      const invite = await inviteRepo.findById(id);
      if (!invite || invite.status !== 'PENDENTE') {
        return { success: false, data: null, error: { message: "Convite inválido ou já processado." } };
      }

      // Adiciona o participante via service (que valida a RN-029)
      const part = await partService.addParticipant({
        campanhaId: invite.campanhaId,
        usuarioId: invite.usuarioId,
        personagemId: pId,
        campanhaPersonagemId: cpId,
        papel: 'JOGADOR'
      });

      if (!part.success) return part;

      await inviteRepo.update(id, { status: 'ACEITO' });
      return { success: true, data: part.data, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }

  async listInvites(cId) {
    try {
      const res = await inviteRepo.findByCampaign(cId);
      return { success: true, data: res, error: null };
    } catch (e) {
      return { success: false, data: null, error: { message: e.message } };
    }
  }
}

export default new CampaignInviteService();
