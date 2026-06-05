"use client";

import React, { useState } from 'react';
import { Character } from '../../models/Character';
import TextBox from '../ui/TextBox';
import Select from '../ui/Select';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';

interface Option {
  label: string;
  value: string;
}

interface CharacterFormData {
  nome: string;
  racaId: string;
  subRacaId?: string;
  classeId: string;
  subclasseId?: string;
  historia: string;
}

interface CharacterFormProps {
  initialData?: Partial<Character>;
  races: Option[];
  subRaces: Option[];
  classes: Option[];
  subclasses: Option[];
  loading?: boolean;
  onSubmit: (data: CharacterFormData) => void;
  onCancel?: () => void;
}

export const CharacterForm: React.FC<CharacterFormProps> = ({
  initialData,
  races,
  subRaces,
  classes,
  subclasses,
  loading,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<CharacterFormData>({
    nome: initialData?.nome || '',
    racaId: initialData?.racaId || '',
    subRacaId: initialData?.subRacaId || '',
    classeId: initialData?.classeId || '',
    subclasseId: initialData?.subclasseId || '',
    historia: (initialData as any)?.historia || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-surface p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextBox
          label="Nome do Personagem"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
          placeholder="Ex: Aragorn"
        />
        
        <Select
          label="Raça"
          name="racaId"
          value={formData.racaId}
          options={races}
          onChange={handleChange}
          required
          placeholder="Selecione uma raça"
        />

        <Select
          label="Sub-Raça"
          name="subRacaId"
          value={formData.subRacaId}
          options={subRaces}
          onChange={handleChange}
          placeholder="Selecione uma sub-raça (opcional)"
        />

        <Select
          label="Classe"
          name="classeId"
          value={formData.classeId}
          options={classes}
          onChange={handleChange}
          required
          placeholder="Selecione uma classe"
        />

        <Select
          label="Subclasse"
          name="subclasseId"
          value={formData.subclasseId}
          options={subclasses}
          onChange={handleChange}
          placeholder="Selecione uma subclasse (opcional)"
        />
      </div>

      <TextArea
        label="História / Background"
        name="historia"
        value={formData.historia}
        onChange={handleChange}
        placeholder="Conte a origem do seu herói..."
      />

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button variant="ghost" type="button" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button variant="primary" type="submit" loading={loading}>
          Salvar Personagem
        </Button>
      </div>
    </form>
  );
};

export default CharacterForm;
