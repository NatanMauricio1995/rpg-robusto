'use client';

import React from 'react';
import { Sidebar } from '@/shared/components/Sidebar';
import { CharacterGrid } from '@/modules/personagens/components/CharacterGrid';
import Link from 'next/link';

// Mock data para evitar erros de importação até que o hook seja estabilizado
const mockCharacters = [
  { id: '1', nome: 'Valerius', raca: 'Humano', classe: 'Guerreiro', status: 'Ativo', nivel: 5, updatedAt: '2024-03-20' },
  { id: '2', nome: 'Elora', raca: 'Elfo', classe: 'Maga', status: 'Ativo', nivel: 7, updatedAt: '2024-03-19' },
];

export default function CharacterListPage() {
  const handleDelete = (id: string) => {
    console.log('Excluir personagem:', id);
    // Integração futura com CharacterService
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Personagens</h1>
          <Link
            href="/personagens/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <span>+ Novo Personagem</span>
          </Link>
        </header>

        <main className="p-8">
          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex gap-4">
              <input 
                type="text" 
                placeholder="Buscar personagem..." 
                className="flex-1 border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-slate-800 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors">Filtrar</button>
            </div>
            
            <CharacterGrid 
              characters={mockCharacters} 
              onDelete={handleDelete} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}
