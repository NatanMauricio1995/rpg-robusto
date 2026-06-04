import BaseRepository from './BaseRepository';

/**
 * ApprovalRepository - Repositório para o histórico de aprovações
 */
class ApprovalRepository extends BaseRepository {
  constructor() {
    super('approvalHistory');
  }

  /**
   * Busca o histórico completo de uma entidade específica ordenado por data
   */
  async findByEntity(entityType, entityId) {
    const todos = await this.findAll('createdAt', 'asc') || [];
    return todos.filter(h => h.entityType === entityType && h.entityId === entityId);
  }

  /**
   * Busca registros efetuados por um usuário específico
   */
  async findByUser(userId) {
    return this.search({ usuarioResponsavelId: userId });
  }
}

export default new ApprovalRepository();
