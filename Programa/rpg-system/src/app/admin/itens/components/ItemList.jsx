import React from 'react';
import { DataGrid, StatusBadge, Button } from '../../../../components';

const ItemList = ({ data, loading, onEdit, onDelete }) => {
  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'raridade', label: 'Raridade', render: (v) => <StatusBadge variant={v === 'Comum' ? 'neutral' : 'warning'}>{v}</StatusBadge> },
    { key: 'valor', label: 'Valor', render: (v) => `${v} po` },
    { key: 'ativo', label: 'Status', render: (val) => <StatusBadge variant={val ? 'success' : 'neutral'}>{val ? 'Ativo' : 'Inativo'}</StatusBadge> },
    {
      key: 'actions', label: 'Ações', width: '100px',
      render: (_, row) => (
        <div style={{ display: 'flex', gap: '4px' }}>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>Editar</Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row)}>Excluir</Button>
        </div>
      )
    }
  ];
  return <DataGrid columns={columns} data={data} loading={loading} />;
};
export default ItemList;
