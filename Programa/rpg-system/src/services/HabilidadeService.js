import BaseService from './BaseService';
import HabilidadeRepository from '../repositories/HabilidadeRepository';
import HabilidadeValidation from '../validations/HabilidadeValidation';

class HabilidadeService extends BaseService {
  constructor() {
    super(HabilidadeRepository);
  }

  validate(data) {
    return HabilidadeValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      nivelMinimo: Number(data.nivelMinimo) || 1,
      tipo: data.tipo || 'ATIVA',
      recarga: data.recarga || 'NENHUMA',
      usosMaximos: data.usosMaximos !== undefined ? Number(data.usosMaximos) : null,
      possuiEscalonamento: !!data.possuiEscalonamento,
      escalonamento: data.escalonamento || ''
    };
  }
}

export default new HabilidadeService();
