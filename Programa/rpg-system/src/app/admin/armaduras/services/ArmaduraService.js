import BaseService from '../../../../services/BaseService';
import ArmaduraRepository from '../repositories/ArmaduraRepository';

class ArmaduraService extends BaseService {
  constructor() { super(ArmaduraRepository); }
  validate(data) { if (!data.nome) throw new Error('Nome obrigatório.'); }
  transform(data) {
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
