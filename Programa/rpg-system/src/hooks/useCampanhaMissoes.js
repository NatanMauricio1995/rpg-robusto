import { useState, useCallback } from 'react';
import srv from '../services/CampanhaMissoesService';

/**
 * useCampanhaMissoes - Hook para interagir com as missões de uma campanha
 */
export function useCampanhaMissoes() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assignMission = useCallback(async (d) => {
    setLoading(true);
    setError(null);
    const r = await srv.assignMission(d);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const updateMissionStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    const r = await srv.updateStatus(id, status);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const fetchCampaignMissions = useCallback(async (campanhaId) => {
    setLoading(true);
    setError(null);
    const r = await srv.getMissionsByCampaign(campanhaId);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const removeMission = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    const r = await srv.removeMissionFromCampaign(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return {
    assignMission,
    updateMissionStatus,
    fetchCampaignMissions,
    removeMission,
    loading,
    error,
    setError
  };
}
