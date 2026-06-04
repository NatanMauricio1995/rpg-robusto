import BaseService from './BaseService';
import MagiaRepository from '../repositories/MagiaRepository';
import MagiaValidation from '../validations/MagiaValidation';

/**
 * MagiaService - Gerencia regras de negócio de magias
 * Conforme Capitulo 12 da Arquitetura BackEnd
 */
class MagiaService extends BaseService {
  constructor() {
    super(MagiaRepository);
  }

  validate(data) {
    return MagiaValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      descricao: data.descricao || '',
      escolaMagiaId: data.escolaMagiaId,
      nivel: Number(data.nivel) || 0,
      autodidata: !!data.autodidata,
      tempoConjuracao: data.tempoConjuracao || '',
      alcance: data.alcance || '',
      area: data.area || '',
      componentes: data.componentes || [],
      duracao: data.duracao || '',
      dano: data.dano || '',
      cdBase: Number(data.cdBase) || 0,
      possuiEscalonamento: !!data.possuiEscalonamento,
      escalonamento: data.escalonamento || '',
      ativo: data.ativo !== undefined ? data.ativo : true,
      updatedAt: new Date()
    };
  }
}

export default new MagiaService();
