const SubclasseValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('Nome obrigatório.');
    }
    if (!data.classeId) {
      throw new Error('Classe pai obrigatória.');
    }
    return true;
  }
};

export default SubclasseValidation;
