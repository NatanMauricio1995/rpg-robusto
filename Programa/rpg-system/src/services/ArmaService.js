import BaseService from './BaseService';
import ArmaRepository from '../repositories/ArmaRepository';
import ArmaValidation from '../validations/ArmaValidation';

class ArmaService extends BaseService {
  constructor() {
    super(ArmaRepository);
  }

  validate(data) {
    return ArmaValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      tipo: data.tipo || 'CORPO_A_CORPO',
      categoria: data.categoria || 'SIMPLES',
      dano: data.dano || '',
      tipoDanoId: data.tipoDanoId || '',
      alcance: data.alcance || '',
      peso: Number(data.peso) || 0,
      valor: Number(data.valor) || 0,
      habilidadesIds: data.habilidadesIds || [],
      encantamentosIds: data.encantamentosIds || []
    };
  }
}

export default new ArmaService();
