import { BaseEntity } from "./common";

export type CharacterStatus = 'Pendente' | 'Aprovado' | 'Reprovado' | 'Morto' | 'Arquivado';

export interface Attributes {
  for: number; dex: number; con: number;
  int: number; wis: number; cha: number;
}

export interface Resources {
  hp: { current: number; max: number; temp: number };
  mana: { current: number; max: number };
  exp: { current: number; next: number };
}

export interface InventoryItem {
  id: string;
  libraryId: string;
  name: string;
  quantity: number;
  weight: number;
  rarity: 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';
  cost: string;
}

export interface CharacterSpell {
  id: string;
  libraryId: string;
  name: string;
  level: number;
  school: string;
  castingTime: string;
  range: string;
  isPrepared: boolean;
}

export interface Character extends BaseEntity {
  race: string;
  class: string;
  level: number;
  status: CharacterStatus;
  attributes: Attributes;
  resources: Resources;
  ca: number;
  campaignName?: string;
  userName: string;
  inventory: InventoryItem[];
  spells: CharacterSpell[];
}

export interface CharacterFilters {
  search: string;
  status: CharacterStatus | 'Todos';
  class: string | 'Todas';
}
