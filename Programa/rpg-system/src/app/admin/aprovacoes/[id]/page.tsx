"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header, Sidebar, ContentContainer, SectionTitle } from '../../../../components';
import { useCharacters } from '../../../../hooks/useCharacters';
import { Character } from '../../../../models/Character';
import CharacterApprovalPanel from '../../../../components/personagens/CharacterApprovalPanel';

export default function AdminCharacterApprovalPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getCharacter, approveCharacter, loading } = useCharacters();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (id) loadCharacter();
  }, [id]);

  const loadCharacter = async () => {
    const data = await getCharacter(id as string);
    setCharacter(data);
  };

  const handleApprove = async () => {
    if (!id) return;
    try {
      await approveCharacter(id as string);
      router.push('/admin/aprovacoes?success=approved');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async () => {
    // Logic for rejection (could involve a modal for reason)
    console.log("Rejected character", id);
  };

  if (loading && !character) return <div>Carregando...</div>;
  if (!character) return <div>Personagem não encontrado.</div>;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle 
            title="Aprovação de Personagem" 
            subtitle="Revise os dados antes de permitir a entrada na campanha." 
          />
          
          <div className="mt-8">
            <CharacterApprovalPanel
              character={character}
              onApprove={handleApprove}
              onReject={handleReject}
              loading={loading}
            />
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
