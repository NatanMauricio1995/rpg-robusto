const NpcValidation = {
  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do NPC é obrigatório.');
    }
    if (data.nome.length < 3) {
      throw new Error('O nome do NPC deve ter pelo menos 3 caracteres.');
    }
    if (data.nome.length > 150) {
      throw new Error('O nome do NPC não pode exceder 150 caracteres.');
    }
    if (!data.descricao) {
      throw new Error('A descrição do NPC é obrigatória.');
    }
    if (data.descricao.length > 10000) {
      throw new Error('A descrição do NPC não pode exceder 10.000 caracteres.');
    }
    if (data.personalidade && data.personalidade.length > 10000) {
      throw new Error('A personalidade do NPC não pode exceder 10.000 caracteres.');
    }
    if (data.historia && data.historia.length > 100000) {
      throw new Error('A história do NPC não pode exceder 100.000 caracteres.');
    }
    if (!data.localId) {
      throw new Error('A localização do NPC é obrigatória.');
    }
    return true;
  }
};

export default NpcValidation;
