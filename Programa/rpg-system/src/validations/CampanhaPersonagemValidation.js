/**
 * CampanhaPersonagemValidation - Validação de dados da ficha de campanha
 * Baseado em DD-021, DD-022, DD-030, DD-031, DD-040, DD-041
 */
export class CampanhaPersonagemValidation {
  validate(d) {
    const errs = {};
    const data = d || {};

    if (!data.campanhaId) errs.campanhaId = "Campanha é obrigatória.";
    if (!data.personagemId) errs.personagemId = "Personagem base é obrigatório.";
    if (!data.userId) errs.userId = "Usuário dono é obrigatório.";

    if (data.nivel === undefined || typeof data.nivel !== 'number') errs.nivel = "Nível deve ser numérico.";
    if (data.xp === undefined || typeof data.xp !== 'number') errs.xp = "XP deve ser numérica.";
    
    if (data.hpAtual === undefined || typeof data.hpAtual !== 'number') errs.hpAtual = "HP Atual deve ser numérico.";
    if (data.hpMaximo === undefined || typeof data.hpMaximo !== 'number') errs.hpMaximo = "HP Máximo deve ser numérico.";
    if (data.ca === undefined || typeof data.ca !== 'number') errs.ca = "CA deve ser numérica.";

    if (data.moedas === undefined || typeof data.moedas !== 'object') {
      errs.moedas = "Estrutura de moedas inválida.";
    }

    const validStatus = ['Ativo', 'Inativo', 'Morto', 'Ausente'];
    if (!data.status || !validStatus.includes(data.status)) errs.status = "Status inválido.";

    return { 
      isValid: Object.keys(errs).length === 0, 
      errors: errs 
    };
  }
}

export default new CampanhaPersonagemValidation();
