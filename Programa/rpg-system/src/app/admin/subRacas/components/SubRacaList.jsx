import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import RacaService from '../../racas/services/RacaService';
import styles from './SubRacaList.module.css';

const SubRacaList = ({ data, loading, onEdit, onDelete, onView }) => {
  const [racas, setRacas] = useState({});

  useEffect(() => {
    const loadRacas = async () => {
      const list = await RacaService.getAll();
      const map = {};
      list.forEach(r => map[r.id] = r.nome);
      setRacas(map);
    };
    loadRacas();
  }, []);

  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'racaId', label: 'Raça Pai', render: (val) => racas[val] || '...' },
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

  return <DataGrid columns={columns} data={data} loading={loading} emptyMessage="Nenhuma sub-raça encontrada." />;
};

export default SubRacaList;
