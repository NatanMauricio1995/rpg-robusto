'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import RacaList from '../../../modules/biblioteca-rpg/components/racas/RacaList';
import RacaForm from '../../../modules/biblioteca-rpg/components/racas/RacaForm';
import { useRacas } from '../../../hooks/useRacas';
import styles from './page.module.css';

export default function RacasPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useRacas();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Raças" subtitle="Gerencie as raças de personagens." />
          <CrudToolbar onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }} onSearch={setSearchTerm} newLabel="Nova Raça" />
          
          <RacaList 
            data={data} 
            loading={loading}
            onEdit={(r) => { setSelected(r); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(r) => { setSelected(r); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(r) => { setSelected(r); setIsConfirmOpen(true); }}
          />

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Raça">
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <p><strong>Tamanho:</strong> {selected.tamanho} | <strong>Deslocamento:</strong> {selected.deslocamento}m</p>
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
              <RacaForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
