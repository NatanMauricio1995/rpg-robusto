import BaseService from '../../../../services/BaseService';
import SentidoRepository from '../repositories/SentidoRepository';

class SentidoService extends BaseService {
  constructor() {
    super(SentidoRepository);
  }

  validate(data) {
    if (!data.nome) throw new Error('O nome do sentido é obrigatório.');
    if (data.alcance < 0) throw new Error('O alcance não pode ser negativo.');
    return true;
  }

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
