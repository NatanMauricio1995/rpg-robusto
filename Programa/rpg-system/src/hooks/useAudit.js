import { useState, useCallback } from 'react';
import auditService from '../services/AuditService';

/**
 * useAudit - Hook para consultar e registrar ações de auditoria.
 */
export function useAudit() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const listLogs = useCallback(async (filters) => {
    setLoading(true);
    setError(null);
    try {
      const res = await auditService.getAuditLogs(filters);
      if (!res.success) setError(res.error);
      return res;
    } catch (err) {
      const errObj = { code: 'HOOK_AUDIT_ERROR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  const getLog = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await auditService.getLogById(id);
      if (!res.success) setError(res.error);
      return res;
    } catch (err) {
      const errObj = { code: 'HOOK_AUDIT_ERROR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    listLogs,
    getLog,
    loading,
    error
  };
}
