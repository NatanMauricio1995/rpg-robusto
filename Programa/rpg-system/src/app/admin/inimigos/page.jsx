'use client';

import React from 'react';
import { 
  Header, 
  Sidebar, 
  ContentContainer, 
  SectionTitle, 
  CrudToolbar, 
  Modal, 
  ConfirmDialog,
  Toast,
  Loading
} from '../../../components';
import EnemyList from '../../../modules/biblioteca-rpg/components/inimigos/EnemyList';
import EnemyForm from '../../../modules/biblioteca-rpg/components/inimigos/EnemyForm';
import { useInimigos } from '../../../hooks/useInimigos';
import styles from './page.module.css';

export default function InimigosPage() {
  const {
    data,
    loading,
    isModalOpen,
    setIsModalOpen,
    isConfirmOpen,
    setIsConfirmOpen,
    selected,
    isViewMode,
    toast,
    setToast,
    handleNew,
    handleEdit,
    handleView,
    handleDeleteClick,
    handleSave,
    handleConfirmDelete,
    handleSearch
  } = useInimigos();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="bestiario" />
        <ContentContainer>
          <SectionTitle 
            title="Bestiário (Inimigos)" 
            subtitle="Gerencie as criaturas e inimigos que desafiarão os seus jogadores."
          />

          <CrudToolbar 
            onNew={handleNew}
            onSearch={handleSearch}
            newLabel="Novo Inimigo"
          />

          <EnemyList 
            data={data}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selected ? 'Editar Inimigo' : 'Novo Inimigo'}
            size="lg"
          >
            <EnemyForm 
              initialData={selected}
              onSave={handleSave}
              onCancel={() => setIsModalOpen(false)}
              loading={loading}
            />
          </Modal>

          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Excluir Inimigo"
            message={`Tem certeza que deseja excluir o inimigo "${selected?.nome}"? Esta ação não pode ser desfeita.`}
            loading={loading}
          />

          {toast && (
            <Toast 
              message={toast.message} 
              type={toast.type} 
              onClose={() => setToast(null)} 
            />
          )}

          {loading && !isModalOpen && !isConfirmOpen && data.length > 0 && (
            <Loading type="full" label="Atualizando..." />
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
