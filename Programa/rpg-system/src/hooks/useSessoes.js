import { useState, useCallback } from 'react';
import srv from '../services/SessaoService';

/**
 * useSessoes - Hook para interagir com o módulo de Sessões (FC-005)
 */
export function useSessoes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSessao = useCallback(async (d, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.createSessao(d, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const updateSessao = useCallback(async (id, d, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.updateSessao(id, d, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const deleteSessao = useCallback(async (id, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.deleteSessao(id, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const loadCampaignSessions = useCallback(async (campanhaId, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.listByCampaign(campanhaId, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const loadChapterSessions = useCallback(async (capituloId, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.listByCapitulo(capituloId, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  return {
    createSessao,
    updateSessao,
    deleteSessao,
    loadCampaignSessions,
    loadChapterSessions,
    loading,
    error,
    setError
  };
}
