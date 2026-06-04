const MagiaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('Nome obrigatório.');
    }
    if (!data.escolaId) {
      throw new Error('Escola de magia obrigatória.');
    }
    return true;
  }
};

export default MagiaValidation;
