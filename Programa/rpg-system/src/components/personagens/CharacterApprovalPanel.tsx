"use client";

import React from 'react';
import { Character } from '../../models/Character';
import Button from '../ui/Button';
import { Check, X } from 'lucide-react';

interface CharacterApprovalPanelProps {
  character: Character;
  onApprove: () => void;
  onReject: () => void;
  loading?: boolean;
}

export const CharacterApprovalPanel: React.FC<CharacterApprovalPanelProps> = ({
  character,
  onApprove,
  onReject,
  loading
}) => {
  return (
    <div className="bg-surface p-6 rounded-lg shadow-md border-l-4 border-primary">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-primary">{character.nome}</h3>
          <p className="text-sm text-muted-foreground italic">
            Status Atual: <span className="font-semibold">{character.status}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="primary" 
            icon={Check} 
            onClick={onApprove} 
            loading={loading}
            className="bg-green-600 hover:bg-green-700 border-none"
          >
            Aprovar
          </Button>
          <Button 
            variant="ghost" 
            icon={X} 
            onClick={onReject} 
            loading={loading}
            className="text-red-600 hover:bg-red-50"
          >
            Reprovar
          </Button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">História do Personagem:</h4>
        <p className="text-gray-700 bg-background p-4 rounded border border-border whitespace-pre-wrap">
          {(character as any).historia || 'Nenhuma história fornecida.'}
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
        <div className="p-2 bg-background rounded">
          <span className="block text-muted-foreground">Raça</span>
          <span className="font-bold">{character.racaId}</span>
        </div>
        <div className="p-2 bg-background rounded">
          <span className="block text-muted-foreground">Classe</span>
          <span className="font-bold">{character.classeId}</span>
        </div>
        <div className="p-2 bg-background rounded">
          <span className="block text-muted-foreground">Nível</span>
          <span className="font-bold">{character.nivel}</span>
        </div>
        <div className="p-2 bg-background rounded">
          <span className="block text-muted-foreground">XP</span>
          <span className="font-bold">{character.xp}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterApprovalPanel;
