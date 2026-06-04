import { useState, useCallback } from 'react';
import srv from '../services/CampaignInviteService';

/**
 * useCampaignInvites - Hook para gerenciamento de convites
 */
export function useCampaignInvites() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const send = useCallback(async (d) => {
    setLoading(true);
    const r = await srv.sendInvite(d);
    setLoading(false);
    if (!r.success) setError(r.error.message || "Erro ao enviar convite");
    return r;
  }, []);

  const cancel = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.cancelInvite(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const accept = useCallback(async (id, pId, cpId) => {
    setLoading(true);
    const r = await srv.acceptInvite(id, pId, cpId);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  const reject = useCallback(async (id) => {
    setLoading(true);
    const r = await srv.rejectInvite(id);
    setLoading(false);
    if (!r.success) setError(r.error.message);
    return r;
  }, []);

  return { send, cancel, accept, reject, loading, error, setError };
}
