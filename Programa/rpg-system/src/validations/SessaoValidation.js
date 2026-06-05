/**
 * SessaoValidation - Validação de dados de Sessão
 * DD-260, DD-261, DD-262
 */
export class SessaoValidation {
  validate(d) {
    const errs = {};
    const data = d || {};

    if (!data.campanhaId) errs.campanhaId = "Campanha é obrigatória.";

    if (data.numeroSessao === undefined || data.numeroSessao === null || data.numeroSessao === '') {
      errs.numeroSessao = "Número da sessão é obrigatório.";
    } else if (Number(data.numeroSessao) < 1) {
      errs.numeroSessao = "Número da sessão deve ser no mínimo 1.";
    }

    if (!data.titulo) {
      errs.titulo = "Título é obrigatório.";
    } else if (data.titulo.length > 150) {
      errs.titulo = "Título não pode exceder 150 caracteres.";
    }

    if (!data.dataSessao) {
      errs.dataSessao = "Data da sessão é obrigatória.";
    }

    return {
      isValid: Object.keys(errs).length === 0,
      errors: errs
    };
  }
}

export default new SessaoValidation();
