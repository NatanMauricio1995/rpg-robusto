import { useState, useCallback } from 'react';
import CharacterService from '../services/CharacterService';
import { Character } from '../models/Character';
import { useAuth } from '../contexts/AuthContext';

export function useCharacters() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, userType } = useAuth();
  
  const service = new CharacterService();

  const listMyCharacters = useCallback(async () => {
    if (!user) return [];
    setLoading(true);
    try {
      return await service.listUserCharacters(user.uid);
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  const getCharacter = useCallback(async (id: string) => {
    setLoading(true);
    try {
      return await service.getCharacter(id);
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCharacter = async (data: Character) => {
    if (!user) throw new Error('Usuário não autenticado');
    setLoading(true);
    try {
      return await service.createCharacter({ ...data, userId: user.uid });
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCharacter = async (id: string, data: Partial<Character>) => {
    if (!user) throw new Error('Usuário não autenticado');
    setLoading(true);
    try {
      return await service.updateCharacter(id, data, user.uid);
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const approveCharacter = async (id: string) => {
    setLoading(true);
    try {
      return await service.approveCharacter(id, userType);
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
    listMyCharacters,
    getCharacter,
    createCharacter,
    updateCharacter,
    approveCharacter
  };
}
