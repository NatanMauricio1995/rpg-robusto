import React from 'react';
import Link from 'next/link';
import { Sidebar } from '@/shared/components/Sidebar';

const modules = [
  { title: 'Personagens', description: 'Gerencie seus heróis e NPCs.', href: '/personagens', active: true },
  { title: 'Campanhas', description: 'Crie e acompanhe suas jornadas.', href: '/em-construcao', active: false },
  { title: 'Biblioteca RPG', description: 'Regras, itens e magias.', href: '/em-construcao', active: false },
  { title: 'Combates', description: 'Gerenciador de encontros e iniciativa.', href: '/em-construcao', active: false },
  { title: 'Mundo', description: 'Geografia e história do cenário.', href: '/em-construcao', active: false },
  { title: 'Relatórios', description: 'Estatísticas e logs de jogo.', href: '/em-construcao', active: false },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">Painel Geral</h1>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 text-sm">Bem-vindo, Mestre</span>
          </div>
        </header>

        <main className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((mod) => (
              <Link
                key={mod.title}
                href={mod.href}
                className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col gap-2"
              >
                <h3 className="text-lg font-semibold text-slate-900">{mod.title}</h3>
                <p className="text-slate-600 text-sm">{mod.description}</p>
                {!mod.active && (
                  <span className="text-[10px] uppercase font-bold text-amber-600 bg-amber-50 self-start px-2 py-0.5 rounded">
                    Em Construção
                  </span>
                )}
              </Link>
            ))}
          </div>
        </main>

        <footer className="mt-auto p-8 border-t bg-white text-center text-slate-400 text-xs">
          RPG Robusto System © 2026 - Sprint de Reconstrução
        </footer>
      </div>
    </div>
  );
}
