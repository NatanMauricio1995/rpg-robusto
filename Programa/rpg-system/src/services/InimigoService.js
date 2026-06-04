import BaseService from './BaseService';
import InimigoRepository from '../repositories/InimigoRepository';
import InimigoValidation from '../validations/InimigoValidation';

class InimigoService extends BaseService {
  constructor() {
    super(InimigoRepository);
  }

  validate(data) {
    return InimigoValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      nivel: Number(data.nivel) || 1,
      forca: Number(data.forca) || 10,
      destreza: Number(data.destreza) || 10,
      constituicao: Number(data.constituicao) || 10,
      inteligencia: Number(data.inteligencia) || 10,
      sabedoria: Number(data.sabedoria) || 10,
      carisma: Number(data.carisma) || 10,
      hpBase: Number(data.hpBase) || 1,
      caBase: Number(data.caBase) || 10,
      deslocamento: Number(data.deslocamento) || 9,
      resistenciasIds: data.resistenciasIds || [],
      fraquezasIds: data.fraquezasIds || [],
      imunidadesIds: data.imunidadesIds || [],
      habilidadesIds: data.habilidadesIds || [],
      magiasIds: data.magiasIds || [],
      armasIds: data.armasIds || [],
      xpConcedida: Number(data.xpConcedida) || 0,
      lootFixo: data.lootFixo || [],
      lootRolagem: data.lootRolagem || [],
      updatedAt: new Date()
    };
  }
}

export default new InimigoService();
