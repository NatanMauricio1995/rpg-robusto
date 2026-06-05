"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar, ContentContainer, SectionTitle } from '../../../components';
import CharacterForm from '../../../components/personagens/CharacterForm';
import { useCharacters } from '../../../hooks/useCharacters';

export default function NewCharacterPage() {
  const router = useRouter();
  const { createCharacter, loading } = useCharacters();

  // Mocked options for prototype (should come from services in a real scenario)
  const races = [
    { label: 'Humano', value: 'humano' },
    { label: 'Elfo', value: 'elfo' },
    { label: 'Anão', value: 'anao' }
  ];
  const classes = [
    { label: 'Guerreiro', value: 'guerreiro' },
    { label: 'Mago', value: 'mago' },
    { label: 'Ladino', value: 'ladino' }
  ];

  const handleSubmit = async (data: any) => {
    try {
      // Default initial attributes for creation
      const initialAttributes = {
        forca: { base: 10, modificadores: [], total: 10 },
        destreza: { base: 10, modificadores: [], total: 10 },
        constituicao: { base: 10, modificadores: [], total: 10 },
        inteligencia: { base: 10, modificadores: [], total: 10 },
        sabedoria: { base: 10, modificadores: [], total: 10 },
        carisma: { base: 10, modificadores: [], total: 10 }
      };

      await createCharacter({
        ...data,
        nivel: 1,
        xp: 0,
        ouro: 0,
        vidaAtual: 10,
        vidaMax: 10,
        atributos: initialAttributes
      });
      router.push('/personagens?success=created');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="personagens" />
        <ContentContainer>
          <SectionTitle 
            title="Criar Novo Herói" 
            subtitle="Dê os primeiros passos em sua jornada." 
          />
          
          <CharacterForm
            races={races}
            subRaces={[]}
            classes={classes}
            subclasses={[]}
            loading={loading}
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </ContentContainer>
      </div>
    </div>
  );
}
