import BaseService from './BaseService';
import ReceitaRepository from '../repositories/ReceitaRepository';
import ReceitaValidation from '../validations/ReceitaValidation';

class ReceitaService extends BaseService {
  constructor() {
    super(ReceitaRepository);
  }

  validate(data) {
    return ReceitaValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      categoria: data.categoria || 'Geral',
      dificuldade: Number(data.dificuldade) || 10,
      tempo: data.tempo || '1 hora',
      ferramentas: data.ferramentas || '',
      ingredientes: data.ingredientes || [],
      resultados: data.resultados || [],
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new ReceitaService();
