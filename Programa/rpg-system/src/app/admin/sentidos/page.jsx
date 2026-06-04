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
  Toast
} from '../../../components';
import SentidoList from './components/SentidoList';
import SentidoForm from './components/SentidoForm';
import SentidoService from './services/SentidoService';
import styles from './page.module.css';

export default function SentidosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedSentido, setSelectedSentido] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const result = await SentidoService.search({ nome: searchTerm });
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
      await SentidoService.save(selectedSentido?.id, formData);
      setToast({ message: 'Sentido salvo com sucesso!' });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await SentidoService.delete(selectedSentido.id);
      setToast({ message: 'Sentido excluído!' });
      setIsConfirmOpen(false);
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
          <SectionTitle title="Sentidos" subtitle="Configure os sentidos e alcances sensoriais." />
          
          <CrudToolbar 
            onNew={() => { setSelectedSentido(null); setIsViewMode(false); setIsModalOpen(true); }}
            onSearch={setSearchTerm}
            newLabel="Novo Sentido"
          />

          <SentidoList 
            data={data} 
            loading={loading}
            onEdit={(s) => { setSelectedSentido(s); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(s) => { setSelectedSentido(s); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(s) => { setSelectedSentido(s); setIsConfirmOpen(true); }}
          />

          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={isViewMode ? 'Ver Sentido' : 'Sentido'}
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selectedSentido.nome}</p>
                <p><strong>Tipo:</strong> {selectedSentido.tipo}</p>
                <p><strong>Alcance:</strong> {selectedSentido.alcance}m</p>
                <p><strong>Descrição:</strong> {selectedSentido.descricao}</p>
              </div>
            ) : (
              <SentidoForm initialData={selectedSentido} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleDelete} loading={loading} />
          
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
