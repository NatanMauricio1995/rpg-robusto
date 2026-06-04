'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import MagiaList from './components/MagiaList';
import MagiaForm from './components/MagiaForm';
import MagiaService from './services/MagiaService';

export default function MagiasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await MagiaService.search({ nome: search });
    setData(res);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      await MagiaService.save(selected?.id, formData);
      setToast({ message: 'Magia salva com sucesso!' });
      setIsModalOpen(false);
      fetchData();
    } catch (e) { setToast({ message: e.message, type: 'error' }); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Magias" subtitle="Conhecimento arcano e divino." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearch} newLabel="Nova Magia" />
          <MagiaList data={data} loading={loading} onEdit={(m) => { setSelected(m); setIsModalOpen(true); }} onDelete={(m) => { setSelected(m); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Magia">
            <MagiaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await MagiaService.delete(selected.id); setIsConfirmOpen(false); fetchData(); }} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
