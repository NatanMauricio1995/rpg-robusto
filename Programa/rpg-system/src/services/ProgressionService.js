import BaseService from './BaseService';
import XPService from './XPService';

/**
 * ProgressionService - Responsável por XP, Nível e Progressão
 * Conforme Capítulo 14 da Arquitetura BackEnd
 */
class ProgressionService extends BaseService {
  constructor() {
    super(null);
  }

  /**
   * Adiciona XP a um personagem e verifica subida de nível
   */
  async addXP(characterId, amount) {
    // RN-90: Único autorizado a alterar XP
    // Implementação pendente
  }

  /**
   * Calcula o nível baseado no XP total
   */
  calculateLevel(totalXP) {
    // Implementação pendente
    return 1;
  }

  /**
   * Processa a subida de nível de um personagem
   */
  async levelUp(characterId) {
    // Implementação pendente
  }
}

export default new ProgressionService();
