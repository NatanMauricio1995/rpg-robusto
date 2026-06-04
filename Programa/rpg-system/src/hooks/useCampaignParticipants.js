import { useState, useCallback } from 'react';
import srv from '../services/CampaignParticipantService';

/**
 * useCampaignParticipants - Hook para gerenciamento de participantes
 */
export function useCampaignParticipants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const remove = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.removeParticipant(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const deactivate = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.deactivateParticipant(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return { remove, deactivate, loading, error, setError };
}
