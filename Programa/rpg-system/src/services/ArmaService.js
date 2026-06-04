import BaseService from './BaseService';
import ArmaRepository from '../repositories/ArmaRepository';
import ArmaValidation from '../validations/ArmaValidation';

class ArmaService extends BaseService {
  constructor() { super(ArmaRepository); }
  validate(data) { return ArmaValidation.validate(data); }
...
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      dano: data.dano || '1d4',
      tipoDano: data.tipoDano || 'Cortante',
      alcance: data.alcance || 'Corpo-a-corpo',
      peso: Number(data.peso) || 0,
      valor: Number(data.valor) || 0,
      propriedades: data.propriedades || [],
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}
export default new ArmaService();
