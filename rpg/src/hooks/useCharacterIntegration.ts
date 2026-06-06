"use client";

import { useState, useCallback, useEffect } from 'react';
import { Character, CharacterStatus } from '@/types/character';
import { CharacterService } from '@/services/CharacterService';

export function useCharacterIntegration() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CharacterService.listForAdmin();
      setCharacters(data);
    } catch (err) {
      setError("Falha ao carregar personagens");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await CharacterService.approve(id);
      // Atualização otimista da UI
      setCharacters(prev => prev.map(c => c.id === id ? { ...c, status: 'Aprovado' } : c));
    } catch (err) {
      alert("Erro ao aprovar");
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return { 
    characters, 
    loading, 
    error, 
    handleApprove,
    refresh: fetchCharacters 
  };
}
