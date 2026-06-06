export type ItemRarity = 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
export type LibraryTab = 'Itens' | 'Magias' | 'Bestiário';

export interface LibraryItem {
  id: string;
  name: string;
  type: string;
  rarity: ItemRarity;
  description: string;
  cost?: string;
  weight?: string;
}

export interface Spell {
  id: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  duration: string;
  description: string;
}

export interface Creature {
  id: string;
  name: string;
  type: string;
  challengeRating: string;
  alignment: string;
  size: string;
  description: string;
}

export interface LibraryFilters {
  search: string;
  tab: LibraryTab;
}
