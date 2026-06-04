import partRepo from '../repositories/CampaignParticipantRepository';

/**
 * CampaignParticipantValidation - Validação de participantes de campanha
 */
export class CampaignParticipantValidation {
  async validate(d) {
    const errs = {};
    if (!d.campanhaId || !d.usuarioId || !d.personagemId) {
      errs.geral = "Campos obrigatórios ausentes (Campanha, Usuário ou Personagem).";
    }

    // RN-029: Não permite duplicidade de personagemId na mesma campanha
    const exists = await partRepo.findSpecific(d.campanhaId, d.personagemId);
    const active = exists.filter(p => p.status === 'ATIVO');
    if (active.length > 0) {
      errs.personagemId = "Este personagem já participa ativamente desta campanha.";
    }

    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new CampaignParticipantValidation();
