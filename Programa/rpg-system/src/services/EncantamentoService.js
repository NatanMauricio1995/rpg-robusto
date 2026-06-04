import BaseService from './BaseService';
import EncantamentoRepository from '../repositories/EncantamentoRepository';
import EncantamentoValidation from '../validations/EncantamentoValidation';

class EncantamentoService extends BaseService {
  constructor() {
    super(EncantamentoRepository);
  }

  validate(data) {
    return EncantamentoValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      raridade: data.raridade || 'COMUM',
      tipo: data.tipo || 'ARMA',
      efeitos: data.efeitos || '',
      modificadores: data.modificadores || '',
      habilidadesIds: data.habilidadesIds || [],
      magiasIds: data.magiasIds || [],
      restricoes: data.restricoes || '',
      valor: Number(data.valor) || 0
    };
  }
}

export default new EncantamentoService();
