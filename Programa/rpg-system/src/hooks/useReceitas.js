import { useState, useEffect, useCallback } from 'react';
import ReceitaService from '../services/ReceitaService';

export const useReceitas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await ReceitaService.search({ nome: searchTerm });
      setData(result);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => { fetchData(); }, [fetchData]);

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
      await ReceitaService.save(selected?.id, formData);
      setToast({ message: selected ? 'Receita atualizada!' : 'Receita criada!', type: 'success' });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleNew, handleEdit, handleView, handleDeleteClick,
    handleSave, handleConfirmDelete, setSearchTerm
  };
};
