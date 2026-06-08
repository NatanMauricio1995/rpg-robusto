import { useState, useMemo, useEffect, useCallback } from 'react';
import { World } from '@/types/world';
import { WorldService } from '@/services/WorldService';

export function useWorld() {
  const [worlds, setWorlds] = useState<World[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const loadWorlds = useCallback(async () => {
    setLoading(true);
    try {
      const data = await WorldService.listWorlds();
      setWorlds(data);
    } catch (error) {
      console.error("Erro ao carregar mundos:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorlds();
  }, [loadWorlds]);

  const filteredWorlds = useMemo(() => {
    return worlds.filter(world => 
      world.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      world.system.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [worlds, searchQuery]);

  const deleteWorld = useCallback(async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este mundo?')) {
      try {
        await WorldService.deleteWorld(id);
        setWorlds(prev => prev.filter(w => w.id !== id));
      } catch (error) {
        alert("Erro ao excluir mundo");
      }
    }
  }, []);

  const duplicateWorld = useCallback(async (id: string) => {
    const original = worlds.find(w => w.id === id);
    if (original) {
      try {
        const { id: _, createdAt: __, updatedAt: ___, ...data } = original;
        await WorldService.saveWorld({
          ...data,
          name: `${original.name} (Cópia)`,
        });
        await loadWorlds();
      } catch (error) {
        alert("Erro ao duplicar mundo");
      }
    }
  }, [worlds, loadWorlds]);

  return {
    worlds: filteredWorlds,
    loading,
    searchQuery,
    setSearchQuery,
    deleteWorld,
    duplicateWorld,
    refresh: loadWorlds
  };
}
