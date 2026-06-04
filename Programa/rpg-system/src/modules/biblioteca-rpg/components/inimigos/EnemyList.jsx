import React from 'react';
import { DataGrid } from '../../../../components';

const EnemyList = ({ data, loading, onEdit, onDelete, onView }) => {
  const columns = [
    { field: 'nome', header: 'Nome', width: '30%' },
    { field: 'nivel', header: 'Nível', width: '10%' },
    { field: 'hpBase', header: 'HP Base', width: '15%' },
    { field: 'caBase', header: 'CA', width: '10%' },
    { field: 'xpConcedida', header: 'XP', width: '15%' }
  ];

  const actions = [
    { 
      label: 'Detalhes', 
      icon: '👁️', 
      onClick: onView,
      variant: 'ghost'
    },
    { 
      label: 'Editar', 
      icon: '✏️', 
      onClick: onEdit,
      variant: 'primary'
    },
    { 
      label: 'Excluir', 
      icon: '🗑️', 
      onClick: onDelete,
      variant: 'danger'
    }
  ];

  return (
    <DataGrid 
      columns={columns} 
      data={data} 
      loading={loading} 
      actions={actions}
      emptyMessage="Nenhum inimigo encontrado."
    />
  );
};

export default EnemyList;
