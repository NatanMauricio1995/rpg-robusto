import { useState, useCallback } from 'react';
import srv from '../services/CampanhaPersonagemService';

/**
 * useCampanhaPersonagem - Hook para interagir com fichas de campanha
 */
export function useCampanhaPersonagem() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSheet = useCallback(async (d) => {
    setLoading(true);
    const r = await srv.createSheet(d);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const updateSheet = useCallback(async (id, d) => {
    setLoading(true);
    const r = await srv.updateSheet(id, d);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const getSheet = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.getSheet(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const getByCampaign = useCallback(async (cId) => {
    setLoading(true);
    const r = await srv.getByCampaign(cId);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return { 
    createSheet, 
    updateSheet, 
    getSheet, 
    getByCampaign,
    loading, 
    error,
    setError
  };
}
