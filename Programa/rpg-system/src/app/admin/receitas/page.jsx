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
import ReceitaList from '../../../modules/biblioteca-rpg/components/receitas/ReceitaList';
import ReceitaForm from '../../../modules/biblioteca-rpg/components/receitas/ReceitaForm';
import { useReceitas } from '../../../hooks/useReceitas';
import styles from './page.module.css';

export default function ReceitasPage() {
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
    setSearchTerm
  } = useReceitas();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle 
            title="Receitas" 
            subtitle="Gerencie receitas de alquimia, forja e culinária."
          />

          <CrudToolbar 
            onNew={handleNew}
            onSearch={setSearchTerm}
            newLabel="Nova Receita"
          />

          <ReceitaList 
            data={data}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={isViewMode ? 'Visualizar Receita' : selected ? 'Editar Receita' : 'Nova Receita'}
            size="lg"
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                <div className={styles.viewRow}>
                  <strong>Nome:</strong> {selected.nome}
                </div>
                <div className={styles.viewRow}>
                  <strong>Categoria:</strong> {selected.categoria}
                </div>
                <div className={styles.viewRow}>
                  <strong>Dificuldade:</strong> CD {selected.dificuldade}
                </div>
                <div className={styles.viewRow}>
                  <strong>Tempo:</strong> {selected.tempo}
                </div>
                <div className={styles.viewRow}>
                  <strong>Ferramentas:</strong> {selected.ferramentas || 'Nenhuma'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Descrição:</strong> {selected.descricao || 'Sem descrição.'}
                </div>
                <div className={styles.viewRow}>
                  <strong>Status:</strong> {selected.ativo ? 'Ativa' : 'Inativa'}
                </div>
              </div>
            ) : (
              <ReceitaForm 
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
            title="Excluir Receita"
            message={`Tem certeza que deseja excluir a receita "${selected?.nome}"?`}
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
