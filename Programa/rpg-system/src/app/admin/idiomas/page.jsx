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
import IdiomaList from '../../../modules/biblioteca-rpg/components/idiomas/IdiomaList';
import IdiomaForm from '../../../modules/biblioteca-rpg/components/idiomas/IdiomaForm';
import { useIdiomas } from '../../../hooks/useIdiomas';
import styles from './page.module.css';

export default function IdiomasPage() {
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
  } = useIdiomas();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle 
            title="Idiomas" 
            subtitle="Gerencie os idiomas disponíveis no mundo de RPG."
          />

          <CrudToolbar 
            onNew={handleNew}
            onSearch={handleSearch}
            newLabel="Novo Idioma"
          />

          <IdiomaList 
            data={data}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={isViewMode ? 'Visualizar Idioma' : selected ? 'Editar Idioma' : 'Novo Idioma'}
            size="md"
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                <div className={styles.viewRow}>
                  <strong>Nome:</strong> {selected.nome}
                </div>
                <div className={styles.viewRow}>
                  <strong>Raridade:</strong> {selected.raridade}
                </div>
                <div className={styles.viewRow}>
                  <strong>Escrita:</strong> {selected.escrita || 'Nenhuma'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Descrição:</strong> {selected.descricao || 'Sem descrição.'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Status:</strong> {selected.ativo ? 'Ativo' : 'Inativo'}
                </div>
              </div>
            ) : (
              <IdiomaForm 
                initialData={selected}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
                loading={loading}
              />
            )}
          </Modal>

          <ConfirmDialog
            isOpen={isConfirmOpen}
            onClose={() => setIsConfirmOpen(false)}
            onConfirm={handleConfirmDelete}
            title="Excluir Idioma"
            message={`Tem certeza que deseja excluir o idioma "${selected?.nome}"? Esta ação não pode ser desfeita.`}
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
