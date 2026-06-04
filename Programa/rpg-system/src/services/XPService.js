import combatRepository from '../repositories/CombatRepository';
import campanhaPersonagemRepository from '../repositories/CampanhaPersonagemRepository';
import progressionService from './ProgressionService';

/**
 * XPService - Responsável pelo cálculo e distribuição de experiência pós-combate.
 * Regras: RN-019 a RN-021 | Modificações exclusivas na Ficha de Campanha.
 */
class XPService {
  /**
   * Retorna a XP individual de um inimigo contida em seu snapshot.
   */
  calculateEnemyXP(enemy) {
    return enemy && typeof enemy.xp === 'number' ? enemy.xp : 0;
  }

  /**
   * Soma a XP de todos os inimigos derrotados do combate (hpAtual <= 0)
   */
  calculateCombatXP(combat) {
    if (!combat || !Array.isArray(combat.inimigos)) return 0;
    return combat.inimigos
      .filter(enemy => enemy.hpAtual <= 0)
      .reduce((soma, enemy) => soma + this.calculateEnemyXP(enemy), 0);
  }

  /**
   * Divide a XP total de forma igualitária entre os participantes cadastrados
   */
  calculateParticipantXP(totalXP, participants) {
    if (!participants || participants.length === 0 || totalXP <= 0) return 0;
    return Math.floor(totalXP / participants.length);
  }

  /**
   * Aplica a XP diretamente na Ficha de Campanha e dispara o ProgressionService de forma encadeada
   */
  async applyXP(campanhaPersonagemId, xpGanha, logsCombate = []) {
    try {
      if (xpGanha <= 0) {
        return { success: false, data: null, error: { code: 'INVALID_XP_VALUE', message: 'O valor de XP deve ser maior que zero.' } };
      }

      const ficha = await campanhaPersonagemRepository.findById(campanhaPersonagemId);
      if (!ficha) {
        return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha de campanha não localizada.' } };
      }

      const xpAtual = typeof ficha.xp === 'number' ? ficha.xp : 0;
      const novaXp = xpAtual + xpGanha;

      // Persiste a nova XP na Ficha de Campanha (PROIBIÇÃO: Nunca no personagem base)
      await campanhaPersonagemRepository.update(campanhaPersonagemId, {
        xp: novaXp,
        updatedAt: new Date().toISOString()
      });

      logsCombate.push({
        timestamp: new Date().toISOString(),
        action: 'XP_APLICADA',
        actorId: 'XP_SERVICE',
        value: xpGanha,
        description: `Aplicada +${xpGanha} XP na Ficha [${ficha.nome}]. Total: ${novaXp}`
      });

      // Aciona o ProgressionService para avaliar Level Up automático
      const progressoRes = await progressionService.checkAndExecuteLevelUp(campanhaPersonagemId);
      if (progressoRes.success && progressoRes.data?.leveledUp) {
        logsCombate.push({
          timestamp: new Date().toISOString(),
          action: 'LEVEL_UP',
          actorId: campanhaPersonagemId,
          value: progressoRes.data.novoNivel,
          description: `Personagem ${ficha.nome} subiu para o nível ${progressoRes.data.novoNivel}!`
        });
      }

      return { success: true, data: { campanhaPersonagemId, xpFinal: novaXp, leveledUp: !!progressoRes.data?.leveledUp }, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'APPLY_XP_FAILED', message: err.message } };
    }
  }

  /**
   * Fluxo consolidado: Calcula a XP do combate, divide entre os participantes e atualiza as fichas
   */
  async distributeCombatXP(combatId) {
    try {
      const combate = await combatRepository.findById(combatId);
      if (!combate) {
        return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      }
      if (combate.status !== 'ENCERRADO') {
        return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'O combate precisa estar ENCERRADO para realizar a distribuição de XP.' } };
      }
      if (combate.xpDistribuida) {
        return { success: false, data: null, error: { code: 'XP_ALREADY_DISTRIBUTED', message: 'A XP deste combate já foi distribuída anteriormente.' } };
      }

      const totalXP = this.calculateCombatXP(combate);
      const participantesElegiveis = combate.participantes || [];

      if (totalXP <= 0 || participantesElegiveis.length === 0) {
        await combatRepository.update(combatId, { xpDistribuida: true, updatedAt: new Date().toISOString() });
        return { success: true, data: { totalXP: 0, xpPorParticipante: 0 }, error: null };
      }

      const xpPorParticipante = this.calculateParticipantXP(totalXP, participantesElegiveis);
      const logsSessao = [];

      logsSessao.push({
        timestamp: new Date().toISOString(),
        action: 'XP_CALCULADA',
        actorId: combatId,
        value: totalXP,
        description: `Total de XP calculada para o combate: ${totalXP}. Divisão: ${xpPorParticipante} por Herói.`
      });

      // Aplica XP em cada participante sequencialmente
      for (const p of participantesElegiveis) {
        await this.applyXP(p.id, xpPorParticipante, logsSessao);
      }

      logsSessao.push({
        timestamp: new Date().toISOString(),
        action: 'XP_DISTRIBUIDA',
        actorId: combatId,
        value: xpPorParticipante,
        description: `Distribuição de XP do combate concluída com sucesso.`
      });

      // Consolida os logs no histórico do combate
      const historicoAtualizado = Array.isArray(combate.combatLog) ? [...combate.combatLog] : [];
      logsSessao.forEach(log => {
        historicoAtualizado.push({
          timestamp: log.timestamp,
          type: log.action,
          actorId: log.actorId,
          targetId: null,
          value: log.value,
          description: log.description
        });
      });

      const combateAtualizado = await combatRepository.update(combatId, {
        xpDistribuida: true,
        combatLog: historicoAtualizado,
        updatedAt: new Date().toISOString()
      });

      return {
        success: true,
        data: {
          combatId,
          totalXP,
          xpPorParticipante,
          combate: combateAtualizado,
          logsProcessados: logsSessao 
        },
        error: null
      };
    } catch (err) {
      return { success: false, data: null, error: { code: 'DISTRIBUTE_COMBAT_XP_FAILED', message: err.message } };
    }
  }
}

export default new XPService();
