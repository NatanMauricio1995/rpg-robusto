import BaseService from './BaseService';
import EncantamentoRepository from '../repositories/EncantamentoRepository';
import EncantamentoValidation from '../validations/EncantamentoValidation';

class EncantamentoService extends BaseService {
  constructor() { super(EncantamentoRepository); }
  validate(data) {
    return EncantamentoValidation.validate(data);
  }
...
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      raridade: data.raridade || 'Comum',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new EncantamentoService();
