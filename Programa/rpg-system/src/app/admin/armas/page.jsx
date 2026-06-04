'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import ArmaList from './components/ArmaList';
import ArmaForm from './components/ArmaForm';
import ArmaService from './services/ArmaService';

export default function ArmasPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await ArmaService.search({ nome: search });
    setData(res);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      await ArmaService.save(selected?.id, formData);
      setToast({ message: 'Arma salva!' });
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
          <SectionTitle title="Armas" subtitle="Equipamentos de combate." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearch} newLabel="Nova Arma" />
          <ArmaList data={data} loading={loading} onEdit={(a) => { setSelected(a); setIsModalOpen(true); }} onDelete={(a) => { setSelected(a); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Arma">
            <ArmaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await ArmaService.delete(selected.id); setIsConfirmOpen(false); fetchData(); }} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
