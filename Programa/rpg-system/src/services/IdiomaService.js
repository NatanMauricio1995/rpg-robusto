import BaseService from './BaseService';
import IdiomaRepository from '../repositories/IdiomaRepository';
import IdiomaValidation from '../validations/IdiomaValidation';

class IdiomaService extends BaseService {
  constructor() {
    super(IdiomaRepository);
  }

  async save(id, data) {
    IdiomaValidation.validate(data);
    // Business Rule
    const exists = await this.repository.checkNameExists(data.nome, id);
    if (exists) {
      throw new Error('Já existe um idioma com este nome.');
    }
    return super.save(id, data);
  }

  validate(data) {
    return IdiomaValidation.validate(data);
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
