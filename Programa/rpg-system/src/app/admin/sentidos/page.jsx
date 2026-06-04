'use client';

import React from 'react';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, CrudToolbar, Modal, ConfirmDialog, Toast 
} from '../../../components';
import SentidoList from '../../../modules/biblioteca-rpg/components/sentidos/SentidoList';
import SentidoForm from '../../../modules/biblioteca-rpg/components/sentidos/SentidoForm';
import { useSentidos } from '../../../hooks/useSentidos';
import styles from './page.module.css';

export default function SentidosPage() {
  const {
    data, loading, isModalOpen, setIsModalOpen, isConfirmOpen, setIsConfirmOpen,
    selected, setSelected, isViewMode, setIsViewMode, toast, setToast,
    handleSave, handleConfirmDelete, setSearchTerm
  } = useSentidos();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle title="Sentidos" subtitle="Configure os sentidos e alcances sensoriais." />
          
          <CrudToolbar 
            onNew={() => { setSelected(null); setIsViewMode(false); setIsModalOpen(true); }}
            onSearch={setSearchTerm}
            newLabel="Novo Sentido"
          />

          <SentidoList 
            data={data} 
            loading={loading}
            onEdit={(s) => { setSelected(s); setIsViewMode(false); setIsModalOpen(true); }}
            onView={(s) => { setSelected(s); setIsViewMode(true); setIsModalOpen(true); }}
            onDelete={(s) => { setSelected(s); setIsConfirmOpen(true); }}
          />

          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title={isViewMode ? 'Ver Sentido' : 'Sentido'}
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                <p><strong>Nome:</strong> {selected.nome}</p>
                <p><strong>Tipo:</strong> {selected.tipo}</p>
                <p><strong>Alcance:</strong> {selected.alcance}m</p>
                <p><strong>Descrição:</strong> {selected.descricao}</p>
              </div>
            ) : (
              <SentidoForm initialData={selected} onSave={handleSave} onCancel={() => setIsModalOpen(false)} loading={loading} />
            )}
          </Modal>

          <ConfirmDialog isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} onConfirm={handleConfirmDelete} loading={loading} />
          
          {toast && <Toast {...toast} onClose={() => setToast(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
