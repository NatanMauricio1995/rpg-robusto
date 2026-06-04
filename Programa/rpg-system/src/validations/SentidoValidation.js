const SentidoValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do sentido é obrigatório.');
    }
    if (data.alcance < 0) {
      throw new Error('O alcance não pode ser negativo.');
    }
    return true;
  }
};

export default SentidoValidation;
