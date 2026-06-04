'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import PericiaList from '../../../modules/biblioteca-rpg/components/pericias/PericiaList';
import PericiaForm from '../../../modules/biblioteca-rpg/components/pericias/PericiaForm';
import { usePericias } from '../../../hooks/usePericias';
import styles from './page.module.css';

export default function PericiasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = usePericias();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Perícias" subtitle="Gerencie as perícias e seus atributos base." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Perícia" />
          <PericiaList data={data} loading={loading} onEdit={(p) => { setSelected(p); setIsViewMode(false); setIsModalOpen(true); }} onView={(p) => { setSelected(p); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(p) => { setSelected(p); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Perícia' : 'Perícia'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <p><strong>Atributo Base:</strong> {selected.atributoBase}</p>
                <p><strong>Requer Treino:</strong> {selected.treinada ? 'Sim' : 'Não'}</p>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <PericiaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
