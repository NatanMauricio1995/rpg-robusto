const HabilidadeValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da habilidade é obrigatório.');
    }
    if (!data.descricao) {
      throw new Error('A descrição da habilidade é obrigatória.');
    }
    if (!data.tipo) {
      throw new Error('O tipo da habilidade é obrigatório.');
    }
    return true;
  }
};

export default HabilidadeValidation;
