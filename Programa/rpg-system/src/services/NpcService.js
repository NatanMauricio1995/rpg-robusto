import BaseService from './BaseService';
import NpcRepository from '../repositories/NpcRepository';
import NpcValidation from '../validations/NpcValidation';

class NpcService extends BaseService {
  constructor() {
    super(NpcRepository);
  }

  validate(data) {
    return NpcValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      personalidade: data.personalidade || '',
      historia: data.historia || '',
      localId: data.localId || '',
      faccaoId: data.faccaoId || null,
      organizacaoId: data.organizacaoId || null,
      missoesIds: data.missoesIds || [],
      lojasIds: data.lojasIds || [],
      ativo: data.ativo !== undefined ? data.ativo : true
    };
  }
}

export default new NpcService();
