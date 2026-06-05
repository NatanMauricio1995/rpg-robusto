"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar, ContentContainer, SectionTitle } from '../../components';
import CharacterGrid from '../../components/personagens/CharacterGrid';
import { useCharacters } from '../../hooks/useCharacters';
import { Character } from '../../models/Character';

export default function CharacterListPage() {
  const router = useRouter();
  const { listMyCharacters, loading } = useCharacters();
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    const data = await listMyCharacters();
    setCharacters(data);
  };

  const handleSearch = (term: string) => {
    // Filter logic can be implemented here or via hook
    console.log("Searching for:", term);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="personagens" />
        <ContentContainer>
          <SectionTitle 
            title="Meus Personagens" 
            subtitle="Gerencie seus heróis e acompanhe sua evolução." 
          />
          
          <CharacterGrid
            characters={characters}
            loading={loading}
            onView={(id) => router.push(`/personagens/${id}`)}
            onEdit={(id) => router.push(`/personagens/editar/${id}`)}
            onDelete={(id) => console.log("Delete character", id)}
            onNew={() => router.push('/personagens/novo')}
            onSearch={handleSearch}
          />
        </ContentContainer>
      </div>
    </div>
  );
}
