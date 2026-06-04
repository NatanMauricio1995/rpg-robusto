const InimigoValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do inimigo é obrigatório.');
    }
    if (data.nome.length < 3) {
      throw new Error('O nome do inimigo deve ter pelo menos 3 caracteres.');
    }
    if (data.nivel === undefined || data.nivel < 1 || data.nivel > 20) {
      throw new Error('O nível deve estar entre 1 e 20.');
    }
    if (data.hpBase === undefined || data.hpBase < 1) {
      throw new Error('O HP Base deve ser pelo menos 1.');
    }
    if (data.caBase === undefined || data.caBase < 0) {
      throw new Error('A CA Base não pode ser negativa.');
    }
    if (data.xpConcedida === undefined || data.xpConcedida < 0) {
      throw new Error('A XP Concedida não pode ser negativa.');
    }
    return true;
  }
};

export default InimigoValidation;
