const ArmaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome da arma é obrigatório.');
    }
    if (!data.tipo) {
      throw new Error('O tipo da arma é obrigatório.');
    }
    if (!data.categoria) {
      throw new Error('A categoria da arma é obrigatória.');
    }
    if (!data.dano) {
      throw new Error('O dano da arma é obrigatório.');
    }
    return true;
  }
};

export default ArmaValidation;
