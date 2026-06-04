import auditRepository from '../repositories/AuditRepository';

/**
 * AuditService - Responsável pela gravação de logs de auditoria e rastreabilidade.
 * Regra: Registro obrigatório de snapshots 'beforeData' e 'afterData'.
 */
class AuditService {
  /**
   * Cria um registro de log genérico
   */
  async createLog(payload) {
    try {
      const logCompleto = {
        userId: payload.userId || 'SISTEMA',
        userName: payload.userName || 'Sistema Automático',
        userRole: payload.userRole || 'SISTEMA',
        action: payload.action || 'UNKNOWN',
        entityType: payload.entityType || 'GLOBAL',
        entityId: payload.entityId || 'NONE',
        entityName: payload.entityName || 'N/A',
        beforeData: payload.beforeData !== undefined ? JSON.parse(JSON.stringify(payload.beforeData)) : null,
        afterData: payload.afterData !== undefined ? JSON.parse(JSON.stringify(payload.afterData)) : null,
        metadata: payload.metadata || {},
        timestamp: new Date().toISOString(),
        ip: payload.ip || '127.0.0.1',
        sessionId: payload.sessionId || 'sess_local'
      };

      const resId = await auditRepository.create(logCompleto);
      return { success: true, data: { id: resId, ...logCompleto }, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'AUDIT_LOG_CREATION_FAILED', message: err.message } };
    }
  }

  /**
   * Atalho para auditoria de criação
   */
  async auditCreate(user, entityType, entityId, entityName, newData) {
    return this.createLog({
      userId: user?.id, userName: user?.nome || user?.name, userRole: user?.role,
      action: 'CREATE', entityType, entityId, entityName,
      beforeData: null, afterData: newData
    });
  }

  /**
   * Atalho para auditoria de atualização
   */
  async auditUpdate(user, entityType, entityId, entityName, oldData, newData) {
    return this.createLog({
      userId: user?.id, userName: user?.nome || user?.name, userRole: user?.role,
      action: 'UPDATE', entityType, entityId, entityName,
      beforeData: oldData, afterData: newData
    });
  }

  /**
   * Atalho para auditoria de exclusão
   */
  async auditDelete(user, entityType, entityId, entityName, deletedData) {
    return this.createLog({
      userId: user?.id, userName: user?.nome || user?.name, userRole: user?.role,
      action: 'DELETE', entityType, entityId, entityName,
      beforeData: deletedData, afterData: null
    });
  }

  /**
   * Atalho para auditoria de fluxos de aprovação
   */
  async auditApproval(user, entityType, entityId, entityName, status, justification) {
    return this.createLog({
      userId: user?.id, userName: user?.nome || user?.name, userRole: user?.role,
      action: 'APPROVAL', entityType, entityId, entityName,
      metadata: { status, justification }
    });
  }

  /**
   * Recupera histórico de auditoria paginado ou filtrado
   */
  async getAuditLogs(filters = {}) {
    try {
      let data;
      if (filters.entityType && filters.entityId) {
        data = await auditRepository.findByEntity(filters.entityType, filters.entityId);
      } else if (filters.userId) {
        data = await auditRepository.findByUser(filters.userId);
      } else {
        data = await auditRepository.findAll('timestamp', 'desc');
      }
      return { success: true, data, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'AUDIT_FETCH_FAILED', message: err.message } };
    }
  }

  async getLogById(id) {
    try {
      const data = await auditRepository.findById(id);
      return { success: !!data, data, error: data ? null : { code: 'NOT_FOUND', message: 'Log não encontrado' } };
    } catch (err) {
      return { success: false, data: null, error: { code: 'FETCH_ERROR', message: err.message } };
    }
  }
}

export default new AuditService();
