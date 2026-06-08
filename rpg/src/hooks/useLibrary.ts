import { LanguageService } from '@/services/LanguageService';
import { SpellSchoolService } from '@/services/SpellSchoolService';
import { SenseService } from '@/services/SenseService';
import { SkillService } from '@/services/SkillService';
import { ProficiencyService } from '@/services/ProficiencyService';
import { BackgroundService } from '@/services/BackgroundService';
import { BaseEntity, LibraryCategory } from '@/types/library';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function useLibrary() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') as LibraryCategory || 'Idiomas';
  
  const [activeCategory, setActiveCategory] = useState<LibraryCategory>(initialCategory);
  const [data, setData] = useState<BaseEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const category = searchParams.get('category') as LibraryCategory;
    if (category) {
      setActiveCategory(category);
    }
  }, [searchParams]);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (activeCategory === 'Idiomas') {
        const languages = await LanguageService.listLanguages();
        setData(languages);
      } else if (activeCategory === 'Escolas de Magia') {
        const schools = await SpellSchoolService.listSchools();
        setData(schools);
      } else if (activeCategory === 'Sentidos') {
        const senses = await SenseService.listSenses();
        setData(senses);
      } else if (activeCategory === 'Perícias') {
        const skills = await SkillService.listSkills();
        setData(skills);
      } else if (activeCategory === 'Proficiências') {
        const profs = await ProficiencyService.listProficiencies();
        setData(profs);
      } else if (activeCategory === 'Antecedentes') {
        const bgs = await BackgroundService.listBackgrounds();
        setData(bgs);
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
        } else if (activeCategory === 'Sentidos') {
          await SenseService.deleteSense(id);
        } else if (activeCategory === 'Perícias') {
          await SkillService.deleteSkill(id);
        } else if (activeCategory === 'Proficiências') {
          await ProficiencyService.deleteProficiency(id);
        } else if (activeCategory === 'Antecedentes') {
          await BackgroundService.deleteBackground(id);
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
]);

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
