import { useState, useEffect } from 'react';
import { DashboardData } from '@/types/dashboard';

export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulação de carregamento de dados (Futuramente virá de um Service)
    const mockData: DashboardData = {
      stats: {
        activeCampaigns: 3,
        totalCharacters: 12,
        nextSessionDate: '15 de Junho',
        libraryItems: 45
      },
      recentActivities: [
        {
          id: '1',
          type: 'character',
          description: 'Novo personagem "Eldrin o Sábio" criado.',
          timestamp: 'Há 2 horas',
          user: 'Mestre'
        },
        {
          id: '2',
          type: 'campaign',
          description: 'A campanha "As Crônicas de Aethelgard" foi atualizada.',
          timestamp: 'Há 5 horas',
          user: 'Mestre'
        },
        {
          id: '3',
          type: 'session',
          description: 'Sessão #4 agendada para 15/06.',
          timestamp: 'Ontem',
          user: 'Sistema'
        }
      ]
    };

    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
