'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import EscolaMagiaList from '../../../modules/biblioteca-rpg/components/escolasMagia/EscolaMagiaList';
import EscolaMagiaForm from '../../../modules/biblioteca-rpg/components/escolasMagia/EscolaMagiaForm';
import { useEscolasMagia } from '../../../hooks/useEscolasMagia';
import styles from './page.module.css';

export default function EscolasMagiaPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useEscolasMagia();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Escolas de Magia" subtitle="Gerencie as diferentes tradições arcanas." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Escola" />
          <EscolaMagiaList data={data} loading={loading} onEdit={(e) => { setSelected(e); setIsViewMode(false); setIsModalOpen(true); }} onView={(e) => { setSelected(e); setIsViewMode(true); setIsModalOpen(true); }} onDelete={(e) => { setSelected(e); setIsConfirmOpen(true); }} />
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={isViewMode ? 'Ver Escola' : 'Escola de Magia'}>
            {isViewMode ? (
              <div className={styles.viewContent}>
                <div className={styles.colorIndicator} style={{ backgroundColor: selected.cor }}>Escola de {selected.nome}</div>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <EscolaMagiaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>
          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
