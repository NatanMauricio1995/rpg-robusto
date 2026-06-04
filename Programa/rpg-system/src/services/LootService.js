import lootRepo from '../repositories/LootRepository';
import combatRepo from '../repositories/CombatRepository';
import fichaRepo from '../repositories/CampanhaPersonagemRepository';
import lootVal from '../validations/LootValidation';

/**
 * LootService - Responsável pela geração e distribuição de espólios de combate
 * Regras: RN-042, RN-043 | Integração estrita com Fichas de Campanha
 */
class LootService {
  /**
   * Executa a rolagem individual de recompensas para um inimigo derrubado
   */
  generateEnemyLoot(enemy) {
    const finalItems = [];
    if (!enemy.loot) return finalItems;

    // 1. Processar Loot Garantido
    if (Array.isArray(enemy.loot.lootGarantido)) {
      enemy.loot.lootGarantido.forEach(item => {
        finalItems.push({ 
          itemId: item.itemId, 
          nome: item.nome || item.itemId, 
          quantidade: item.quantidade || 1 
        });
      });
    }

    // 2. Processar Loot por Rolagem (Chances baseadas em d100 ou limiar)
    if (Array.isArray(enemy.loot.lootRolagem)) {
      enemy.loot.lootRolagem.forEach(item => {
        const d100 = Math.floor(Math.random() * 100) + 1;
        const chance = item.valorMin || item.chance || 100;
        if (d100 <= chance) {
          finalItems.push({ 
            itemId: item.itemId, 
            nome: item.nome || item.itemId, 
            quantidade: item.quantidade || 1 
          });
        }
      });
    }

    return finalItems;
  }

  /**
   * Consolida itens idênticos somando suas respectivas quantidades
   */
  mergeCombatLoot(allLootItems) {
    const merged = {};
    allLootItems.forEach(item => {
      if (merged[item.itemId]) {
        merged[item.itemId].quantidade += item.quantidade;
      } else {
        merged[item.itemId] = { ...item };
      }
    });
    return Object.values(merged);
  }

  /**
   * Gera o repositório consolidado de loot com base nos inimigos derrotados do combate
   */
  async generateLoot(combatId) {
    try {
      const c = await combatRepo.findById(combatId);
      if (!c) return { success: false, data: null, error: { code: 'COMBAT_NOT_FOUND', message: 'Combate não encontrado.' } };
      if (c.status !== 'ENCERRADO') return { success: false, data: null, error: { code: 'INVALID_STATUS', message: 'Combate precisa estar encerrado para gerar loot.' } };

      const existing = await lootRepo.findByCombat(combatId);
      if (existing.length > 0) return { success: true, data: existing[0], error: null };

      // Coletar itens de todos os inimigos caídos (hpAtual <= 0)
      let rawItems = [];
      c.inimigos.forEach(enemy => {
        if (enemy.hpAtual <= 0) {
          const items = this.generateEnemyLoot(enemy);
          rawItems = rawItems.concat(items);
        }
      });

      const consolidated = this.mergeCombatLoot(rawItems);

      const payload = {
        combatId,
        campanhaId: c.campanhaId,
        generatedLoot: consolidated,
        claimedLoot: [],
        status: 'PENDENTE',
        lootLog: [{ 
          timestamp: new Date().toISOString(), 
          action: 'LOOT_GERADO', 
          actorId: 'SISTEMA', 
          description: 'Recompensas de combate consolidadas e disponíveis.' 
        }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const v = lootVal.validate(payload);
      if (!v.isValid) return { success: false, data: null, error: { code: 'VALIDATION_FAILED', message: JSON.stringify(v.errors) } };

      const resId = await lootRepo.create(payload);
      return { success: true, data: { id: resId, ...payload }, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'GENERATE_LOOT_FAILED', message: err.message } };
    }
  }

  /**
   * Transfere itens específicos do lote de recompensas para o inventário da Ficha de Campanha
   * PROIBIÇÃO ESTRITA: Modifica apenas a ficha de campanha, nunca o personagem base.
   */
  async claimLoot(lootId, campanhaPersonagemId, itensSelecionados) {
    try {
      const l = await lootRepo.findById(lootId);
      if (!l) return { success: false, data: null, error: { code: 'LOOT_NOT_FOUND', message: 'Lote de loot não encontrado.' } };
      if (l.status === 'ENCERRADO') return { success: false, data: null, error: { code: 'CLOSED_LOOT', message: 'Este loot já foi encerrado e distribuído.' } };

      const ficha = await fichaRepo.findById(campanhaPersonagemId);
      if (!ficha) return { success: false, data: null, error: { code: 'SHEET_NOT_FOUND', message: 'Ficha de campanha não encontrada.' } };

      const novoInventario = Array.isArray(ficha.inventario) ? [...ficha.inventario] : [];
      const updatedGeneratedLoot = [...l.generatedLoot];
      const newClaimedRecords = [];

      itensSelecionados.forEach(sel => {
        const itemIdx = updatedGeneratedLoot.findIndex(g => g.itemId === sel.itemId);
        if (itemIdx !== -1 && updatedGeneratedLoot[itemIdx].quantidade >= sel.quantidade) {
          // Deduz do baú global
          updatedGeneratedLoot[itemIdx].quantidade -= sel.quantidade;

          // Adiciona ao inventário do jogador
          const invIdx = novoInventario.findIndex(i => i.itemId === sel.itemId);
          if (invIdx !== -1) {
            novoInventario[invIdx].quantidade += sel.quantidade;
          } else {
            novoInventario.push({ 
              itemId: sel.itemId, 
              nome: sel.nome || updatedGeneratedLoot[itemIdx].nome, 
              quantidade: sel.quantidade 
            });
          }

          newClaimedRecords.push({ 
            campanhaPersonagemId, 
            itemId: sel.itemId, 
            quantidade: sel.quantidade, 
            timestamp: new Date().toISOString() 
          });
        }
      });

      // Remove itens zerados do loot gerado
      const filteredGeneratedLoot = updatedGeneratedLoot.filter(g => g.quantidade > 0);
      const updatedLog = [...l.lootLog, { 
        timestamp: new Date().toISOString(), 
        action: 'LOOT_REIVINDICADO', 
        actorId: campanhaPersonagemId, 
        description: `Participante resgatou ${itensSelecionados.length} tipo(s) de item.` 
      }];

      // Persistência Atômica (Ficha e Baú)
      await fichaRepo.update(campanhaPersonagemId, { 
        inventario: novoInventario, 
        updatedAt: new Date().toISOString() 
      });
      
      const res = await lootRepo.update(lootId, { 
        generatedLoot: filteredGeneratedLoot, 
        claimedLoot: [...l.claimedLoot, ...newClaimedRecords], 
        lootLog: updatedLog, 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: res, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'CLAIM_LOOT_FAILED', message: err.message } };
    }
  }

  /**
   * Finaliza oficialmente a distribuição de itens do combate
   */
  async finalizeLoot(lootId) {
    try {
      const l = await lootRepo.findById(lootId);
      if (!l) return { success: false, data: null, error: { code: 'LOOT_NOT_FOUND', message: 'Loot não localizado.' } };

      const updatedLog = [...l.lootLog, { 
        timestamp: new Date().toISOString(), 
        action: 'LOOT_ENCERRADO', 
        actorId: 'MESTRE', 
        description: 'Distribuição encerrada pelo mestre.' 
      }];

      await lootRepo.update(lootId, { 
        status: 'ENCERRADO', 
        lootLog: updatedLog, 
        dataDistribuicao: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      });

      return { success: true, data: lootId, error: null };
    } catch (err) {
      return { success: false, data: null, error: { code: 'FINALIZE_LOOT_FAILED', message: err.message } };
    }
  }

  async getCombatLoot(lootId) { 
    try { 
      const d = await lootRepo.findById(lootId); 
      return { success: !!d, data: d, error: d ? null : { code: 'NOT_FOUND', message: 'Loot não encontrado' } }; 
    } catch(e) { 
      return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; 
    } 
  }

  async listCampaignLoots(campanhaId) { 
    try { 
      const data = await lootRepo.findByCampaign(campanhaId);
      return { success: true, data, error: null }; 
    } catch(e) { 
      return { success: false, data: null, error: { code: 'ERROR', message: e.message } }; 
    } 
  }
}

export default new LootService();
