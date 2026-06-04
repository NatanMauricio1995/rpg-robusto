import BaseService from '../../../../services/BaseService';
import EncantamentoRepository from '../repositories/EncantamentoRepository';

class EncantamentoService extends BaseService {
  constructor() { super(EncantamentoRepository); }
  validate(data) {
    if (!data.nome) throw new Error('Nome obrigatório.');
  }
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      raridade: data.raridade || 'Comum',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new EncantamentoService();
