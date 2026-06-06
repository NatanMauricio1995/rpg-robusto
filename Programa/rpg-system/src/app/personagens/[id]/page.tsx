'use client';

import React from 'react';
import { Sidebar } from '@/shared/components/Sidebar';
import { CharacterForm } from '@/modules/personagens/components/CharacterForm';
import Link from 'next/link';

export default function CharacterDetailPage({ params }: { params: { id: string } }) {
  const isNew = params.id === 'novo';
  
  const mockInitialData = !isNew ? {
    nome: 'Valerius',
    raca: 'Humano',
    subRaca: 'Standard',
    classe: 'Guerreiro',
    subclasse: 'Campeão',
    historia: 'Um herói em busca de redenção.'
  } : undefined;

  const handleSubmit = (data: any) => {
    console.log('Dados submetidos:', data);
    // Integração futura com CharacterService
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <Link href="/personagens" className="text-slate-400 hover:text-slate-600">
            ← Voltar
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">
            {isNew ? 'Novo Personagem' : `Editando: ${mockInitialData?.nome}`}
          </h1>
        </header>

        <main className="p-8 flex justify-center">
          <CharacterForm 
            initialData={mockInitialData} 
            onSubmit={handleSubmit} 
          />
        </main>
      </div>
    </div>
  );
}
