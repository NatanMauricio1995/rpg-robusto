'use client';

import React from 'react';
import { Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast } from '../../../components';
import SubclasseList from '../../../modules/biblioteca-rpg/components/subclasses/SubclasseList';
import SubclasseForm from '../../../modules/biblioteca-rpg/components/subclasses/SubclasseForm';
import { useSubclasses } from '../../../hooks/useSubclasses';

export default function SubclassesPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useSubclasses();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Subclasses" subtitle="Especializações para as classes." />
          <CrudToolbar onNew={() => { setSelected(null); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Subclasse" />
          <SubclasseList data={data} loading={loading} onEdit={(s) => { setSelected(s); setIsModalOpen(true); }} onDelete={(s) => { setSelected(s); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Subclasse">
            <SubclasseForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
