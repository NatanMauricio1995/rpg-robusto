import { useState, useMemo, useEffect } from 'react';
import { Character, CharacterFilters } from '@/types/character';

const MOCK_CHARACTERS: Character[] = [
  { id: '1', name: 'Eldrin Valerius', race: 'Elfo', class: 'Mago', level: 12, campaign: 'Sombras de Aethelgard', status: 'Ativo', lastUpdated: '2026-06-01' },
  { id: '2', name: 'Korg o Destruidor', race: 'Orc', class: 'Guerreiro', level: 8, campaign: 'Sombras de Aethelgard', status: 'Ativo', lastUpdated: '2026-05-28' },
  { id: '3', name: 'Lira Silverfoot', race: 'Halfling', class: 'Ladino', level: 10, campaign: 'A Queda do Rei Carmesim', status: 'Inativo', lastUpdated: '2026-05-15' },
  { id: '4', name: 'Gromm Ironhide', race: 'Anão', class: 'Clérigo', level: 15, campaign: 'Legado de Ferro', status: 'Morto', lastUpdated: '2026-04-20' },
  { id: '5', name: 'Valerius Sunsword', race: 'Humano', class: 'Paladino', level: 5, campaign: 'A Queda do Rei Carmesim', status: 'Ativo', lastUpdated: '2026-06-05' },
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
    // Simulação de Fetch
    const timer = setTimeout(() => {
      setCharacters(MOCK_CHARACTERS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCharacters = useMemo(() => {
    return characters.filter(char => {
      const matchSearch = char.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'Todos' || char.status === filters.status;
      const matchClass = filters.class === 'Todas' || char.class === filters.class;
      return matchSearch && matchStatus && matchClass;
    });
  }, [characters, filters]);

  return {
    characters: filteredCharacters,
    loading,
    filters,
    setFilters
  };
}
