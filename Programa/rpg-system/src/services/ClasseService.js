import BaseService from './BaseService';
import ClasseRepository from '../repositories/ClasseRepository';
import ClasseValidation from '../validations/ClasseValidation';

class ClasseService extends BaseService {
  constructor() {
    super(ClasseRepository);
  }

  validate(data) {
    return ClasseValidation.validate(data);
  }

  transform(data) {
    return {
      nome: data.nome,
      imagem: data.imagem || '',
      descricao: data.descricao || '',
      dadoVida: Number(data.dadoVida) || 8,
      nivelMaximo: 20
    };
  }
}

export default new ClasseService();
