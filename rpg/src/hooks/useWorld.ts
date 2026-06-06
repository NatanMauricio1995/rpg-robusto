import { useState, useMemo, useEffect } from 'react';
import { WorldEntry, WorldCategory } from '@/types/world';

const MOCK_ENTRIES: WorldEntry[] = [
  {
    id: '1',
    title: 'A Capital de Aethelgard',
    category: 'Geografia',
    summary: 'A majestosa cidade dourada, sede do Império e coração político do mundo conhecido.',
    content: '...',
    tags: ['cidade', 'imperio', 'politica'],
    lastUpdated: '2026-06-01'
  },
  {
    id: '2',
    title: 'A Era do Fogo',
    category: 'História',
    summary: 'Um período de 500 anos onde dragões dominavam os céus e as civilizações mortais viviam em cavernas.',
    content: '...',
    tags: ['dragoes', 'antiguidade'],
    lastUpdated: '2026-05-20'
  },
  {
    id: '3',
    title: 'Solarius, o Lorde da Luz',
    category: 'Divindades',
    summary: 'Divindade suprema da justiça e do sol, adorada pela maioria dos paladinos e clérigos.',
    content: '...',
    tags: ['deuses', 'justiça', 'sol'],
    lastUpdated: '2026-06-05'
  },
  {
    id: '4',
    title: 'A Ordem dos Sentinelas',
    category: 'Organizações',
    summary: 'Um grupo de elite dedicado a proteger as fronteiras do mundo contra incursões abissais.',
    content: '...',
    tags: ['militar', 'proteção'],
    lastUpdated: '2026-05-15'
  },
  {
    id: '5',
    title: 'O Vale dos Sussurros',
    category: 'Geografia',
    summary: 'Um desfiladeiro amaldiçoado onde dizem que o vento carrega as vozes dos que partiram.',
    content: '...',
    tags: ['maldição', 'vale'],
    lastUpdated: '2026-04-10'
  }
];

export function useWorld() {
  const [entries, setEntries] = useState<WorldEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<WorldCategory | 'Todas'>('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setEntries(MOCK_ENTRIES);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchSearch = entry.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          entry.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'Todas' || entry.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [entries, searchQuery, selectedCategory]);

  return {
    entries: filteredEntries,
    loading,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  };
}
