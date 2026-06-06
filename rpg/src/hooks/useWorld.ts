import { useState, useMemo, useEffect, useCallback } from 'react';
import { World } from '@/types/world';

const MOCK_WORLDS: World[] = [
  {
    id: '1',
    name: 'Aethelgard',
    status: 'Ativo',
    system: 'D&D 5e',
    createdAt: '2026-01-10',
    updatedAt: '2026-06-01',
    description: 'Um mundo de alta fantasia com foco em exploração de ruínas e política imperial.'
  },
  {
    id: '2',
    name: 'Ravnica',
    status: 'Ativo',
    system: 'D&D 5e',
    createdAt: '2026-02-15',
    updatedAt: '2026-05-20',
    description: 'Uma cidade-mundo dividida por dez guildas em constante disputa.'
  },
  {
    id: '3',
    name: 'Golarion',
    status: 'Rascunho',
    system: 'Pathfinder 2e',
    createdAt: '2026-03-20',
    updatedAt: '2026-04-10',
    description: 'O cenário principal de Pathfinder, repleto de mistérios e divindades ativas.'
  }
];

export function useWorld() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulação de Fetch
    const timer = setTimeout(() => {
      setWorlds(MOCK_WORLDS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredWorlds = useMemo(() => {
    return worlds.filter(world => 
      world.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      world.system.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [worlds, searchQuery]);

  const deleteWorld = useCallback((id: string) => {
    if (confirm('Tem certeza que deseja excluir este mundo?')) {
      setWorlds(prev => prev.filter(w => w.id !== id));
    }
  }, []);

  const duplicateWorld = useCallback((id: string) => {
    const original = worlds.find(w => w.id === id);
    if (original) {
      const copy: World = {
        ...original,
        id: Math.random().toString(36).substr(2, 9),
        name: `${original.name} (Cópia)`,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setWorlds(prev => [...prev, copy]);
    }
  }, [worlds]);

  return {
    worlds: filteredWorlds,
    loading,
    searchQuery,
    setSearchQuery,
    deleteWorld,
    duplicateWorld
  };
}
