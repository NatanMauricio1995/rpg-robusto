import { LanguageService } from '@/services/LanguageService';
import { SpellSchoolService } from '@/services/SpellSchoolService';
import { BaseEntity, LibraryCategory } from '@/types/library';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useLibrary() {
  const [activeCategory, setActiveCategory] = useState<LibraryCategory>('Idiomas');
  const [data, setData] = useState<BaseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeCategory === 'Idiomas') {
        const languages = await LanguageService.listLanguages();
        setData(languages);
      } else if (activeCategory === 'Escolas de Magia') {
        const schools = await SpellSchoolService.listSchools();
        setData(schools);
      } else {
        // Simulação para outras categorias ainda não implementadas
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockData: BaseEntity[] = Array.from({ length: 3 }).map((_, i) => ({
          id: `${activeCategory}-${i}`,
          name: `${activeCategory} Exemplo ${i + 1}`,
          status: 'Ativo',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          description: `Descrição de exemplo para ${activeCategory}.`
        }));
        setData(mockData);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da biblioteca:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      if (isMounted) await loadData();
    };
    fetchData();
    return () => { isMounted = false; };
  }, [loadData]);

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const deleteItem = useCallback(async (id: string) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      try {
        if (activeCategory === 'Idiomas') {
          await LanguageService.deleteLanguage(id);
        } else if (activeCategory === 'Escolas de Magia') {
          await SpellSchoolService.deleteSchool(id);
        }
        setData(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        alert("Erro ao excluir registro");
      }
    }
  }, [activeCategory]);

  return {
    activeCategory,
    setActiveCategory,
    data: filteredData,
    loading,
    searchQuery,
    setSearchQuery,
    deleteItem,
    refresh: loadData
  };
}
