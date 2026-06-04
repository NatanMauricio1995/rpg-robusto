/**
 * XPService - Utilitário interno para cálculo e distribuição de XP
 * Conforme Capítulo 19 da Arquitetura BackEnd
 * NOTA: Este serviço é utilizado exclusivamente pelo ProgressionService
 */
class XPService {
  /**
   * Calcula o XP ganho em um encontro baseado no desafio (CR)
   */
  calculateXP(enemies = []) {
    // Implementação pendente
    return 0;
  }

  /**
   * Distribui o XP calculado entre os participantes
   */
  distributeXP(totalXP, participantsCount) {
    if (participantsCount <= 0) return 0;
    return Math.floor(totalXP / participantsCount);
  }
}

export default new XPService();
