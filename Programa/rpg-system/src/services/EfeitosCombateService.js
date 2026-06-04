import BaseService from './BaseService';
import EfeitosCombateRepository from '../repositories/EfeitosCombateRepository';

class EfeitosCombateService extends BaseService {
  constructor() {
    super(EfeitosCombateRepository);
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      updatedAt: new Date()
    };
  }
}

export default new EfeitosCombateService();
