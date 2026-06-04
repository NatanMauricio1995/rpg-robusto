import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import styles from './EscolaMagiaList.module.css';

const EscolaMagiaList = ({ data, loading, onEdit, onDelete, onView }) => {
  const columns = [
    { 
      key: 'nome', 
      label: 'Nome', 
      sortable: true,
      render: (val, row) => (
        <div className={styles.nameCell}>
          <div className={styles.colorDot} style={{ backgroundColor: row.cor }} />
          {val}
        </div>
      )
    },
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
          <Button variant="ghost" size="sm" onClick={() => onView(row)}><Eye size={16} /></Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row)}><Edit size={16} /></Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row)}><Trash2 size={16} className={styles.deleteIcon} /></Button>
        </div>
      )
    }
  ];

  return <DataGrid columns={columns} data={data} loading={loading} emptyMessage="Nenhuma escola de magia encontrada." />;
};

export default EscolaMagiaList;
