import BaseService from '../../../../services/BaseService';
import ProficienciaRepository from '../repositories/ProficienciaRepository';

class ProficienciaService extends BaseService {
  constructor() {
    super(ProficienciaRepository);
  }

  validate(data) {
    if (!data.nome) throw new Error('O nome da proficiência é obrigatório.');
    return true;
  }

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
