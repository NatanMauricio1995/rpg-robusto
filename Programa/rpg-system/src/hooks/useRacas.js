import { useState, useEffect, useCallback } from 'react';
import RacaService from '../services/RacaService';

export const useRacas = () => {
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
      const result = await RacaService.search({ nome: searchTerm });
      setData(result);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await RacaService.save(selected?.id, formData);
      setToast({ message: 'Raça salva!', type: 'success' });
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
      await RacaService.delete(selected.id);
      setToast({ message: 'Raça excluída!', type: 'success' });
      setIsConfirmOpen(false);
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
    handleSave, handleConfirmDelete, setSearchTerm
  };
};
