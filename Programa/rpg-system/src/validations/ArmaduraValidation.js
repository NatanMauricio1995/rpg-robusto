const ArmaduraValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('Nome obrigatório.');
    }
    return true;
  }
};

export default ArmaduraValidation;
