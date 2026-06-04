const SubRacaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da sub-raça é obrigatório.');
    }
    if (!data.racaId) {
      throw new Error('A raça pai é obrigatória.');
    }
    return true;
  }
};

export default SubRacaValidation;
