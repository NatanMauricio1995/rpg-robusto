import { BaseEntity } from "./common";

export type ItemRarity = 'Comum' | 'Incomum' | 'Raro' | 'Muito Raro' | 'Lendário';

export interface Language extends BaseEntity {
  script: string;
}

export interface SpellSchool extends BaseEntity {}

// Detalhamento de Raça
export interface RaceAttributeBonus {
  attribute: 'FOR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';
  bonus: number;
}

export interface Race extends BaseEntity {
  attributeBonuses: RaceAttributeBonus[];
  speed: number;
  size: 'Pequeno' | 'Médio' | 'Grande';
  languages: string[];
  proficiencies: string[];
  traits: { name: string; description: string }[];
}

export interface SubRace extends BaseEntity {
  parentRaceId: string;
  attributeBonuses: RaceAttributeBonus[];
  traits: { name: string; description: string }[];
}

// Detalhamento de Classe
export interface ClassProgressionRow {
  level: number;
  proficiencyBonus: number;
  features: string[];
  spellsKnown?: number;
  spellSlots?: number[]; // [1st, 2nd, 3rd...]
}

export interface Class extends BaseEntity {
  hitDie: string;
  primaryAbility: string[];
  saves: string[];
  skillChoices: {
    count: number;
    options: string[];
  };
  armorProficiencies: string[];
  weaponProficiencies: string[];
  progression: ClassProgressionRow[];
}

export interface SubClass extends BaseEntity {
  parentClassId: string;
  features: { level: number; name: string; description: string }[];
}

// Outras entidades (mantidas conforme auditoria anterior)
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

export interface Enemy extends BaseEntity {
  type: string;
  challengeRating: string;
  alignment: string;
  size: string;
}

export type LibraryCategory = 
  | 'Idiomas' | 'Escolas de Magia' | 'Sentidos' | 'Perícias' | 'Raças' | 'Sub-Raças' 
  | 'Classes' | 'Subclasses' | 'Habilidades' | 'Magias' 
  | 'Armas' | 'Armaduras' | 'Itens' | 'Encantamentos' 
  | 'Receitas' | 'NPCs' | 'Inimigos';
ses' | 'Habilidades' | 'Magias' 
  | 'Armas' | 'Armaduras' | 'Itens' | 'Encantamentos' 
  | 'Receitas' | 'NPCs' | 'Inimigos';
