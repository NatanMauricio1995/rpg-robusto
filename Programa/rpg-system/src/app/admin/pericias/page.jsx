'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import PericiaList from './components/PericiaList';
import PericiaForm from './components/PericiaForm';
import PericiaService from './services/PericiaService';
import styles from './page.module.css';

export default function PericiasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedPericia, setSelectedPericia] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await PericiaService.search({ nome: searchTerm });
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
      await PericiaService.save(selectedPericia?.id, formData);
      setToast({ message: 'Perícia salva!' });
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
          <SectionTitle title="Perícias" subtitle="Gerencie as perícias e seus atributos base." />
          <CrudToolbar onNew={() => { setSelectedPericia(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Perícia" />
          <PericiaList data={data} loading={loading} onEdit={(p) => { setSelectedPericia(p); setIsViewMode(false); setIsModalOpen(true); }} onView={(p) => { setSelectedPericia(p); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(p) => { setSelectedPericia(p); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Perícia' : 'Perícia'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedPericia.nome}</p>
                <p><strong>Atributo Base:</strong> {selectedPericia.atributoBase}</p>
                <p><strong>Requer Treino:</strong> {selectedPericia.treinada ? 'Sim' : 'Não'}</p>
                <p><strong>Descrição:</strong> {selectedPericia.descricao}</p>
              </div>
            ) : (
              <PericiaForm initialData={selectedPericia} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await PericiaService.delete(selectedPericia.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
