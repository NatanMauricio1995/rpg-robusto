import { useState, useMemo, useEffect, useCallback } from 'react';
import { Combat, CombatFilters } from '@/types/combat';

const MOCK_COMBATS: Combat[] = [
  {
    id: '1', name: 'Emboscada na Estrada', status: 'Ativo', campaignId: 'c1', campaignName: 'As Crônicas de Aethelgard',
    location: 'Estrada do Rei', round: 3, currentTurnIndex: 1, totalXP: 1200,
    combatants: [], loot: [], createdAt: '2026-06-05', updatedAt: '2026-06-05'
  },
  {
    id: '2', name: 'Duelo na Taverna', status: 'Encerrado', campaignId: 'c1', campaignName: 'As Crônicas de Aethelgard',
    location: 'Taverna do Bardo Gago', round: 12, currentTurnIndex: 0, totalXP: 450,
    combatants: [], loot: [{ id: 'l1', name: 'Moedas de Ouro', quantity: 50 }],
    createdAt: '2026-05-20', updatedAt: '2026-05-20'
  }
];

export function useCombatList() {
  const [combats, setCombats] = useState<Combat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CombatFilters>({ search: '', status: 'Todos' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCombats(MOCK_COMBATS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCombats = useMemo(() => {
    return combats.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                          c.campaignName.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'Todos' || c.status === filters.status;
      return matchSearch && matchStatus;
    });
  }, [combats, filters]);

  const deleteCombat = useCallback((id: string) => {
    if (confirm('Deseja excluir este registro de combate?')) {
      setCombats(prev => prev.filter(c => c.id !== id));
    }
  }, []);

  return { combats: filteredCombats, loading, filters, setFilters, deleteCombat };
}
