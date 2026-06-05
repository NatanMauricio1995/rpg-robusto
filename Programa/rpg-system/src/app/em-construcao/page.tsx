"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar, Footer, ContentContainer } from '../../components';
import { Pickaxe, Torch, ShieldAlert, ChevronLeft, Users } from 'lucide-react';
import Button from '../../components/ui/Button';

export default function UnderConstructionPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="none" />
        <ContentContainer>
          <div className="flex flex-col items-center justify-center h-full text-center py-20 px-4">
            <div className="relative mb-8">
              <div className="bg-primary/10 p-10 rounded-full">
                <Pickaxe size={80} className="text-primary animate-bounce" />
              </div>
              <Torch size={32} className="absolute -top-2 -right-2 text-orange-500" />
              <ShieldAlert size={32} className="absolute -bottom-2 -left-2 text-yellow-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4 text-primary">⚒️ Estamos escavando esta masmorra...</h1>
            <p className="text-lg text-muted-foreground max-w-lg mb-10">
              Os aventureiros da guilda ainda estão explorando esta região. 
              Em breve novas funcionalidades estarão disponíveis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                icon={ChevronLeft} 
                onClick={() => router.push('/')}
              >
                Voltar para Home
              </Button>
              <Button 
                variant="ghost" 
                icon={Users} 
                onClick={() => router.push('/personagens')}
              >
                Meus Personagens
              </Button>
            </div>
          </div>
        </ContentContainer>
      </div>
      <Footer />
    </div>
  );
}
