import ProficienciaRepository from '../repositories/ProficienciaRepository';

const ProficienciaService = {
  async getAll() {
    return await ProficienciaRepository.findAll();
  },

  async getById(id) {
    return await ProficienciaRepository.findById(id);
  },

  async search(filters) {
    return await ProficienciaRepository.search(filters);
  },

  async save(id, data) {
    if (!data.nome) {
      throw new Error('O nome da proficiência é obrigatório.');
    }

    const payload = {
      nome: data.nome,
      descricao: data.descricao || '',
      categoria: data.categoria || 'Outros',
      ativo: data.ativo !== undefined ? data.ativo : true
    };

    if (id) {
      await ProficienciaRepository.update(id, payload);
      return id;
    } else {
      return await ProficienciaRepository.create(payload);
    }
  },

  async delete(id) {
    await ProficienciaRepository.delete(id);
  }
};

export default ProficienciaService;
