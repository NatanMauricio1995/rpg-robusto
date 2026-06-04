import BaseService from './BaseService';
import HabilidadeRepository from '../repositories/HabilidadeRepository';
import HabilidadeValidation from '../validations/HabilidadeValidation';

class HabilidadeService extends BaseService {
  constructor() { super(HabilidadeRepository); }
  validate(data) {
    return HabilidadeValidation.validate(data);
  }
...
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
