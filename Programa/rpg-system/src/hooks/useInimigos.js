import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import InimigoService from '../services/InimigoService';

export const useInimigos = () => {
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
      const result = await InimigoService.search(filters);
      setData(result);
    } catch (error) {
      setToast({ message: 'Erro ao carregar inimigos: ' + error.message, type: 'error' });
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
    router.push(`/admin/inimigos/${item.id}`);
  };

  const handleDeleteClick = (item) => {
    setSelected(item);
    setIsConfirmOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await InimigoService.save(selected?.id, formData);
      setToast({ 
        message: selected ? 'Inimigo atualizado com sucesso!' : 'Inimigo criado com sucesso!', 
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
      await InimigoService.delete(selected.id);
      setToast({ message: 'Inimigo excluído com sucesso!', type: 'success' });
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
    isViewMode,
    toast,
    setToast,
    handleNew,
    handleEdit,
    handleView,
    handleDeleteClick,
    handleSave,
    handleConfirmDelete,
    handleSearch
  };
};
