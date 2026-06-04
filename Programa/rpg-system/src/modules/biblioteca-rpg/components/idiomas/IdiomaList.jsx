import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import styles from './IdiomaList.module.css';

const IdiomaList = ({ data, loading, onEdit, onDelete, onView, pagination, onPageChange }) => {
  const columns = [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'raridade',
      label: 'Raridade',
      render: (val) => <StatusBadge variant={val === 'Comum' ? 'success' : val === 'Rara' ? 'warning' : 'info'}>{val}</StatusBadge>
    },
    {
      key: 'ativo',
      label: 'Status',
      render: (val) => <StatusBadge variant={val ? 'success' : 'neutral'}>{val ? 'Ativo' : 'Inativo'}</StatusBadge>
    },
    {
      key: 'createdAt',
      label: 'Criação',
      render: (val) => val?.toDate ? val.toDate().toLocaleDateString('pt-BR') : '-'
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
    <div className={styles.container}>
      <DataGrid
        columns={columns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={onPageChange}
        emptyMessage="Nenhum idioma encontrado."
      />
    </div>
  );
};

export default IdiomaList;
