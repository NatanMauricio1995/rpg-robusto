import { useState, useMemo, useEffect, useCallback } from 'react';
import { Character, CharacterFilters, CharacterStatus } from '@/types/character';

const MOCK_CHARACTERS: Character[] = [
  { 
    id: '1', name: 'Eldrin Valerius', status: 'Aprovado', race: 'Elfo', class: 'Mago', level: 12, 
    campaignName: 'Sombras de Aethelgard', userId: 'u1', userName: 'Mestre Arcano',
    createdAt: '2026-05-10', updatedAt: '2026-06-01' 
  },
  { 
    id: '2', name: 'Korg o Destruidor', status: 'Pendente', race: 'Orc', class: 'Guerreiro', level: 8, 
    campaignName: 'Sombras de Aethelgard', userId: 'u2', userName: 'Jogador 1',
    createdAt: '2026-06-02', updatedAt: '2026-06-02' 
  },
  { 
    id: '3', name: 'Lira Silverfoot', status: 'Aprovado', race: 'Halfling', class: 'Ladino', level: 10, 
    campaignName: 'A Queda do Rei Carmesim', userId: 'u3', userName: 'Jogador 2',
    createdAt: '2026-05-15', updatedAt: '2026-05-20' 
  },
  { 
    id: '4', name: 'Gromm Ironhide', status: 'Morto', race: 'Anão', class: 'Clérigo', level: 15, 
    campaignName: 'Legado de Ferro', userId: 'u4', userName: 'Jogador 3',
    createdAt: '2026-04-01', updatedAt: '2026-04-20' 
  },
  { 
    id: '5', name: 'Valerius Sunsword', status: 'Reprovado', race: 'Humano', class: 'Paladino', level: 5, 
    campaignName: 'A Queda do Rei Carmesim', userId: 'u5', userName: 'Jogador 4',
    createdAt: '2026-06-04', updatedAt: '2026-06-05' 
  },
];

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CharacterFilters>({
    search: '',
    status: 'Todos',
    class: 'Todas'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCharacters(MOCK_CHARACTERS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      const matchSearch = char.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          char.userName.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'Todos' || char.status === filters.status;
      const matchClass = filters.class === 'Todas' || char.class === filters.class;
      return matchSearch && matchStatus && matchClass;
    });
  }, [characters, filters]);

  const updateStatus = useCallback((id: string, newStatus: CharacterStatus) => {
    setCharacters(prev => prev.map(char => 
      char.id === id ? { ...char, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] } : char
    ));
  }, []);

  const deleteCharacter = useCallback((id: string) => {
    if (confirm('Deseja excluir este personagem permanentemente?')) {
      setCharacters(prev => prev.filter(char => char.id !== id));
    }
  }, []);

  return {
    characters: filteredCharacters,
    loading,
    filters,
    setFilters,
    updateStatus,
    deleteCharacter
  };
}
