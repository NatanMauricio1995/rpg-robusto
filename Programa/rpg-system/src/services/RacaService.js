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
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      tamanho: data.tamanho || 'MEDIO',
      deslocamento: Number(data.deslocamento) || 9,
      expectativaVida: Number(data.expectativaVida) || 0,
      forca: Number(data.forca) || 0,
      destreza: Number(data.destreza) || 0,
      constituicao: Number(data.constituicao) || 0,
      inteligencia: Number(data.inteligencia) || 0,
      sabedoria: Number(data.sabedoria) || 0,
      carisma: Number(data.carisma) || 0,
      idiomasIds: data.idiomasIds || [],
      sentidosIds: data.sentidosIds || [],
      resistenciasIds: data.resistenciasIds || [],
      fraquezasIds: data.fraquezasIds || [],
      imunidadesIds: data.imunidadesIds || [],
      habilidadesIds: data.habilidadesIds || [],
      magiasIds: data.magiasIds || [],
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new RacaService();
