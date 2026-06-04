const PericiaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da perícia é obrigatório.');
    }
    return true;
  }
};

export default PericiaValidation;
