import { useState, useMemo, useEffect } from 'react';
import { LibraryItem, Spell, Creature, LibraryTab } from '@/types/library';

const MOCK_ITEMS: LibraryItem[] = [
  { id: '1', name: 'Espada Longa +1', type: 'Arma', rarity: 'Incomum', description: 'Uma espada bem forjada que brilha levemente em combate.', cost: '500 po', weight: '3 lb' },
  { id: '2', name: 'Anel de Proteção', type: 'Anel', rarity: 'Raro', description: 'Garante +1 na CA e nos testes de resistência.', cost: '2000 po', weight: '-' },
  { id: '3', name: 'Poção de Cura', type: 'Consumível', rarity: 'Comum', description: 'Recupera 2d4+2 pontos de vida.', cost: '50 po', weight: '0.5 lb' }
];

const MOCK_SPELLS: Spell[] = [
  { id: '1', name: 'Bola de Fogo', level: 3, school: 'Evocação', castingTime: '1 ação', range: '150 pés', duration: 'Instantânea', description: 'Uma explosão de chamas atinge todos em um raio de 20 pés.' },
  { id: '2', name: 'Mísseis Mágicos', level: 1, school: 'Evocação', castingTime: '1 ação', range: '120 pés', duration: 'Instantânea', description: 'Três dardos de força atingem seus alvos infalivelmente.' }
];

const MOCK_CREATURES: Creature[] = [
  { id: '1', name: 'Lobo Atroz', type: 'Fera', challengeRating: '1', alignment: 'Neutro', size: 'Grande', description: 'Uma versão gigante e feroz de um lobo comum.' },
  { id: '2', name: 'Esqueleto', type: 'Morto-Vivo', challengeRating: '1/4', alignment: 'Leal e Mau', size: 'Médio', description: 'Ossos reanimados por magia negra.' }
];

export function useLibrary() {
  const [activeTab, setActiveTab] = useState<LibraryTab>('Itens');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const filteredData = useMemo(() => {
    const s = search.toLowerCase();
    if (activeTab === 'Itens') {
      return MOCK_ITEMS.filter(i => i.name.toLowerCase().includes(s));
    } else if (activeTab === 'Magias') {
      return MOCK_SPELLS.filter(s_ => s_.name.toLowerCase().includes(s));
    } else {
      return MOCK_CREATURES.filter(c => c.name.toLowerCase().includes(s));
    }
  }, [activeTab, search]);

  return { activeTab, setActiveTab, search, setSearch, loading, filteredData };
}
