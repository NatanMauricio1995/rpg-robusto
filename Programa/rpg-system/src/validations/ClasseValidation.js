const ClasseValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da classe é obrigatório.');
    }
    if (!data.dadoVida) {
      throw new Error('O dado de vida é obrigatório.');
    }
    return true;
  }
};

export default ClasseValidation;
