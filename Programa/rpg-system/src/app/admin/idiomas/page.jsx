'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, 
  Sidebar, 
  ContentContainer, 
  SectionTitle, 
  CrudToolbar, 
  Modal, 
  ConfirmDialog,
  Toast,
  Loading
} from '../../../components';
import IdiomaList from './components/IdiomaList';
import IdiomaForm from './components/IdiomaForm';
import IdiomaService from './services/IdiomaService';
import styles from './page.module.css';

export default function IdiomasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedIdioma, setSelectedIdioma] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({ nome: '', raridade: '', ativo: undefined });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await IdiomaService.search(filters);
      setData(result);
    } catch (error) {
      showToast('Erro ao carregar dados: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleNew = () => {
    setSelectedIdioma(null);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleEdit = (idioma) => {
    setSelectedIdioma(idioma);
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleView = (idioma) => {
    setSelectedIdioma(idioma);
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (idioma) => {
    setSelectedIdioma(idioma);
    setIsConfirmOpen(true);
  };

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await IdiomaService.save(selectedIdioma?.id, formData);
      showToast(selectedIdioma ? 'Idioma atualizado com sucesso!' : 'Idioma criado com sucesso!');
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await IdiomaService.delete(selectedIdioma.id);
      showToast('Idioma excluído com sucesso!');
      setIsConfirmOpen(false);
      fetchData();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setFilters(prev => ({ ...prev, nome: term }));
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle 
            title="Idiomas" 
            subtitle="Gerencie os idiomas disponíveis no mundo de RPG."
          />

          <CrudToolbar 
            onNew={handleNew}
            onSearch={handleSearch}
            newLabel="Novo Idioma"
          />

          <IdiomaList 
            data={data}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={isViewMode ? 'Visualizar Idioma' : selectedIdioma ? 'Editar Idioma' : 'Novo Idioma'}
            size="md"
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                <div className={styles.viewRow}>
                  <strong>Nome:</strong> {selectedIdioma.nome}
                </div>
                <div className={styles.viewRow}>
                  <strong>Raridade:</strong> {selectedIdioma.raridade}
                </div>
                <div className={styles.viewRow}>
                  <strong>Escrita:</strong> {selectedIdioma.escrita || 'Nenhuma'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Descrição:</strong> {selectedIdioma.descricao || 'Sem descrição.'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Status:</strong> {selectedIdioma.ativo ? 'Ativo' : 'Inativo'}
                </div>
              </div>
            ) : (
              <IdiomaForm 
                initialData={selectedIdioma}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
                loading={loading}
              />
            )}
          </Modal>

          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Excluir Idioma"
            message={`Tem certeza que deseja excluir o idioma "${selectedIdioma?.nome}"? Esta ação não pode ser desfeita.`}
            loading={loading}
          />

          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}

          {loading && !isModalOpen && !isConfirmOpen && data.length > 0 && (
            <Loading type="full" label="Atualizando..." />
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
