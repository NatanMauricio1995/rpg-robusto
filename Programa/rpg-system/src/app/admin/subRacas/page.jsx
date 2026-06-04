'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import SubRacaList from '../../../modules/biblioteca-rpg/components/subRacas/SubRacaList';
import SubRacaForm from '../../../modules/biblioteca-rpg/components/subRacas/SubRacaForm';
import { useSubRacas } from '../../../hooks/useSubRacas';
import styles from './page.module.css';

export default function SubRacasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useSubRacas();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Sub-raças" subtitle="Gerencie as variações das raças principais." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Sub-raça" />
          
          <SubRacaList 
            data={data} 
            loading={loading}
            onEdit={(s) => { setSelected(s); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(s) => { setSelected(s); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(s) => { setSelected(s); setIsConfirmOpen(true); }}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Sub-raça">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <div className={styles.viewAtributos}>
                  <strong>Bônus:</strong>
                  <span>FOR: {selected.atributos.forca}</span>
                  <span>DES: {selected.atributos.destreza}</span>
                  <span>CON: {selected.atributos.constituicao}</span>
                  <span>INT: {selected.atributos.inteligencia}</span>
                  <span>SAB: {selected.atributos.sabedoria}</span>
                  <span>CAR: {selected.atributos.carisma}</span>
                </div>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <SubRacaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
