const RacaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da raça é obrigatório.');
    }
    if (data.deslocamento === undefined || data.deslocamento < 0) {
      throw new Error('Deslocamento inválido.');
    }
    return true;
  }
};

export default RacaValidation;
