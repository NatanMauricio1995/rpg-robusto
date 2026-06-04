import { useState, useCallback } from 'react';
import srv from '../services/CampaignService';

/**
 * useCampaigns - Hook para interagir com o módulo de campanhas
 */
export function useCampaigns() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createCampaign = useCallback(async (d) => {
    setLoading(true);
    const r = await srv.createCampaign(d);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const updateCampaign = useCallback(async (id, d) => {
    setLoading(true);
    const r = await srv.updateCampaign(id, d);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const closeCampaign = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.closeCampaign(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const archiveCampaign = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.archiveCampaign(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    const r = await srv.getAllCampaigns();
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return { 
    createCampaign, 
    updateCampaign, 
    closeCampaign, 
    archiveCampaign, 
    fetchCampaigns, 
    loading, 
    error,
    setError 
  };
}
