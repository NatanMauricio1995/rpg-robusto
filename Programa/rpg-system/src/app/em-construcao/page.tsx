import React from 'react';
import Link from 'next/link';

export default function ConstructionPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-slate-800 p-12 rounded-2xl border border-slate-700 shadow-2xl max-w-lg flex flex-col gap-6">
        <div className="text-6xl animate-bounce">🚧</div>
        <h1 className="text-3xl font-bold text-white">Masmorra em Escavação</h1>
        <p className="text-slate-400">
          Este módulo ainda está sendo forjado pelos anões da montanha. 
          Por favor, retorne mais tarde quando as runas estiverem completas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link 
            href="/" 
            className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg hover:bg-slate-600 transition-colors"
          >
            Início
          </Link>
          <Link 
            href="/personagens" 
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Personagens
          </Link>
        </div>
      </div>
    </div>
  );
}
