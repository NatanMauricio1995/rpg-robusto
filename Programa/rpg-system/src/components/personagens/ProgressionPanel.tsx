"use client";

import React from 'react';
import { Character } from '../../models/Character';

interface ProgressionPanelProps {
  character: Character;
}

export const ProgressionPanel: React.FC<ProgressionPanelProps> = ({ character }) => {
  // Simplified XP calculation for UI display (next level info)
  const getNextLevelXP = (level: number) => {
    const xpTable: Record<number, number> = {
      1: 300, 2: 900, 3: 2700, 4: 6500, 5: 14000, 
      6: 23000, 7: 34000, 8: 48000, 9: 64000, 10: 85000
    };
    return xpTable[level] || level * 15000;
  };

  const nextXP = getNextLevelXP(character.nivel);
  const xpProgress = Math.min((character.xp / nextXP) * 100, 100);

  return (
    <div className="bg-surface p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-6 text-primary">Vida & Progressão</h3>
      
      <div className="space-y-6">
        {/* Vida (HP) */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Pontos de Vida</span>
            <span className="font-bold text-red-600">{character.vidaAtual} / {character.vidaMax}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-red-600 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${(character.vidaAtual / character.vidaMax) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Experiência (XP) */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Nível {character.nivel}</span>
            <span className="text-sm text-muted-foreground">XP: {character.xp} / {nextXP}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
              style={{ width: `${xpProgress}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-right mt-1 text-muted-foreground">
            {nextXP - character.xp} XP restantes para o Nível {character.nivel + 1}
          </p>
        </div>

        {/* Recursos Adicionais (Mana se houver) */}
        {character.manaMax && (
          <div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Mana</span>
              <span className="font-bold text-blue-700">{character.manaAtual} / {character.manaMax}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-blue-700 h-4 rounded-full transition-all duration-500" 
                style={{ width: `${(character.manaAtual! / character.manaMax) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressionPanel;
