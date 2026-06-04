import BaseService from './BaseService';
import MagiaRepository from '../repositories/MagiaRepository';
import MagiaValidation from '../validations/MagiaValidation';

class MagiaService extends BaseService {
  constructor() { super(MagiaRepository); }
  validate(data) {
    return MagiaValidation.validate(data);
  }
...
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      escolaId: data.escolaId,
      nivel: Number(data.nivel) || 0,
      alcance: data.alcance || 'Pessoal',
      duracao: data.duracao || 'Instantânea',
      componentes: data.componentes || '',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new MagiaService();
