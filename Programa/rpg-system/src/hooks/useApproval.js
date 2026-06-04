import { useState, useCallback } from 'react';
import approvalService from '../services/ApprovalService';

/**
 * useApproval - Hook para interagir com o Sistema de Aprovações e Governança.
 */
export function useApproval() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fn(...args);
      if (!res.success) setError(res.error);
      return res;
    } catch (err) {
      const errObj = { code: 'HOOK_APPROVAL_ERR', message: err.message };
      setError(errObj);
      return { success: false, error: errObj };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    approve: (type, id, user, obs) => execute(approvalService.approve.bind(approvalService), type, id, user, obs),
    reject: (type, id, user, mot) => execute(approvalService.reject.bind(approvalService), type, id, user, mot),
    requestReview: (type, id, user, obs) => execute(approvalService.requestReview.bind(approvalService), type, id, user, obs),
    resubmit: (type, id, user) => execute(approvalService.resubmit.bind(approvalService), type, id, user),
    archive: (type, id, user) => execute(approvalService.archive.bind(approvalService), type, id, user),
    getEntityHistory: (type, id) => execute(approvalService.getEntityHistory.bind(approvalService), type, id),
    getHistory: () => execute(approvalService.getHistory.bind(approvalService)),
    loading,
    error
  };
}
