import { useState, useEffect, useCallback } from 'react';
import SubRacaService from '../services/SubRacaService';

export const useSubRacas = () => {
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
      const result = await SubRacaService.search({ nome: searchTerm });
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
      await SubRacaService.save(selected?.id, formData);
      setToast({ message: 'Sub-raça salva!', type: 'success' });
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
      await SubRacaService.delete(selected.id);
      setToast({ message: 'Sub-raça excluída!', type: 'success' });
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
