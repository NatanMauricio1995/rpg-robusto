const EscolaMagiaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da escola de magia é obrigatório.');
    }
    return true;
  }
};

export default EscolaMagiaValidation;
