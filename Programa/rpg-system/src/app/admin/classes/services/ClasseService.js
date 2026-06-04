import BaseService from '../../../../services/BaseService';
import ClasseRepository from '../repositories/ClasseRepository';

class ClasseService extends BaseService {
  constructor() {
    super(ClasseRepository);
  }

  validate(data) {
    if (!data.nome) throw new Error('O nome da classe é obrigatório.');
    if (!data.dadoVida) throw new Error('O dado de vida é obrigatório.');
    return true;
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      dadoVida: Number(data.dadoVida) || 8,
      periciasDisponiveis: data.periciasDisponiveis || [],
      quantidadePericias: Number(data.quantidadePericias) || 2,
      proficiencias: data.proficiencias || [],
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new ClasseService();
