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
import NpcList from '../../../modules/biblioteca-rpg/components/npcs/NpcList';
import NpcForm from '../../../modules/biblioteca-rpg/components/npcs/NpcForm';
import { useNpcs } from '../../../hooks/useNpcs';
import styles from './page.module.css';

export default function NpcsPage() {
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
  } = useNpcs();

  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.main}>
        <Sidebar activeModule="biblioteca" />
        <ContentContainer>
          <SectionTitle 
            title="NPCs" 
            subtitle="Gerencie os Personagens Não Jogadores (NPCs) que habitam o seu mundo."
          />

          <CrudToolbar 
            onNew={handleNew}
            onSearch={handleSearch}
            newLabel="Novo NPC"
          />

          <NpcList 
            data={data}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={isViewMode ? 'Detalhes do NPC' : selected ? 'Editar NPC' : 'Novo NPC'}
            size="lg"
          >
            {isViewMode ? (
              <div className={styles.viewContent}>
                {selected.imagem && (
                  <img src={selected.imagem} alt={selected.nome} className={styles.portrait} />
                )}
                
                <div className={styles.viewRow}>
                  <strong>Nome:</strong> 
                  <span>{selected.nome}</span>
                </div>
                
                <div className={styles.viewRow}>
                  <strong>Localização Principal:</strong> 
                  <span>{selected.localNome}</span>
                </div>

                <div className={styles.row}>
                  <div className={styles.viewRow}>
                    <strong>Facção:</strong> 
                    <span>{selected.faccaoNome || 'Independente'}</span>
                  </div>
                  <div className={styles.viewRow}>
                    <strong>Organização:</strong> 
                    <span>{selected.organizacaoNome || 'Nenhuma'}</span>
                  </div>
                </div>

                <div className={styles.viewRow}>
                  <strong>Descrição:</strong> 
                  <p>{selected.descricao || 'Sem descrição.'}</p>
                </div>

                <div className={styles.viewRow}>
                  <strong>Personalidade:</strong> 
                  <p>{selected.personalidade || 'Não informada.'}</p>
                </div>

                <div className={styles.viewRow}>
                  <strong>História:</strong> 
                  <p>{selected.historia || 'História não registrada.'}</p>
                </div>

                <div className={styles.viewRow}>
                  <strong>Status:</strong> 
                  <span className={`${styles.statusBadge} ${selected.ativo ? styles.statusActive : styles.statusInactive}`}>
                    {selected.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            ) : (
              <NpcForm 
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
            title="Excluir NPC"
            message={`Tem certeza que deseja excluir o NPC "${selected?.nome}"? Esta ação removerá o registro permanentemente do mundo.`}
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
