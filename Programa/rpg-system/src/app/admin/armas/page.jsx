'use client';
import React from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import ArmaList from './components/ArmaList';
import ArmaForm from './components/ArmaForm';
import { useArmas } from '../../../hooks/useArmas';

export default function ArmasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useArmas();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Armas" subtitle="Equipamentos de combate." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Arma" />
          <ArmaList data={data} loading={loading} onEdit={(a) => { setSelected(a); setIsModalOpen(true); }} onDelete={(a) => { setSelected(a); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Arma">
            <ArmaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
