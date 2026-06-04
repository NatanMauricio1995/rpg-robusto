const ReceitaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da receita é obrigatório.');
    }
    if (data.dificuldade !== undefined && data.dificuldade < 0) {
      throw new Error('A dificuldade não pode ser negativa.');
    }
    return true;
  }
};

export default ReceitaValidation;
