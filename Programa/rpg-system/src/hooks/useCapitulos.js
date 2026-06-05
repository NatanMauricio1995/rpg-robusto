import { useState, useCallback } from 'react';
import srv from '../services/CapituloService';

/**
 * useCapitulos - Hook para gerenciamento de capítulos de campanha
 */
export function useCapitulos() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCapitulo = useCallback(async (user, data) => {
    setLoading(true);
    const r = await srv.createCapitulo(user, data);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const updateCapitulo = useCallback(async (user, id, data) => {
    setLoading(true);
    const r = await srv.updateCapitulo(user, id, data);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const deleteCapitulo = useCallback(async (user, id) => {
    setLoading(true);
    const r = await srv.deleteCapitulo(user, id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const loadCapitulos = useCallback(async (campanhaId) => {
    setLoading(true);
    const r = await srv.listCapitulosByCampaign(campanhaId);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return {
    createCapitulo,
    updateCapitulo,
    deleteCapitulo,
    loadCapitulos,
    loading,
    error,
    setError
  };
}
