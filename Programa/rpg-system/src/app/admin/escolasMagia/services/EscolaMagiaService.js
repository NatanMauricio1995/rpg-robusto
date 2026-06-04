import EscolaMagiaRepository from '../repositories/EscolaMagiaRepository';

const EscolaMagiaService = {
  async getAll() {
    return await EscolaMagiaRepository.findAll();
  },

  async getById(id) {
    return await EscolaMagiaRepository.findById(id);
  },

  async search(filters) {
    return await EscolaMagiaRepository.search(filters);
  },

  async save(id, data) {
    if (!data.nome) {
      throw new Error('O nome da escola de magia é obrigatório.');
    }

    const payload = {
      nome: data.nome,
      descricao: data.descricao || '',
      cor: data.cor || '#d4af37',
      ativo: data.ativo !== undefined ? data.ativo : true
    };

    if (id) {
      await EscolaMagiaRepository.update(id, payload);
      return id;
    } else {
      return await EscolaMagiaRepository.create(payload);
    }
  },

  async delete(id) {
    await EscolaMagiaRepository.delete(id);
  }
};

export default EscolaMagiaService;
