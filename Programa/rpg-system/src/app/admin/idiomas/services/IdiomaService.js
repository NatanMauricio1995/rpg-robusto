import IdiomaRepository from '../repositories/IdiomaRepository';

const IdiomaService = {
  async getAll() {
    return await IdiomaRepository.findAll();
  },

  async getById(id) {
    return await IdiomaRepository.findById(id);
  },

  async search(filters) {
    return await IdiomaRepository.search(filters);
  },

  async save(id, data) {
    // Basic validation
    if (!data.nome) {
      throw new Error('O nome do idioma é obrigatório.');
    }

    // Check unique name
    const exists = await IdiomaRepository.checkNameExists(data.nome, id);
    if (exists) {
      throw new Error('Já existe um idioma com este nome.');
    }

    const payload = {
      nome: data.nome,
      descricao: data.descricao || '',
      escrita: data.escrita || '',
      raridade: data.raridade || 'Comum',
      ativo: data.ativo !== undefined ? data.ativo : true
    };

    if (id) {
      await IdiomaRepository.update(id, payload);
      return id;
    } else {
      return await IdiomaRepository.create(payload);
    }
  },

  async delete(id) {
    await IdiomaRepository.delete(id);
  }
};

export default IdiomaService;
