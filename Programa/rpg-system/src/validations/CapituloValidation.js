/**
 * CapituloValidation - Validações para capítulos de campanha
 */
class CapituloValidation {
  validate(data) {
    const errors = [];

    if (!data.nome || data.nome.trim() === '') {
      errors.push('O nome do capítulo é obrigatório.');
    }

    if (!data.campanhaId) {
      errors.push('A campanha vinculada é obrigatória.');
    }

    if (data.ordem === undefined || data.ordem === null || isNaN(data.ordem) || data.ordem < 1) {
      errors.push('A ordem do capítulo deve ser um número maior ou igual a 1.');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export default new CapituloValidation();
