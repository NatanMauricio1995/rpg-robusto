import { useState, useMemo, useEffect } from 'react';
import { Campaign, CampaignFilters } from '@/types/campaign';

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: '1',
    name: 'As Crônicas de Aethelgard',
    system: 'D&D 5e',
    world: 'Aethelgard',
    dm: 'Mestre Arcano',
    playerCount: 4,
    maxPlayers: 5,
    status: 'Ativa',
    nextSession: '15/06 às 20h',
    frequency: 'Semanal',
    description: 'Uma jornada épica para recuperar os fragmentos da Estrela Caída e impedir o despertar do Deus Aranha.'
  },
  {
    id: '2',
    name: 'Sombras de Ravnica',
    system: 'D&D 5e',
    world: 'Ravnica',
    dm: 'Lady Jace',
    playerCount: 6,
    maxPlayers: 6,
    status: 'Pausada',
    nextSession: null,
    frequency: 'Quinzenal',
    description: 'Intrigas políticas e mistérios nas profundezas da cidade-mundo de Ravnica.'
  },
  {
    id: '3',
    name: 'O Legado de Ferro',
    system: 'Pathfinder 2e',
    world: 'Golarion',
    dm: 'Dwarf Master',
    playerCount: 3,
    maxPlayers: 4,
    status: 'Recrutando',
    nextSession: 'A definir',
    frequency: 'Mensal',
    description: 'Um grupo de mercenários descobre um antigo segredo em uma fortaleza anã abandonada.'
  }
];

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<CampaignFilters>({
    search: '',
    status: 'Todas'
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCampaigns(MOCK_CAMPAIGNS);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(filters.search.toLowerCase()) || 
                          c.world.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'Todas' || c.status === filters.status;
      return matchSearch && matchStatus;
    });
  }, [campaigns, filters]);

  return { campaigns: filteredCampaigns, loading, filters, setFilters };
}
