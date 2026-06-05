import { useState, useCallback } from 'react';
import srv from '../services/CampanhaMissoesService';

/**
 * useCampanhaMissoes - Hook para interagir com as missões de uma campanha (FC-004)
 */
export function useCampanhaMissoes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assignMission = useCallback(async (d, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.assignMission(d, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const updateMissionStatus = useCallback(async (id, status, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.updateStatus(id, status, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const removeMission = useCallback(async (id, user) => {
    setLoading(true);
    setError(null);
    const r = await srv.removeMission(id, user);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const fetchCampaignMissions = useCallback(async (campanhaId) => {
    setLoading(true);
    setError(null);
    const r = await srv.getCampaignMissions(campanhaId);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const fetchChapterMissions = useCallback(async (capituloId) => {
    setLoading(true);
    setError(null);
    const r = await srv.getChapterMissions(capituloId);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  const getAssociation = useCallback(async (campanhaId, missaoId) => {
    setLoading(true);
    setError(null);
    const r = await srv.getAssociation(campanhaId, missaoId);
    setLoading(false);
    if (!r.success) setError(r.error.message || r.error);
    return r;
  }, []);

  return {
    assignMission,
    updateMissionStatus,
    removeMission,
    fetchCampaignMissions,
    fetchChapterMissions,
    getAssociation,
    loading,
    error,
    setError
  };
}
