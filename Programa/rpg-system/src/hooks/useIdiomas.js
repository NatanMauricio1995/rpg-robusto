import { useState, useEffect, useCallback } from 'react';
import IdiomaService from '../services/IdiomaService';

export const useIdiomas = () => {
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
      const result = await IdiomaService.search(filters);
      setData(result);
    } catch (error) {
      setToast({ message: 'Erro ao carregar idiomas: ' + error.message, type: 'error' });
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
    setSelected(item);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item) => {
    setSelected(item);
    setIsConfirmOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await IdiomaService.save(selected?.id, formData);
      setToast({ message: selected ? 'Idioma atualizado!' : 'Idioma criado!', type: 'success' });
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
      await IdiomaService.delete(selected.id);
      setToast({ message: 'Idioma excluído!', type: 'success' });
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
