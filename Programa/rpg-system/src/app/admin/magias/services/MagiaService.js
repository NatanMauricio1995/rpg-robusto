import BaseService from '../../../../services/BaseService';
import MagiaRepository from '../repositories/MagiaRepository';

class MagiaService extends BaseService {
  constructor() { super(MagiaRepository); }
  validate(data) {
    if (!data.nome) throw new Error('Nome obrigatório.');
    if (!data.escolaId) throw new Error('Escola de magia obrigatória.');
  }
  transform(data) {
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
