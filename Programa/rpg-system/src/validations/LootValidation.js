/**
 * LootValidation - Validação de dados de distribuição de loot
 */
export class LootValidation {
  validate(d) {
    const errs = {};
    if (!d.combatId) errs.combatId = "ID do combate é obrigatório";
    if (!d.campanhaId) errs.campanhaId = "ID da campanha é obrigatório";
    if (!d.generatedLoot || !Array.isArray(d.generatedLoot)) {
      errs.generatedLoot = "Lista de loot gerado inválida ou ausente";
    }
    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new LootValidation();
