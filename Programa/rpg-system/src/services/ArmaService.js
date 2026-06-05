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
      encantamentosIds: data.encantamentosIds || [],
      requisitos: {
        proficienciasIds: data.requisitos?.proficienciasIds || [],
        classesIds: data.requisitos?.classesIds || [],
        atributos: {
          forca: data.requisitos?.atributos?.forca || null,
          destreza: data.requisitos?.atributos?.destreza || null,
          constituicao: data.requisitos?.atributos?.constituicao || null,
          inteligencia: data.requisitos?.atributos?.inteligencia || null,
          sabedoria: data.requisitos?.atributos?.sabedoria || null,
          carisma: data.requisitos?.atributos?.carisma || null
        },
        nivelMinimo: data.requisitos?.nivelMinimo || 1,
        racasIds: data.requisitos?.racasIds || []
      }
    };
  }
}

export default new ArmaService();
