import BaseService from './BaseService';
import RacaRepository from '../repositories/RacaRepository';
import RacaValidation from '../validations/RacaValidation';

class RacaService extends BaseService {
  constructor() {
    super(RacaRepository);
  }

  validate(data) {
    return RacaValidation.validate(data);
  }
...
  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      deslocamento: Number(data.deslocamento) || 9,
      tamanho: data.tamanho || 'Médio',
      idiomas: data.idiomas || [],
      sentidos: data.sentidos || [],
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

export default new RacaService();
