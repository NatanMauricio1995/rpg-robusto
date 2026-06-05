"use client";

import React from 'react';
import { Character } from '../../models/Character';
import { DataGrid, CrudToolbar } from '../../components';
import { Eye, Edit, Trash2 } from 'lucide-react';
import Button from '../ui/Button';

interface CharacterGridProps {
  characters: Character[];
  loading?: boolean;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
  onSearch: (term: string) => void;
}

export const CharacterGrid: React.FC<CharacterGridProps> = ({
  characters,
  loading,
  onView,
  onEdit,
  onDelete,
  onNew,
  onSearch
}) => {
  const columns = [
    { key: 'nome', label: 'Nome', sortable: true },
    { key: 'racaId', label: 'Raça', sortable: true },
    { key: 'classeId', label: 'Classe', sortable: true },
    { 
      key: 'status', 
      label: 'Status', 
      sortable: true,
      render: (val: string) => (
        <span className={`status-badge status-${val.toLowerCase()}`}>
          {val}
        </span>
      )
    },
    { key: 'nivel', label: 'Nível', sortable: true },
    { 
      key: 'updatedAt', 
      label: 'Última Atualização',
      render: (val: any) => val?.seconds ? new Date(val.seconds * 1000).toLocaleDateString() : 'N/A'
    },
    {
      key: 'actions',
      label: 'Ações',
      render: (_: any, row: Character) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => onView(row.id!)}>
            <Eye size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row.id!)}>
            <Edit size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(row.id!)}>
            <Trash2 size={16} />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <CrudToolbar 
        onNew={onNew} 
        onSearch={onSearch} 
        newLabel="Novo Personagem" 
      />
      <DataGrid 
        columns={columns} 
        data={characters} 
        loading={loading} 
        emptyMessage="Nenhum personagem encontrado."
      />
    </div>
  );
};

export default CharacterGrid;
