import React from 'react';
import { DataGrid } from '../../../../components';

const NpcList = ({ data, loading, onEdit, onDelete, onView }) => {
  const columns = [
    { field: 'nome', header: 'Nome', width: '30%' },
    { 
      field: 'localNome', 
      header: 'Localização', 
      width: '30%'
    },
    { 
      field: 'ativo', 
      header: 'Status', 
      width: '15%',
      render: (val) => val ? 'Ativo' : 'Inativo'
    }
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
      emptyMessage="Nenhum NPC encontrado."
    />
  );
};

export default NpcList;
