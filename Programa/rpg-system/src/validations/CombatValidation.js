/**
 * CombatValidation - Validação de dados de combate
 */
export class CombatValidation {
  validate(d) {
    const errs = {};
    if (!d.campanhaId) {
      errs.campanhaId = "Campanha vinculada é obrigatória";
    }
    if (d.status === 'ATIVO' && (!d.participantes?.length && !d.inimigos?.length)) {
      errs.geral = "Combate ativo necessita de pelo menos um participante ou inimigo";
    }
    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new CombatValidation();
