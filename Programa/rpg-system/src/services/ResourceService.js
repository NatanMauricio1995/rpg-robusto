import BaseService from './BaseService';

/**
 * ResourceService - Responsável por recursos de classe (Mana, Ki, Fúria, etc)
 * Conforme Capítulo 15 da Arquitetura BackEnd
 */
class ResourceService extends BaseService {
  constructor() {
    super(null);
  }

  /**
   * Consome uma quantidade de um recurso específico
   */
  async consumeResource(characterId, resourceType, amount) {
    // Implementação pendente
  }

  /**
   * Restaura uma quantidade de um recurso específico
   */
  async restoreResource(characterId, resourceType, amount) {
    // Implementação pendente
  }

  /**
   * Realiza um descanso curto, recuperando recursos específicos
   */
  async shortRest(characterId) {
    // Implementação pendente
  }

  /**
   * Realiza um descanso longo, recuperando todos os recursos e HP
   */
  async longRest(characterId) {
    // Implementação pendente
  }
}

export default new ResourceService();
