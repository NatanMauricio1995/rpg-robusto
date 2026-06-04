import BaseService from './BaseService';

/**
 * ApprovalService - Responsável pelos fluxos de aprovação do sistema
 * Conforme Capítulo 21 da Arquitetura BackEnd
 */
class ApprovalService extends BaseService {
  constructor() {
    super(null);
  }

  /**
   * Aprova uma entidade (personagem, item, etc)
   */
  async approve(entityId, type, userId) {
    // Implementação pendente
  }

  /**
   * Rejeita uma entidade com uma observação
   */
  async reject(entityId, type, userId, observation) {
    // Implementação pendente
  }

  /**
   * Solicita revisão para uma entidade
   */
  async requestReview(entityId, type, userId) {
    // Implementação pendente
  }
}

export default new ApprovalService();
