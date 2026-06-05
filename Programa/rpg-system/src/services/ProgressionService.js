import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';
import unlockService from './UnlockService';
import inventoryService from './InventoryService';

/**
 * ProgressionService - Responsável pela orquestração do Level Up.
 * Regras: RN-022 a RN-024 | Integrado ao UnlockService para novos conteúdos.
 */
class ProgressionService {
  constructor() {
    // Tabela padrão de escalonamento de níveis de XP (Acumulativa)
    this.tabelaNiveis = { 
      1: 0, 2: 300, 3: 900, 4: 2700, 5: 6500, 6: 14000, 7: 23000, 8: 34000, 9: 48000, 10: 64000,
      11: 85000, 12: 100000, 13: 120000, 14: 140000, 15: 165000, 16: 195000, 17: 225000, 18: 265000, 19: 305000, 20: 355000
    };
  }

  /**
   * Orquestrador de Level Up: Valida a XP, recalcula HP, concede habilidades e magias automaticamente.
   */
  async checkAndExecuteLevelUp(campanhaPersonagemId) {
    try {
      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha não encontrada.' } };

      const nivelAtual = ficha.nivel || 1;
      const xpAtual = ficha.xp || 0;
      let novoNivel = nivelAtual;

      // Determinar o nível correspondente à XP acumulada
      for (let lvl = 1; lvl <= 20; lvl++) {
        if (xpAtual >= this.tabelaNiveis[lvl]) {
          novoNivel = lvl;
        }
      }

      if (novoNivel > nivelAtual) {
        // RN-022: Recuperação total e aumento do HP Máximo ao subir de nível
        const hpMaxAntigo = ficha.hpMaximo || 10;
        // Simulação de ganho baseado em dado de vida médio (8) + Mod. Const (aqui simplificado)
        const ganhoPorNivel = 8; 
        const novoHpMax = hpMaxAntigo + (ganhoPorNivel * (novoNivel - nivelAtual));

        // 1. Atualizar base de sobrevivência e nível
        await campanhaPersonagemRepository.update(campanhaPersonagemId, {
          nivel: novoNivel,
          hpMaximo: novoHpMax,
          hpAtual: novoHpMax, // Cura total no Level Up (RN-022)
          updatedAt: new Date().toISOString()
        });

        // RN-094 / RN-095: Validar requisitos de equipamentos após subida de nível
        await inventoryService.checkEquippedRequirements(campanhaPersonagemId);

        // 2. Disparar desbloqueio de conteúdo dinâmico (RN-023, RN-024)
        const unlockRes = await unlockService.unlockLevelContent(campanhaPersonagemId, novoNivel);

        return {
          success: true,
          data: {
            leveledUp: true,
            nivelAnterior: nivelAtual,
            novoNivel,
            novoHpMax,
            desbloqueios: unlockRes.success ? unlockRes.data : null
          },
          error: null
        };
      }

      return { success: true, data: { leveledUp: false, nivel: nivelAtual }, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'PROGRESSION_ERROR', message: err.message } };
    }
  }
}

export default new ProgressionService();
