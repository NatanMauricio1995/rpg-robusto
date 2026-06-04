'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import ClasseList from '../../../modules/biblioteca-rpg/components/classes/ClasseList';
import ClasseForm from '../../../modules/biblioteca-rpg/components/classes/ClasseForm';
import { useClasses } from '../../../hooks/useClasses';
import styles from './page.module.css';

export default function ClassesPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useClasses();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Classes" subtitle="Gerencie as classes e arquétipos." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Classe" />
          <ClasseList data={data} loading={loading} onEdit={(c) => { setSelected(c); setIsViewMode(false); setIsModalOpen(true); }} onView={(c) => { setSelected(c); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(c) => { setSelected(c); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Classe">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <p><strong>Dado de Vida:</strong> D{selected.dadoVida}</p>
                <p><strong>Qtd Perícias:</strong> {selected.quantidadePericias}</p>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <ClasseForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
