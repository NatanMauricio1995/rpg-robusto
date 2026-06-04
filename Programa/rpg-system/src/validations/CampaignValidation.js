/**
 * CampaignValidation - Validação de dados de campanhas
 */
export class CampaignValidation {
  validate(d) {
    const errs = {};
    if (!d?.nome?.trim()) errs.nome = "O nome da campanha é obrigatório.";
    if (!d?.mestreId) errs.mestreId = "O ID do mestre é obrigatório.";
    
    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new CampaignValidation();
