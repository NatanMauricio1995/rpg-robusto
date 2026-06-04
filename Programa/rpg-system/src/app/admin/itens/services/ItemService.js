import BaseService from '../../../../services/BaseService';
import ItemRepository from '../repositories/ItemRepository';

class ItemService extends BaseService {
  constructor() { super(ItemRepository); }
  validate(data) { if (!data.nome) throw new Error('Nome obrigatório.'); }
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      peso: Number(data.peso) || 0,
      valor: Number(data.valor) || 0,
      encantamentos: data.encantamentos || [],
      raridade: data.raridade || 'Comum',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new ItemService();
