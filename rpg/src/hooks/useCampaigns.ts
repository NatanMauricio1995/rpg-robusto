import { useState, useMemo, useEffect, useCallback } from 'react';
import { Campaign, CampaignFilters } from '@/types/campaign';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1', name: 'As Crônicas de Aethelgard', status: 'Ativa', system: 'D&D 5e', worldId: 'w1', worldName: 'Aethelgard',
    dmId: 'u1', dmName: 'Mestre Arcano', playerCount: 4, maxPlayers: 5,
    createdAt: '2026-01-15', updatedAt: '2026-06-01', description: 'Uma jornada épica...'
  },
  {
    id: '2', name: 'Sombras de Ravnica', status: 'Pausada', system: 'D&D 5e', worldId: 'w2', worldName: 'Ravnica',
    dmId: 'u1', dmName: 'Mestre Arcano', playerCount: 6, maxPlayers: 6,
    createdAt: '2026-02-10', updatedAt: '2026-05-20', description: 'Intrigas políticas...'
  },
  {
    id: '3', name: 'O Legado de Ferro', status: 'Recrutando', system: 'Pathfinder 2e', worldId: 'w3', worldName: 'Golarion',
    dmId: 'u2', dmName: 'Dwarf Master', playerCount: 2, maxPlayers: 4,
    createdAt: '2026-05-01', updatedAt: '2026-06-05', description: 'Mistérios em fortalezas...'
  }
];

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Todas');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCampaigns(MOCK_CAMPAIGNS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.worldName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'Todas' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [campaigns, searchQuery, statusFilter]);

  const deleteCampaign = useCallback((id: string) => {
    if (confirm('Deseja excluir esta campanha e todos os seus registros?')) {
      setCampaigns(prev => prev.filter(c => c.id !== id));
    }
  }, []);

  return { 
    campaigns: filteredCampaigns, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter,
    deleteCampaign 
  };
}
