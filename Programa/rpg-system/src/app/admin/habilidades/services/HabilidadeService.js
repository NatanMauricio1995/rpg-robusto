import BaseService from '../../../../services/BaseService';
import HabilidadeRepository from '../repositories/HabilidadeRepository';

class HabilidadeService extends BaseService {
  constructor() { super(HabilidadeRepository); }
  validate(data) {
    if (!data.nome) throw new Error('Nome obrigatório.');
  }
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      tipo: data.tipo || 'Ativa',
      custo: Number(data.custo) || 0,
      nivelMinimo: Number(data.nivelMinimo) || 1,
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new HabilidadeService();
