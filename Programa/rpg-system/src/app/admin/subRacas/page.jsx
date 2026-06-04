'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import SubRacaList from './components/SubRacaList';
import SubRacaForm from './components/SubRacaForm';
import SubRacaService from './services/SubRacaService';
import styles from './page.module.css';

export default function SubRacasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await SubRacaService.save(selectedSub?.id, formData);
      setToast({ message: 'Sub-raça salva!' });
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
          <SectionTitle title="Sub-raças" subtitle="Gerencie as variações das raças principais." />
          <CrudToolbar onNew={() => { setSelectedSub(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Sub-raça" />
          
          <SubRacaList 
            data={data} 
            loading={loading}
            onEdit={(s) => { setSelectedSub(s); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(s) => { setSelectedSub(s); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(s) => { setSelectedSub(s); setIsConfirmOpen(true); }}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Sub-raça">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedSub.nome}</p>
                <div className={styles.viewAtributos}>
                  <strong>Bônus:</strong>
                  <span>FOR: {selectedSub.atributos.forca}</span>
                  <span>DES: {selectedSub.atributos.destreza}</span>
                  <span>CON: {selectedSub.atributos.constituicao}</span>
                  <span>INT: {selectedSub.atributos.inteligencia}</span>
                  <span>SAB: {selectedSub.atributos.sabedoria}</span>
                  <span>CAR: {selectedSub.atributos.carisma}</span>
                </div>
                <p><strong>Descrição:</strong> {selectedSub.descricao}</p>
              </div>
            ) : (
              <SubRacaForm initialData={selectedSub} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await SubRacaService.delete(selectedSub.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
