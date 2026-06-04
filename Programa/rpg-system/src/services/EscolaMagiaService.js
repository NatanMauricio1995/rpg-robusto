import BaseService from './BaseService';
import EscolaMagiaRepository from '../repositories/EscolaMagiaRepository';
import EscolaMagiaValidation from '../validations/EscolaMagiaValidation';

class EscolaMagiaService extends BaseService {
  constructor() {
    super(EscolaMagiaRepository);
  }

  validate(data) {
    return EscolaMagiaValidation.validate(data);
  }
...
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
