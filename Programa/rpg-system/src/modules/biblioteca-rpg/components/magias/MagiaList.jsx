import React, { useState, useEffect } from 'react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import EscolaMagiaService from '../../../../services/EscolaMagiaService';

const MagiaList = ({ data, loading, onEdit, onDelete }) => {
  const [escolas, setEscolas] = useState({});
  useEffect(() => {
    EscolaMagiaService.getAll().then(list => {
      const map = {};
      list.forEach(e => map[e.id] = e.nome);
      setEscolas(map);
    });
  }, []);

  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'escolaId', label: 'Escola', render: (val) => escolas[val] || '...' },
    { key: 'nivel', label: 'Nível', render: (val) => val === 0 ? 'Truque' : val },
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
export default MagiaList;
