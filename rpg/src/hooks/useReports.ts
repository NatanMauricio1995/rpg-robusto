import { useState, useMemo, useEffect } from 'react';
import { ReportCategory, ReportFilters } from '@/types/report';

export function useReports() {
  const [activeCategory, setActiveCategory] = useState<ReportCategory>('Campanhas');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ReportFilters>({ search: '' });

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Mock dinâmico de relatórios
      const mockData = Array.from({ length: 5 }).map((_, i) => ({
        id: `rep-${activeCategory}-${i}`,
        name: `${activeCategory} Relatório ${i + 1}`,
        status: 'Ativo',
        createdAt: '2026-06-01',
        updatedAt: '2026-06-05',
        // Campos específicos por categoria para o DataGrid
        ...(activeCategory === 'Campanhas' && { system: 'D&D 5e', totalSessions: 12 + i, totalXP: 5000 * (i+1) }),
        ...(activeCategory === 'Personagens' && { playerName: `Jogador ${i+1}`, level: 10 + i, sessionsPlayed: 20 }),
        ...(activeCategory === 'Combates' && { campaignName: 'Crônicas de Aethelgard', totalRounds: 5 + i, difficulty: 'Médio' }),
        ...(activeCategory === 'Inimigos' && { type: 'Morto-Vivo', challengeRating: '5', timesEncountered: 3 }),
      }));
      setData(mockData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filters.search.toLowerCase())
    );
  }, [data, filters.search]);

  const exportReport = (format: 'PDF' | 'CSV') => {
    alert(`Exportando Relatório de ${activeCategory} em ${format}...`);
  };

  return {
    activeCategory,
    setActiveCategory,
    data: filteredData,
    loading,
    filters,
    setFilters,
    exportReport
  };
}
