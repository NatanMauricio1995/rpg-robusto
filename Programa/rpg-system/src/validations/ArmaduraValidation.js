const ArmaduraValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da armadura é obrigatório.');
    }
    if (!data.categoria) {
      throw new Error('A categoria da armadura é obrigatória.');
    }
    if (data.caBase === undefined || data.caBase === null) {
      throw new Error('A CA base da armadura é obrigatória.');
    }
    return true;
  }
};

export default ArmaduraValidation;
