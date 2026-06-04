import BaseService from './BaseService';
import ItemRepository from '../repositories/ItemRepository';
import ItemValidation from '../validations/ItemValidation';

class ItemService extends BaseService {
  constructor() { super(ItemRepository); }
  validate(data) { return ItemValidation.validate(data); }
...
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
