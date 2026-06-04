import { useState, useCallback } from 'react';
import lootService from '../services/LootService';

/**
 * useLoot - Hook para gerenciar o sistema de recompensas de combate
 */
export function useLoot() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fn(...args);
      if (!r.success) setError(r.error);
      return r;
    } catch (err) {
      const errObj = { code: 'HOOK_ERROR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    generateLoot: (combatId) => run(lootService.generateLoot.bind(lootService), combatId),
    claimLoot: (id, fId, items) => run(lootService.claimLoot.bind(lootService), id, fId, items),
    finalizeLoot: (id) => run(lootService.finalizeLoot.bind(lootService), id),
    getCombatLoot: (id) => run(lootService.getCombatLoot.bind(lootService), id),
    listCampaignLoots: (cId) => run(lootService.listCampaignLoots.bind(lootService), cId),
    loading, 
    error
  };
}
