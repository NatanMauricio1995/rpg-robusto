import BaseService from './BaseService';
import SubRacaRepository from '../repositories/SubRacaRepository';
import SubRacaValidation from '../validations/SubRacaValidation';

class SubRacaService extends BaseService {
  constructor() {
    super(SubRacaRepository);
  }

  validate(data) {
    return SubRacaValidation.validate(data);
  }
...
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      racaId: data.racaId,
      atributos: {
        forca: Number(data.atributos?.forca) || 0,
        destreza: Number(data.atributos?.destreza) || 0,
        constituicao: Number(data.atributos?.constituicao) || 0,
        inteligencia: Number(data.atributos?.inteligencia) || 0,
        sabedoria: Number(data.atributos?.sabedoria) || 0,
        carisma: Number(data.atributos?.carisma) || 0
      },
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new SubRacaService();
