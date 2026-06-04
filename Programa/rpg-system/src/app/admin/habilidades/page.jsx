'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import HabilidadeList from './components/HabilidadeList';
import HabilidadeForm from './components/HabilidadeForm';
import HabilidadeService from './services/HabilidadeService';

export default function HabilidadesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await HabilidadeService.search({ nome: search });
    setData(res);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      await HabilidadeService.save(selected?.id, formData);
      setToast({ message: 'Salvo com sucesso!' });
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
          <SectionTitle title="Habilidades" subtitle="Poderes e capacidades dos personagens." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearch} newLabel="Nova Habilidade" />
          <HabilidadeList data={data} loading={loading} onEdit={(h) => { setSelected(h); setIsModalOpen(true); }} onDelete={(h) => { setSelected(h); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Habilidade">
            <HabilidadeForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await HabilidadeService.delete(selected.id); setIsConfirmOpen(false); fetchData(); }} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
