import { useState, useCallback } from 'react';
import rSrv from '../services/ReportService';

/**
 * useReports - Hook para interagir com o Sistema de Relatórios e Estatísticas.
 */
export function useReports() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn();
      if (!res.success) setError(res.error);
      return res;
    } catch (err) {
      const errObj = { code: 'REPORT_HOOK_ERR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loadDashboard: () => run(() => rSrv.getGlobalDashboard()),
    loadCampaignReport: () => run(() => rSrv.getCampaignReport()),
    loadCharacterReport: () => run(() => rSrv.getCharacterReport()),
    loadCombatReport: () => run(() => rSrv.getCombatReport()),
    loadLootReport: () => run(() => rSrv.getLootReport()),
    loadProgressionReport: () => run(() => rSrv.getProgressionReport()),
    loading,
    error
  };
}
