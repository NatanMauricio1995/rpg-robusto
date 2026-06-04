import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import styles from './ReceitaList.module.css';

const ReceitaList = ({ data, loading, onEdit, onDelete, onView }) => {
  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'categoria', label: 'Categoria' },
    { key: 'dificuldade', label: 'CD', render: (val) => `CD ${val}` },
    {
      key: 'ativo',
      label: 'Status',
      render: (val) => <StatusBadge variant={val ? 'success' : 'neutral'}>{val ? 'Ativo' : 'Inativo'}</StatusBadge>
    },
    {
      key: 'actions',
      label: 'Ações',
      width: '150px',
      render: (_, row) => (
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={() => onView(row)} title="Visualizar">
            <Eye size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row)} title="Editar">
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row)} title="Excluir">
            <Trash2 size={16} className={styles.deleteIcon} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <DataGrid
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="Nenhuma receita encontrada."
    />
  );
};

export default ReceitaList;
