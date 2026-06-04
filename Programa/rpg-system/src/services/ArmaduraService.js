import BaseService from './BaseService';
import ArmaduraRepository from '../repositories/ArmaduraRepository';
import ArmaduraValidation from '../validations/ArmaduraValidation';

class ArmaduraService extends BaseService {
  constructor() { super(ArmaduraRepository); }
  validate(data) { return ArmaduraValidation.validate(data); }
...
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      classeArmadura: Number(data.classeArmadura) || 10,
      penalidade: Number(data.penalidade) || 0,
      peso: Number(data.peso) || 0,
      valor: Number(data.valor) || 0,
      tipo: data.tipo || 'Leve',
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new ArmaduraService();
