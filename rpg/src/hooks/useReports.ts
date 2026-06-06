import { useState, useEffect } from 'react';
import { ReportData } from '@/types/report';

export function useReports() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: ReportData = {
      metrics: {
        totalSessions: 24,
        totalHours: 120,
        combatsWon: 42,
        goldEarned: 15400
      },
      playerStats: [
        { id: '1', name: 'Eldrin Valerius', level: 12, exp: { current: 12500, next: 15000 }, kills: 15, assists: 34 },
        { id: '2', name: 'Korg o Destruidor', level: 12, exp: { current: 8900, next: 15000 }, kills: 48, assists: 12 },
        { id: '3', name: 'Lira Silverfoot', level: 11, exp: { current: 14200, next: 14500 }, kills: 8, assists: 56 }
      ]
    };

    const timer = setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return { data, loading };
}
