'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import ProficienciaList from './components/ProficienciaList';
import ProficienciaForm from './components/ProficienciaForm';
import { useProfiencias } from '../../../hooks/useProfiencias';
import styles from './page.module.css';

export default function ProficienciasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useProfiencias();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Proficiências" subtitle="Gerencie armas, armaduras e outras proficiências." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Proficiência" />
          <ProficienciaList data={data} loading={loading} onEdit={(p) => { setSelected(p); setIsViewMode(false); setIsModalOpen(true); }} onView={(p) => { setSelected(p); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(p) => { setSelected(p); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Proficiência' : 'Proficiência'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <p><strong>Categoria:</strong> {selected.categoria}</p>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <ProficienciaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
