const ClasseValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da classe é obrigatório.');
    }
    if (!data.descricao) {
      throw new Error('A descrição da classe é obrigatória.');
    }
    if (!data.dadoVida) {
      throw new Error('O dado de vida da classe é obrigatório.');
    }
    return true;
  }
};

export default ClasseValidation;
