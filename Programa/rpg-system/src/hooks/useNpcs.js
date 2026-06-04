import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NpcService from '../services/NpcService';
import LocalService from '../services/LocalService';
import FaccaoService from '../services/FaccaoService';
import OrganizacaoService from '../services/OrganizacaoService';

export const useNpcs = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ nome: '' });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [npcsResult, locaisResult, faccoesResult, organizacoesResult] = await Promise.all([
        NpcService.search(filters),
        LocalService.findAll(),
        FaccaoService.findAll(),
        OrganizacaoService.findAll()
      ]);

      // Maps for quick lookup
      const locaisMap = locaisResult.reduce((acc, loc) => ({ ...acc, [loc.id]: loc.nome }), {});
      const faccoesMap = faccoesResult.reduce((acc, fac) => ({ ...acc, [fac.id]: fac.nome }), {});
      const organizacoesMap = organizacoesResult.reduce((acc, org) => ({ ...acc, [org.id]: org.nome }), {});

      const enrichedNpcs = npcsResult.map(npc => ({
        ...npc,
        localNome: locaisMap[npc.localId] || 'Local desconhecido',
        faccaoNome: faccoesMap[npc.faccaoId] || 'Independente',
        organizacaoNome: organizacoesMap[npc.organizacaoId] || 'Nenhuma'
      }));

      setData(enrichedNpcs);
    } catch (error) {
      setToast({ message: 'Erro ao carregar NPCs: ' + error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleNew = () => {
    setSelected(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelected(item);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleView = (item) => {
    router.push(`/admin/npcs/${item.id}`);
  };

  const handleDeleteClick = (item) => {
    setSelected(item);
    setIsConfirmOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await NpcService.save(selected?.id, formData);
      setToast({ 
        message: selected ? 'NPC atualizado com sucesso!' : 'NPC criado com sucesso!', 
        type: 'success' 
      });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await NpcService.delete(selected.id);
      setToast({ message: 'NPC excluído com sucesso!', type: 'success' });
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setFilters(prev => ({ ...prev, nome: term }));
  };

  return {
    data,
    loading,
    isModalOpen,
    setIsModalOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    selected,
    setSelected,
    isViewMode,
    setIsViewMode,
    toast,
    setToast,
    handleNew,
    handleEdit,
    handleView,
    handleDeleteClick,
    handleSave,
    handleConfirmDelete,
    handleSearch,
    refresh: fetchData
  };
};
