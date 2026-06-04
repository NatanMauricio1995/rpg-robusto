import BaseService from './BaseService';
import SentidoRepository from '../repositories/SentidoRepository';
import SentidoValidation from '../validations/SentidoValidation';

class SentidoService extends BaseService {
  constructor() {
    super(SentidoRepository);
  }

  validate(data) {
    return SentidoValidation.validate(data);
  }
...
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      alcance: Number(data.alcance) || 0,
      tipo: data.tipo || 'Visual',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new SentidoService();
