'use client';
import React from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import HabilidadeList from './components/HabilidadeList';
import HabilidadeForm from './components/HabilidadeForm';
import { useHabilidades } from '../../../hooks/useHabilidades';

export default function HabilidadesPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useHabilidades();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Habilidades" subtitle="Poderes e capacidades dos personagens." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Habilidade" />
          <HabilidadeList data={data} loading={loading} onEdit={(h) => { setSelected(h); setIsModalOpen(true); }} onDelete={(h) => { setSelected(h); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Habilidade">
            <HabilidadeForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
