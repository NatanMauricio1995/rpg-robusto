import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';

/**
 * ProgressionService - Responsável pela lógica de evolução de nível.
 * Regras: RN-022 a RN-024 | Atualiza exclusivamente a Ficha de Campanha.
 */
class ProgressionService {
  constructor() {
    // Tabela padrão de escalonamento de níveis de XP do RPG Robusto (Acumulativa)
    this.tabelaNiveis = {
      1: 0,
      2: 300,
      3: 900,
      4: 2700,
      5: 6500,
      6: 14000,
      7: 23000,
      8: 34000,
      9: 48000,
      10: 64000,
      11: 85000,
      12: 100000,
      13: 120000,
      14: 140000,
      15: 165000,
      16: 195000,
      17: 225000,
      18: 265000,
      19: 305000,
      20: 355000
    };
  }

  /**
   * Avalia a XP atual da Ficha de Campanha e realiza a progressão automática de nível se aplicável.
   */
  async checkAndExecuteLevelUp(campanhaPersonagemId) {
    try {
      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha não encontrada.' } };

      const nivelAtual = ficha.nivel || 1;
      const xpAtual = ficha.xp || 0;
      let novoNivel = nivelAtual;

      // Determinar o maior nível que o personagem se enquadra de acordo com seu montante de XP
      for (let lvl = 1; lvl <= 20; lvl++) {
        if (xpAtual >= this.tabelaNiveis[lvl]) {
          novoNivel = lvl;
        }
      }

      if (novoNivel > nivelAtual) {
        // Incrementa parâmetros de vida baseados no multiplicador estático simples de progressão da classe
        const hpMaxAntigo = ficha.hpMaximo || 10;
        const ganhoHp = 8; // Média de ganho padrão por nível do sistema
        const novoHpMax = hpMaxAntigo + ganhoHp;

        // RN-022: Recuperação total de HP ao subir de nível
        await campanhaPersonagemRepository.update(campanhaPersonagemId, {
          nivel: novoNivel,
          hpMaximo: novoHpMax,
          hpAtual: novoHpMax, 
          updatedAt: new Date().toISOString()
        });

        return { 
          success: true, 
          data: { 
            leveledUp: true, 
            nivelAnterior: nivelAtual, 
            novoNivel, 
            novoHpMax 
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
