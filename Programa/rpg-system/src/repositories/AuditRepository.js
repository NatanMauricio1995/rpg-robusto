import BaseRepository from './BaseRepository';

/**
 * AuditRepository - Repositório para gerenciamento da coleção 'auditoria'
 * Armazena o histórico de todas as operações críticas do sistema.
 */
class AuditRepository extends BaseRepository {
  constructor() {
    super('auditoria');
  }

  async findByUser(userId) {
    return this.search({ userId });
  }

  async findByEntity(entityType, entityId) {
    return this.search({ entityType, entityId });
  }

  async findByAction(action) {
    return this.search({ action });
  }

  async findByDateRange(startDate, endDate) {
    // Nota: O BaseRepository search atual é simples, aqui filtramos o resultado do findAll
    const todos = await this.findAll('timestamp', 'desc') || [];
    return todos.filter(log => {
      const ts = log.timestamp;
      return ts >= startDate && ts <= endDate;
    });
  }
}

export default new AuditRepository();
