import { useState, useCallback } from 'react';
import srv from '../services/CombatService';

/**
 * useCombat - Hook para interagir com o Sistema de Combate
 */
export function useCombat() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const run = useCallback(async (fn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const r = await fn(...args);
      if (!r.success) setError(r.error);
      return r;
    } catch (err) {
      setError({ message: err.message });
      return { success: false, error: { message: err.message } };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createCombat: (d) => run(srv.createCombat.bind(srv), d),
    startCombat: (id) => run(srv.startCombat.bind(srv), id),
    endCombat: (id) => run(srv.endCombat.bind(srv), id),
    applyDamage: (id, p) => run(srv.applyDamage.bind(srv), id, p),
    applyHealing: (id, p) => run(srv.applyHealing.bind(srv), id, p),
    addParticipant: (id, fId) => run(srv.addParticipant.bind(srv), id, fId),
    addEnemy: (id, eb) => run(srv.addEnemy.bind(srv), id, eb),
    loading, 
    error
  };
}
