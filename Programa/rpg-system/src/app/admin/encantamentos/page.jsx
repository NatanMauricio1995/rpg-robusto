'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import EncantamentoList from './components/EncantamentoList';
import EncantamentoForm from './components/EncantamentoForm';
import EncantamentoService from './services/EncantamentoService';

export default function EncantamentosPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await EncantamentoService.search({ nome: search });
    setData(res);
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSave = async (formData) => {
    try {
      await EncantamentoService.save(selected?.id, formData);
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
          <SectionTitle title="Encantamentos" subtitle="Efeitos mágicos para itens." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearch} newLabel="Novo Encantamento" />
          <EncantamentoList data={data} loading={loading} onEdit={(e) => { setSelected(e); setIsModalOpen(true); }} onDelete={(e) => { setSelected(e); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Encantamento">
            <EncantamentoForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={async () => { await EncantamentoService.delete(selected.id); setIsConfirmOpen(false); fetchData(); }} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
