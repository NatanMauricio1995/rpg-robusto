import BaseService from '../../../../services/BaseService';
import IdiomaRepository from '../repositories/IdiomaRepository';

class IdiomaService extends BaseService {
  constructor() {
    super(IdiomaRepository);
  }

  async save(id, data) {
    // Custom logic before save
    const exists = await this.repository.checkNameExists(data.nome, id);
    if (exists) {
      throw new Error('Já existe um idioma com este nome.');
    }
    return super.save(id, data);
  }

  validate(data) {
    if (!data.nome) {
      throw new Error('O nome do idioma é obrigatório.');
    }
    return true;
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      escrita: data.escrita || '',
      raridade: data.raridade || 'Comum',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new IdiomaService();
