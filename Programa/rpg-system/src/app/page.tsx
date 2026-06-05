"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Header, Sidebar, Footer, ContentContainer } from '../components';
import { MODULES } from '../constants/modules';
import { LayoutDashboard, Users, Map, Sword, BookOpen, BarChart } from 'lucide-react';

const iconMap: Record<string, any> = {
  'Personagens': Users,
  'Campanhas': Map,
  'Combates': Sword,
  'Mundo': BookOpen,
  'Biblioteca RPG': LayoutDashboard,
  'Relatórios': BarChart,
};

export default function HomePage() {
  const router = useRouter();

  const handleModuleClick = (module: typeof MODULES[0]) => {
    if (module.implemented) {
      router.push(module.route);
    } else {
      router.push('/em-construcao');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeModule="dashboard" />
        <ContentContainer>
          <div className="py-8 px-4 max-w-7xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">Bem-vindo ao RPG Robusto</h1>
              <p className="text-xl text-muted-foreground">Gerencie campanhas, personagens, mundos e combates.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULES.map((module) => {
                const Icon = iconMap[module.name] || LayoutDashboard;
                return (
                  <div 
                    key={module.name}
                    onClick={() => handleModuleClick(module)}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer group hover:shadow-lg ${
                      module.implemented 
                        ? 'bg-surface border-primary/20 hover:border-primary' 
                        : 'bg-muted/30 border-dashed border-gray-300 opacity-80'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-lg ${module.implemented ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-400'}`}>
                        <Icon size={28} />
                      </div>
                      <h2 className="text-xl font-bold">{module.name}</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">{module.description}</p>
                    {!module.implemented && (
                      <span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Em breve
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </ContentContainer>
      </div>
      <Footer />
    </div>
  );
}
