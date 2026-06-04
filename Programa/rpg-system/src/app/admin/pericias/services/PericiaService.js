import BaseService from '../../../../services/BaseService';
import PericiaRepository from '../repositories/PericiaRepository';

class PericiaService extends BaseService {
  constructor() {
    super(PericiaRepository);
  }

  validate(data) {
    if (!data.nome) throw new Error('O nome da perícia é obrigatório.');
    return true;
  }

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
