'use client';
import React from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import ItemList from '../../../modules/biblioteca-rpg/components/itens/ItemList';
import ItemForm from '../../../modules/biblioteca-rpg/components/itens/ItemForm';
import { useItens } from '../../../hooks/useItens';

export default function ItensPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useItens();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Itens" subtitle="Itens gerais e equipamentos." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Novo Item" />
          <ItemList data={data} loading={loading} onEdit={(i) => { setSelected(i); setIsModalOpen(true); }} onDelete={(i) => { setSelected(i); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Item">
            <ItemForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
