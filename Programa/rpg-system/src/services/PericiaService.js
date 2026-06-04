import BaseService from './BaseService';
import PericiaRepository from '../repositories/PericiaRepository';
import PericiaValidation from '../validations/PericiaValidation';

class PericiaService extends BaseService {
  constructor() {
    super(PericiaRepository);
  }

  validate(data) {
    return PericiaValidation.validate(data);
  }
...
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      atributoBase: data.atributoBase || 'Força',
      treinada: data.treinada !== undefined ? data.treinada : false,
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new PericiaService();
