import { useState, useCallback } from 'react';
import CampaignSheetService from '../services/CampaignSheetService';
import { CampaignSheet } from '../models/Character';
import { useAuth } from '../contexts/AuthContext';

export function useCampaignSheet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, userType } = useAuth();
  
  const service = new CampaignSheetService();

  const linkCharacter = async (campanhaId: string, personagemId: string) => {
    if (!user) throw new Error('Usuário não autenticado');
    setLoading(true);
    try {
      return await service.linkCharacterToCampaign(campanhaId, personagemId, user.uid);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getSheet = useCallback(async (campanhaId: string, personagemId: string) => {
    setLoading(true);
    try {
      return await service.getSheetByCampaignAndCharacter(campanhaId, personagemId);
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSheet = async (id: string, data: Partial<CampaignSheet>) => {
    setLoading(true);
    try {
      return await service.updateSheet(id, data);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveInCampaign = async (id: string) => {
    setLoading(true);
    try {
      return await service.approveCharacterInCampaign(id, userType);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    linkCharacter,
    getSheet,
    updateSheet,
    approveInCampaign
  };
}
