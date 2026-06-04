import BaseService from '../../../../services/BaseService';
import SubclasseRepository from '../repositories/SubclasseRepository';

class SubclasseService extends BaseService {
  constructor() { super(SubclasseRepository); }
  validate(data) {
    if (!data.nome) throw new Error('Nome obrigatório.');
    if (!data.classeId) throw new Error('Classe pai obrigatória.');
  }
  transform(data) {
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
