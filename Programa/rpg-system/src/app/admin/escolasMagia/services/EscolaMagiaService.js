import BaseService from '../../../../services/BaseService';
import EscolaMagiaRepository from '../repositories/EscolaMagiaRepository';

class EscolaMagiaService extends BaseService {
  constructor() {
    super(EscolaMagiaRepository);
  }

  validate(data) {
    if (!data.nome) throw new Error('O nome da escola de magia é obrigatório.');
    return true;
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      cor: data.cor || '#d4af37',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new EscolaMagiaService();
