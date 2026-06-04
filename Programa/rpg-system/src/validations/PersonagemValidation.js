/**
 * PersonagemValidation - Validação síncrona de dados de personagens
 * Baseado no Dicionário de Dados (DD-010 a DD-025) e Regras de Negócio (RN-025 a RN-031)
 */
class PersonagemValidation {
  /**
   * Valida o objeto completo de dados do personagem.
   * @param {Object} data - Dados contendo nome, raca, subRaca, classe, subclasse, historia, atributos, nivel, status.
   */
  validate(data) {
    const errors = {};
    const d = data || {};

    // Nome (DD-010): Obrigatório
    if (!d.nome || typeof d.nome !== 'string' || d.nome.trim() === '') {
      errors.nome = 'O nome do personagem é obrigatório.';
    }

    // Raça (DD-011): Obrigatório
    if (!d.raca) {
      errors.raca = 'A raça é obrigatória.';
    }

    // Classe (DD-012): Obrigatório
    if (!d.classe) {
      errors.classe = 'A classe é obrigatória.';
    }

    // Nível (DD-013): Obrigatório e numérico
    if (d.nivel === undefined || d.nivel === null || typeof d.nivel !== 'number') {
      errors.nivel = 'O nível é obrigatório e deve ser um número.';
    } else if (d.nivel < 1 || d.nivel > 20) {
      errors.nivel = 'O nível deve estar entre 1 e 20.';
    }

    // Status (RN-031): Obrigatório
    const validStatus = ['Pendente', 'Aprovado', 'Reprovado', 'Em Ajuste'];
    if (!d.status || !validStatus.includes(d.status)) {
      errors.status = 'Status inválido ou não fornecido.';
    }

    // Atributos (DD-014 a DD-019): Objeto com valores numéricos
    if (!d.atributos || typeof d.atributos !== 'object') {
      errors.atributos = 'Os atributos são obrigatórios.';
    } else {
      const listaAtributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
      listaAtributos.forEach(attr => {
        const val = d.atributos[attr];
        if (val === undefined || val === null || typeof val !== 'number') {
          errors[`atributos.${attr}`] = `O atributo ${attr} é obrigatório e deve ser um número.`;
        } else if (val < 1 || val > 30) {
          errors[`atributos.${attr}`] = `O atributo ${attr} deve estar entre 1 e 30.`;
        }
      });
    }

    // História (DD-020): Opcional, mas deve ser string se presente
    if (d.historia && typeof d.historia !== 'string') {
      errors.historia = 'A história deve ser um texto.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}

export default new PersonagemValidation();
