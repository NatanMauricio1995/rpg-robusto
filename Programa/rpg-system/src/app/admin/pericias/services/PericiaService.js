import PericiaRepository from '../repositories/PericiaRepository';

const PericiaService = {
  async getAll() {
    return await PericiaRepository.findAll();
  },

  async getById(id) {
    return await PericiaRepository.findById(id);
  },

  async search(filters) {
    return await PericiaRepository.search(filters);
  },

  async save(id, data) {
    if (!data.nome) {
      throw new Error('O nome da perícia é obrigatório.');
    }

    const payload = {
      nome: data.nome,
      descricao: data.descricao || '',
      atributoBase: data.atributoBase || 'Força',
      treinada: data.treinada !== undefined ? data.treinada : false,
      ativo: data.ativo !== undefined ? data.ativo : true
    };

    if (id) {
      await PericiaRepository.update(id, payload);
      return id;
    } else {
      return await PericiaRepository.create(payload);
    }
  },

  async delete(id) {
    await PericiaRepository.delete(id);
  }
};

export default PericiaService;
