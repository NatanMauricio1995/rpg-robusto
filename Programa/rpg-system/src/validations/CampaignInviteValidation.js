import inviteRepo from '../repositories/CampaignInviteRepository';

/**
 * CampaignInviteValidation - Validação de convites de campanha
 */
export class CampaignInviteValidation {
  async validate(d) {
    const errs = {};
    if (!d.campanhaId || !d.usuarioId) {
      errs.geral = "Campos obrigatórios ausentes (Campanha ou Usuário).";
    }

    // Proibição: Não permite múltiplos convites PENDENTES para o mesmo usuário na mesma campanha
    const pending = await inviteRepo.findPending(d.campanhaId, d.usuarioId);
    if (pending.length > 0) {
      errs.usuarioId = "Já existe um convite pendente para este usuário nesta campanha.";
    }

    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new CampaignInviteValidation();
