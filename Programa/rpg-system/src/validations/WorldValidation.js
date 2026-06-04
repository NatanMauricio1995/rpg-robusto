export class WorldValidation {
  static validateNode(data) {
    if (!data.nome || typeof data.nome !== 'string' || data.nome.trim() === '') {
      return { isValid: false, error: 'O nome é um campo obrigatório e deve ser uma string válida.' };
    }
    if (!data.descricao || typeof data.descricao !== 'string' || data.descricao.trim() === '') {
      return { isValid: false, error: 'A descrição geográfica é obrigatória.' };
    }
    return { isValid: true, error: null };
  }
}
