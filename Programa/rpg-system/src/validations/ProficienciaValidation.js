const ProficienciaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da proficiência é obrigatório.');
    }
    return true;
  }
};

export default ProficienciaValidation;
