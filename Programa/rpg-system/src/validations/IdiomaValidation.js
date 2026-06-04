const IdiomaValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do idioma é obrigatório.');
    }
    return true;
  }
};

export default IdiomaValidation;
