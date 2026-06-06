'use client';

import React from 'react';
import Link from 'next/link';

interface Character {
  id: string;
  nome: string;
  raca: string;
  classe: string;
  status: string;
  nivel: number;
  updatedAt: string;
}

interface CharacterGridProps {
  characters: Character[];
  onDelete: (id: string) => void;
}

export function CharacterGrid({ characters, onDelete }: CharacterGridProps) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nome</th>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Raça</th>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Classe</th>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Status</th>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase">Nível</th>
            <th className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {characters.map((char) => (
            <tr key={char.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">{char.nome}</td>
              <td className="px-6 py-4 text-slate-600 text-sm">{char.raca}</td>
              <td className="px-6 py-4 text-slate-600 text-sm">{char.classe}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  char.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {char.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-600 text-sm font-mono">{char.nivel}</td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Link
                  href={`/personagens/${char.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Ver/Editar
                </Link>
                <button
                  onClick={() => onDelete(char.id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
          {characters.length === 0 && (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                Nenhum personagem encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
