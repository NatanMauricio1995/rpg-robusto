"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Sidebar, ContentContainer, SectionTitle } from '../../../components';
import { useCharacters } from '../../../hooks/useCharacters';
import { Character } from '../../../models/Character';
import AttributePanel from '../../../components/personagens/AttributePanel';
import ProgressionPanel from '../../../components/personagens/ProgressionPanel';
import Button from '../../../components/ui/Button';
import { Edit, ChevronLeft } from 'lucide-react';

export default function CharacterDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getCharacter, loading } = useCharacters();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (id) loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    const data = await getCharacter(id as string);
    setCharacter(data);
  };

  if (loading && !character) return <div>Carregando...</div>;
  if (!character) return <div>Personagem não encontrado.</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="personagens" />
        <ContentContainer>
          <div className="mb-4">
            <Button variant="ghost" icon={ChevronLeft} onClick={() => router.back()}>
              Voltar
            </Button>
          </div>

          <div className="flex justify-between items-center mb-6">
            <SectionTitle 
              title={character.nome} 
              subtitle={`${character.racaId} ${character.classeId} - Nível ${character.nivel}`} 
            />
            <Button variant="primary" icon={Edit} onClick={() => router.push(`/personagens/editar/${id}`)}>
              Editar Ficha
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AttributePanel attributes={character.atributos} />
              <div className="bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4 text-primary">História</h3>
                <p className="whitespace-pre-wrap">{(character as any).historia || 'Sem história registrada.'}</p>
              </div>
            </div>
            <div>
              <ProgressionPanel character={character} />
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
