import BaseService from './BaseService';
import ProficienciaRepository from '../repositories/ProficienciaRepository';
import ProficienciaValidation from '../validations/ProficienciaValidation';

class ProficienciaService extends BaseService {
  constructor() {
    super(ProficienciaRepository);
  }

  validate(data) {
    return ProficienciaValidation.validate(data);
  }
...
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      categoria: data.categoria || 'Outros',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new ProficienciaService();
