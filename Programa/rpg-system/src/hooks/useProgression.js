import { useState, useCallback } from 'react';
import cpRepository from '../repositories/CampanhaPersonagemRepository';
import progService from '../services/ProgressionService';

/**
 * useProgression - Hook para gerenciar e monitorar a evolução dos personagens.
 */
export function useProgression() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Busca os dados de evolução de uma ficha específica.
   */
  const getProgression = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await cpRepository.findById(id);
      setLoading(false);
      if (!data) return { success: false, error: { code: 'NOT_FOUND', message: 'Ficha não localizada.' } };
      return { success: true, data, error: null };
    } catch(e) {
      setLoading(false);
      setError({ message: e.message });
      return { success: false, error: { message: e.message } };
    }
  }, []);

  /**
   * Força a execução da lógica de subida de nível e desbloqueio de conteúdo.
   */
  const refreshProgression = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await progService.checkAndExecuteLevelUp(id);
      setLoading(false);
      if (!res.success) setError(res.error);
      return res;
    } catch (err) {
      setLoading(false);
      setError({ message: err.message });
      return { success: false, error: { message: err.message } };
    }
  }, []);

  return { 
    getProgression, 
    refreshProgression, 
    loading, 
    error 
  };
}
