import BaseService from './BaseService';
import ArmaduraRepository from '../repositories/ArmaduraRepository';
import ArmaduraValidation from '../validations/ArmaduraValidation';

class ArmaduraService extends BaseService {
  constructor() {
    super(ArmaduraRepository);
  }

  validate(data) {
    return ArmaduraValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      categoria: data.categoria || 'LEVE',
      caBase: Number(data.caBase) || 0,
      permiteDestreza: data.permiteDestreza !== undefined ? data.permiteDestreza : true,
      limiteDestreza: data.limiteDestreza !== undefined ? (data.limiteDestreza === null ? null : Number(data.limiteDestreza)) : null,
      peso: Number(data.peso) || 0,
      valor: Number(data.valor) || 0,
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

export default new ArmaduraService();
