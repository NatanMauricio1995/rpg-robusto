import React, { useState, useEffect } from 'react';
import { DataGrid, StatusBadge, Button } from '../../../../components';
import ClasseService from '../../../../services/ClasseService';

const SubclasseList = ({ data, loading, onEdit, onDelete }) => {
  const [classes, setClasses] = useState({});
  useEffect(() => {
    ClasseService.getAll().then(list => {
      const map = {};
      list.forEach(c => map[c.id] = c.nome);
      setClasses(map);
    });
  }, []);

  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'classeId', label: 'Classe', render: (val) => classes[val] || '...' },
    { key: 'nivelDesbloqueio', label: 'Nível' },
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
export default SubclasseList;
