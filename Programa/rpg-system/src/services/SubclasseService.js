import BaseService from './BaseService';
import SubclasseRepository from '../repositories/SubclasseRepository';
import SubclasseValidation from '../validations/SubclasseValidation';

class SubclasseService extends BaseService {
  constructor() { super(SubclasseRepository); }
  validate(data) {
    return SubclasseValidation.validate(data);
  }
...
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      classeId: data.classeId,
      nivelDesbloqueio: Number(data.nivelDesbloqueio) || 3,
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new SubclasseService();
