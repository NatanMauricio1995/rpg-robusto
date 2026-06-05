/**
 * CampanhaMissoesValidation - Validação para associação de missões e campanhas
 */
export class CampanhaMissoesValidation {
  validate(d) {
    const errs = {};
    const data = d || {};

    if (!data.campanhaId) errs.campanhaId = "Campanha é obrigatória.";
    if (!data.missaoId) errs.missaoId = "Missão é obrigatória.";
    
    const validStatus = ['DISPONIVEL', 'EM_ANDAMENTO', 'CONCLUIDA', 'FALHADA'];
    if (!data.status || !validStatus.includes(data.status)) {
      errs.status = "Status inválido ou não fornecido.";
    }

    return {
      isValid: Object.keys(errs).length === 0,
      errors: errs
    };
  }
}

export default new CampanhaMissoesValidation();
