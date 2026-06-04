import { useState, useCallback } from 'react';
import xpService from '../services/XPService';

/**
 * useXP - Hook para interagir com o Sistema de Distribuição de XP.
 */
export function useXP() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Dispara o fluxo consolidado de distribuição de XP para todos os heróis do combate.
   */
  const distributeCombatXP = useCallback(async (combatId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await xpService.distributeCombatXP(combatId);
      if (!res.success) {
        setError(res.error);
      }
      return res;
    } catch (err) {
      const errObj = { code: 'HOOK_XP_ERROR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    distributeCombatXP,
    loading,
    error
  };
}
