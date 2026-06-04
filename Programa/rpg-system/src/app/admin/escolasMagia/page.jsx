'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import EscolaMagiaList from './components/EscolaMagiaList';
import EscolaMagiaForm from './components/EscolaMagiaForm';
import EscolaMagiaService from './services/EscolaMagiaService';
import styles from './page.module.css';

export default function EscolasMagiaPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await EscolaMagiaService.search({ nome: searchTerm });
      setData(result);
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await EscolaMagiaService.save(selectedEscola?.id, formData);
      setToast({ message: 'Escola de magia salva!' });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Escolas de Magia" subtitle="Gerencie as diferentes tradições arcanas." />
          <CrudToolbar onNew={() => { setSelectedEscola(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Escola" />
          <EscolaMagiaList data={data} loading={loading} onEdit={(e) => { setSelectedEscola(e); setIsViewMode(false); setIsModalOpen(true); }} onView={(e) => { setSelectedEscola(e); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(e) => { setSelectedEscola(e); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Escola' : 'Escola de Magia'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <div className={styles.colorIndicator} style={{ backgroundColor: selectedEscola.cor }}>Escola de {selectedEscola.nome}</div>
                <p><strong>Descrição:</strong> {selectedEscola.descricao}</p>
              </div>
            ) : (
              <EscolaMagiaForm initialData={selectedEscola} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await EscolaMagiaService.delete(selectedEscola.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
