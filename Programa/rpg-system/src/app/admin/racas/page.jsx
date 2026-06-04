'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import RacaList from './components/RacaList';
import RacaForm from './components/RacaForm';
import RacaService from './services/RacaService';
import styles from './page.module.css';

export default function RacasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRaca, setSelectedRaca] = useState(null);
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

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      setLoading(true);
      await RacaService.save(selectedRaca?.id, formData);
      setToast({ message: 'Raça salva!' });
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
          <SectionTitle title="Raças" subtitle="Gerencie as raças de personagens." />
          <CrudToolbar onNew={() => { setSelectedRaca(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Raça" />
          
          <RacaList 
            data={data} 
            loading={loading}
            onEdit={(r) => { setSelectedRaca(r); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(r) => { setSelectedRaca(r); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(r) => { setSelectedRaca(r); setIsConfirmOpen(true); }}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Raça">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedRaca.nome}</p>
                <p><strong>Tamanho:</strong> {selectedRaca.tamanho} | <strong>Deslocamento:</strong> {selectedRaca.deslocamento}m</p>
                <div className={styles.viewAtributos}>
                  <strong>Bônus:</strong>
                  <span>FOR: {selectedRaca.atributos.forca}</span>
                  <span>DES: {selectedRaca.atributos.destreza}</span>
                  <span>CON: {selectedRaca.atributos.constituicao}</span>
                  <span>INT: {selectedRaca.atributos.inteligencia}</span>
                  <span>SAB: {selectedRaca.atributos.sabedoria}</span>
                  <span>CAR: {selectedRaca.atributos.carisma}</span>
                </div>
                <p><strong>Descrição:</strong> {selectedRaca.descricao}</p>
              </div>
            ) : (
              <RacaForm initialData={selectedRaca} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await RacaService.delete(selectedRaca.id); setIsConfirmOpen(false); fetchData(); }} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
