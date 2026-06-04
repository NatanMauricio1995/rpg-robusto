'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import ClasseList from './components/ClasseList';
import ClasseForm from './components/ClasseForm';
import ClasseService from './services/ClasseService';
import styles from './page.module.css';

export default function ClassesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedClasse, setSelectedClasse] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await ClasseService.search({ nome: searchTerm });
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
      await ClasseService.save(selectedClasse?.id, formData);
      setToast({ message: 'Classe salva!' });
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
          <SectionTitle title="Classes" subtitle="Gerencie as classes e arquétipos." />
          <CrudToolbar onNew={() => { setSelectedClasse(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Classe" />
          <ClasseList data={data} loading={loading} onEdit={(c) => { setSelectedClasse(c); setIsViewMode(false); setIsModalOpen(true); }} onView={(c) => { setSelectedClasse(c); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(c) => { setSelectedClasse(c); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Classe">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedClasse.nome}</p>
                <p><strong>Dado de Vida:</strong> D{selectedClasse.dadoVida}</p>
                <p><strong>Qtd Perícias:</strong> {selectedClasse.quantidadePericias}</p>
                <p><strong>Descrição:</strong> {selectedClasse.descricao}</p>
              </div>
            ) : (
              <ClasseForm initialData={selectedClasse} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await ClasseService.delete(selectedClasse.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
