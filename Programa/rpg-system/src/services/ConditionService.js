import efeitosRepo from '../repositories/EfeitosCombateRepository';
import ativosRepo from '../repositories/CombateEfeitosAtivosRepository';
import combatRepo from '../repositories/CombatRepository';
import attributeService from './AttributeService';

/**
 * ConditionService - Gerenciamento de Condições e Efeitos de Combate (FCB-004)
 * Suporta a infraestrutura para RN-062, RN-063, RN-070 e RN-071
 */
class ConditionService {
  /**
   * Aplica um efeito/condição a um alvo no combate
   * @param {string} effectId - ID da definição do efeito (efeitosCombate)
   * @param {string} targetId - ID do alvo (participante ou inimigo)
   * @param {number} duration - Duração em rodadas
   * @param {string} originId - ID da origem do efeito (quem aplicou)
   * @param {string} combatId - ID do combate atual (necessário para contexto)
   */
  async applyCondition(effectId, targetId, duration, originId, combatId) {
    const efeitoBase = await efeitosRepo.findById(effectId);
    if (!efeitoBase) throw new Error("Definição de efeito não encontrada.");

    const combate = await combatRepo.findById(combatId);
    if (!combate) throw new Error("Combate não encontrado.");

    const isParticipante = combate.participantes.some(p => p.id === targetId);
    const isInimigo = combate.inimigos.some(e => e.snapshotId === targetId);
    if (!isParticipante && !isInimigo) throw new Error("Alvo não encontrado no combate.");

    const resId = await ativosRepo.create({
      efeitoId: effectId,
      targetId,
      combatId,
      originId,
      duracaoRestante: duration,
      nome: efeitoBase.nome,
      tipoDano: efeitoBase.tipoDano || null,
      valorEfeito: efeitoBase.valorEfeito || 0,
      tipoEfeito: efeitoBase.tipoEfeito || 'STATUS',
      ativo: true,
      createdAt: new Date().toISOString()
    });

    // Gatilho: Recalcular CA (RN-068)
    if (isParticipante) await attributeService.calculateArmorClass(targetId);

    return { success: true, data: { id: resId } };
  }

  /**
   * Remove um efeito ativo
   * @param {string} activeEffectId - ID do registro em combateEfeitosAtivos
   */
  async removeCondition(activeEffectId) {
    const ativo = await ativosRepo.findById(activeEffectId);
    if (!ativo) throw new Error("Efeito ativo não encontrado.");

    await ativosRepo.update(activeEffectId, { 
      ativo: false, 
      inativadoEm: new Date().toISOString() 
    });

    // Gatilho: Recalcular CA (RN-068)
    await attributeService.calculateArmorClass(ativo.targetId);

    return { success: true };
  }

  /**
   * Processa efeitos de início/fim de turno para um alvo
   * @param {string} targetId 
   * @param {Object} combatServiceInstance - Instância para delegar dano/cura
   */
  async processTurnEffects(targetId, combatServiceInstance) {
    const efeitos = await ativosRepo.findByTarget(targetId);
    const ativos = efeitos.filter(e => e.ativo && e.duracaoRestante > 0);

    for (const efeito of ativos) {
      if (efeito.tipoEfeito === 'DANO_TURNO') {
        await combatServiceInstance.applyDamage(efeito.combatId, {
          targetId: efeito.targetId,
          damage: efeito.valorEfeito,
          sourceId: efeito.originId,
          description: `Dano contínuo: ${efeito.nome}`
        });
      } else if (efeito.tipoEfeito === 'CURA_TURNO') {
        await combatServiceInstance.applyHealing(efeito.combatId, {
          targetId: efeito.targetId,
          healing: efeito.valorEfeito,
          sourceId: efeito.originId,
          description: `Cura contínua: ${efeito.nome}`
        });
      }

      const novaDuracao = efeito.duracaoRestante - 1;
      await ativosRepo.update(efeito.id, { 
        duracaoRestante: novaDuracao,
        ativo: novaDuracao > 0
      });
      
      if (novaDuracao <= 0) {
        await attributeService.calculateArmorClass(targetId);
      }
    }
  }

  /**
   * Processa efeitos globais ao fim de uma rodada
   * @param {string} combatId 
   */
  async processRoundEffects(combatId) {
    const efeitos = await ativosRepo.findByCombat(combatId);
    const expirados = efeitos.filter(e => e.ativo && e.duracaoRestante <= 0);

    for (const efeito of expirados) {
      await ativosRepo.update(efeito.id, { ativo: false });
      // Gatilho: Recalcular CA (RN-068)
      await attributeService.calculateArmorClass(efeito.targetId);
    }
  }
}

export default new ConditionService();
