import efeitosRepo from '../repositories/EfeitosCombateRepository';
import ativosRepo from '../repositories/CombateEfeitosAtivosRepository';
import combatRepo from '../repositories/CombatRepository';

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
    // Validar se o efeito existe
    const efeitoBase = await efeitosRepo.findById(effectId);
    if (!efeitoBase) throw new Error("Definição de efeito não encontrada.");

    // Validar se o combate existe e o alvo está nele
    const combate = await combatRepo.findById(combatId);
    if (!combate) throw new Error("Combate não encontrado.");

    const isParticipante = combate.participantes.some(p => p.id === targetId);
    const isInimigo = combate.inimigos.some(e => e.snapshotId === targetId);
    if (!isParticipante && !isInimigo) throw new Error("Alvo não encontrado no combate.");

    // Registrar o efeito ativo
    const resId = await ativosRepo.create({
      efeitoId: effectId,
      targetId,
      combatId,
      originId,
      duracaoRestante: duration,
      nome: efeitoBase.nome,
      tipoDano: efeitoBase.tipoDano || null,
      valorEfeito: efeitoBase.valorEfeito || 0, // Dano/Cura por turno
      tipoEfeito: efeitoBase.tipoEfeito || 'STATUS', // STATUS, DANO_TURNO, CURA_TURNO
      ativo: true,
      createdAt: new Date().toISOString()
    });

    return { success: true, data: { id: resId } };
  }

  /**
   * Remove um efeito ativo
   * @param {string} activeEffectId - ID do registro em combateEfeitosAtivos
   */
  async removeCondition(activeEffectId) {
    const ativo = await ativosRepo.findById(activeEffectId);
    if (!ativo) throw new Error("Efeito ativo não encontrado.");

    // Inativar o efeito (RN-063: Status são controlados pelo mestre)
    await ativosRepo.update(activeEffectId, { 
      ativo: false, 
      inativadoEm: new Date().toISOString() 
    });

    // GANCHO_FUTURO: Reversão de modificadores de AttributeService (RN-070, RN-071)
    // TODO: Implementar reversão quando AttributeService for integrado

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

      // Decrementar duração (RN-063: Status persistem conforme duração ou mestre)
      const novaDuracao = efeito.duracaoRestante - 1;
      await ativosRepo.update(efeito.id, { 
        duracaoRestante: novaDuracao,
        ativo: novaDuracao > 0
      });
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
      // Encerramento automático de efeitos expirados
      await ativosRepo.update(efeito.id, { ativo: false });
      
      // GANCHO_FUTURO: Notificar UI ou reverter modificadores
    }
  }
}

export default new ConditionService();
