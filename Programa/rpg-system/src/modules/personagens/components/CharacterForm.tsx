'use client';

import React from 'react';

interface CharacterFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  isReadOnly?: boolean;
}

export function CharacterForm({ initialData, onSubmit, isReadOnly }: CharacterFormProps) {
  const [formData, setFormData] = React.useState(initialData || {
    nome: '',
    raca: '',
    subRaca: '',
    classe: '',
    subclasse: '',
    historia: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg border border-slate-200 shadow-sm max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Nome do Personagem</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            disabled={isReadOnly}
            className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Valerius o Bravo"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Raça</label>
          <input
            type="text"
            name="raca"
            value={formData.raca}
            onChange={handleChange}
            disabled={isReadOnly}
            className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Humano"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Sub-Raça</label>
          <input
            type="text"
            name="subRaca"
            value={formData.subRaca}
            onChange={handleChange}
            disabled={isReadOnly}
            className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Opcional"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Classe</label>
          <input
            type="text"
            name="classe"
            value={formData.classe}
            onChange={handleChange}
            disabled={isReadOnly}
            className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Guerreiro"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Subclasse</label>
          <input
            type="text"
            name="subclasse"
            value={formData.subclasse}
            onChange={handleChange}
            disabled={isReadOnly}
            className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Ex: Mestre de Batalha"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-slate-700">História / Antecedentes</label>
        <textarea
          name="historia"
          value={formData.historia}
          onChange={handleChange}
          disabled={isReadOnly}
          rows={5}
          className="border border-slate-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
          placeholder="Conte a história do seu personagem..."
        />
      </div>

      {!isReadOnly && (
        <div className="flex justify-end gap-4 border-t pt-6">
          <button type="button" className="px-6 py-2 text-slate-600 hover:text-slate-800 font-medium">Cancelar</button>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">Salvar Personagem</button>
        </div>
      )}
    </form>
  );
}
