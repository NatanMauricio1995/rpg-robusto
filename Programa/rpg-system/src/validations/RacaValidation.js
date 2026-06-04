const RacaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da raça é obrigatório.');
    }
    if (data.nome.length < 3) {
      throw new Error('O nome da raça deve ter pelo menos 3 caracteres.');
    }
    if (!data.tamanho) {
      throw new Error('O tamanho da raça é obrigatório.');
    }
    if (data.deslocamento === undefined || data.deslocamento < 0) {
      throw new Error('O deslocamento é obrigatório e não pode ser negativo.');
    }
    if (data.expectativaVida !== undefined && data.expectativaVida < 0) {
      throw new Error('A expectativa de vida não pode ser negativa.');
    }
    
    // Validar atributos bônus (podem ser 0 ou negativos, mas geralmente positivos)
    const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
    atributos.forEach(attr => {
      if (data[attr] !== undefined && isNaN(Number(data[attr]))) {
        throw new Error(`O valor de ${attr} deve ser um número.`);
      }
    });

    return true;
  }
};

export default RacaValidation;
