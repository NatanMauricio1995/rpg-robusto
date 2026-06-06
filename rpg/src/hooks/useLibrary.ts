import { useState, useMemo, useEffect, useCallback } from 'react';
import { LibraryCategory, BaseEntity } from '@/types/library';

export function useLibrary() {
  const [activeCategory, setActiveCategory] = useState<LibraryCategory>('Idiomas');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    // Simulação de Fetch baseada na categoria
    const timer = setTimeout(() => {
      // Mock dinâmico para demonstração
      const mockData = Array.from({ length: 5 }).map((_, i) => ({
        id: `${activeCategory}-${i}`,
        name: `${activeCategory} Exemplo ${i + 1}`,
        status: 'Ativo',
        createdAt: '2026-06-01',
        updatedAt: '2026-06-05',
        description: `Descrição de exemplo para ${activeCategory}.`
      }));
      setData(mockData);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const deleteItem = useCallback((id: string) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      setData(prev => prev.filter(item => item.id !== id));
    }
  }, []);

  return {
    activeCategory,
    setActiveCategory,
    data: filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    deleteItem
  };
}
