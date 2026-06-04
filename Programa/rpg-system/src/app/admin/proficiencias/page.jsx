'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import ProficienciaList from './components/ProficienciaList';
import ProficienciaForm from './components/ProficienciaForm';
import ProficienciaService from './services/ProficienciaService';
import styles from './page.module.css';

export default function ProficienciasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await ProficienciaService.search({ nome: searchTerm });
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
      await ProficienciaService.save(selectedProf?.id, formData);
      setToast({ message: 'Proficiência salva!' });
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
          <SectionTitle title="Proficiências" subtitle="Gerencie armas, armaduras e outras proficiências." />
          <CrudToolbar onNew={() => { setSelectedProf(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Proficiência" />
          <ProficienciaList data={data} loading={loading} onEdit={(p) => { setSelectedProf(p); setIsViewMode(false); setIsModalOpen(true); }} onView={(p) => { setSelectedProf(p); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(p) => { setSelectedProf(p); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Proficiência' : 'Proficiência'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedProf.nome}</p>
                <p><strong>Categoria:</strong> {selectedProf.categoria}</p>
                <p><strong>Descrição:</strong> {selectedProf.descricao}</p>
              </div>
            ) : (
              <ProficienciaForm initialData={selectedProf} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await ProficienciaService.delete(selectedProf.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
