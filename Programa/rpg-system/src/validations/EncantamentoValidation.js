const EncantamentoValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do encantamento é obrigatório.');
    }
    if (!data.raridade) {
      throw new Error('A raridade do encantamento é obrigatória.');
    }
    if (!data.tipo) {
      throw new Error('O tipo do encantamento é obrigatório.');
    }
    return true;
  }
};

export default EncantamentoValidation;
