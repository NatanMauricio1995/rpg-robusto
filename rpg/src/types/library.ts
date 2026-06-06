import { BaseEntity } from "./common";

export type ItemRarity = 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';

export interface Language extends BaseEntity {
  script: string;
}

export interface SpellSchool extends BaseEntity {}

export interface Race extends BaseEntity {
  traits: string[];
}

export interface SubRace extends BaseEntity {
  parentRaceId: string;
}

export interface Class extends BaseEntity {
  hitDie: string;
}

export interface SubClass extends BaseEntity {
  parentClassId: string;
}

export interface Ability extends BaseEntity {
  sourceType: 'Race' | 'Class' | 'Feat';
  sourceId: string;
}

export interface Spell extends BaseEntity {
  level: number;
  schoolId: string;
  castingTime: string;
  range: string;
  duration: string;
  components: string;
}

export interface Weapon extends BaseEntity {
  type: string;
  damage: string;
  properties: string[];
  rarity: ItemRarity;
  cost: string;
}

export interface Armor extends BaseEntity {
  type: string;
  ac: string;
  stealthDisadvantage: boolean;
  rarity: ItemRarity;
  cost: string;
}

export interface Item extends BaseEntity {
  type: string;
  rarity: ItemRarity;
  cost: string;
  weight: string;
}

export interface Enchantment extends BaseEntity {
  rarity: ItemRarity;
}

export interface Recipe extends BaseEntity {
  ingredients: string[];
  resultItemId: string;
}

export interface NPC extends BaseEntity {
  raceId: string;
  classId?: string;
  alignment: string;
}

export interface Enemy extends BaseEntity {
  type: string;
  challengeRating: string;
  alignment: string;
  size: string;
}

export type LibraryCategory = 
  | 'Idiomas' | 'Escolas de Magia' | 'Raças' | 'Sub-Raças' 
  | 'Classes' | 'Subclasses' | 'Habilidades' | 'Magias' 
  | 'Armas' | 'Armaduras' | 'Itens' | 'Encantamentos' 
  | 'Receitas' | 'NPCs' | 'Inimigos';
