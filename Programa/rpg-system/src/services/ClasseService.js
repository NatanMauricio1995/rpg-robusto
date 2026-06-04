import BaseService from './BaseService';
import ClasseRepository from '../repositories/ClasseRepository';
import ClasseValidation from '../validations/ClasseValidation';

class ClasseService extends BaseService {
  constructor() {
    super(ClasseRepository);
  }

  validate(data) {
    return ClasseValidation.validate(data);
  }
...
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
