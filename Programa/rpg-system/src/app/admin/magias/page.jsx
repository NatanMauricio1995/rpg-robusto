'use client';
import React from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import MagiaList from './components/MagiaList';
import MagiaForm from './components/MagiaForm';
import { useMagias } from '../../../hooks/useMagias';

export default function MagiasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useMagias();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Magias" subtitle="Conhecimento arcano e divino." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Magia" />
          <MagiaList data={data} loading={loading} onEdit={(m) => { setSelected(m); setIsModalOpen(true); }} onDelete={(m) => { setSelected(m); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Magia">
            <MagiaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
