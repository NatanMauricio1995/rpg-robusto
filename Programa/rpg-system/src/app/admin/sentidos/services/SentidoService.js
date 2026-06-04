import SentidoRepository from '../repositories/SentidoRepository';

const SentidoService = {
  async getAll() {
    return await SentidoRepository.findAll();
  },

  async getById(id) {
    return await SentidoRepository.findById(id);
  },

  async search(filters) {
    return await SentidoRepository.search(filters);
  },

  async save(id, data) {
    if (!data.nome) {
      throw new Error('O nome do sentido é obrigatório.');
    }

    if (data.alcance < 0) {
      throw new Error('O alcance não pode ser negativo.');
    }

    const payload = {
      nome: data.nome,
      descricao: data.descricao || '',
      alcance: Number(data.alcance) || 0,
      tipo: data.tipo || 'Visual',
      ativo: data.ativo !== undefined ? data.ativo : true
    };

    if (id) {
      await SentidoRepository.update(id, payload);
      return id;
    } else {
      return await SentidoRepository.create(payload);
    }
  },

  async delete(id) {
    await SentidoRepository.delete(id);
  }
};

export default SentidoService;
