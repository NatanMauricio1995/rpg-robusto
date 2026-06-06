import { BaseEntity } from "./common";

export type CombatStatus = 'Ativo' | 'Encerrado' | 'Pausado';
export type CombatantType = 'Player' | 'NPC' | 'Boss';
export type ConditionEffect = 'Atordoado' | 'Envenenado' | 'Caído' | 'Invisível' | 'Paralisado';

export interface Combatant {
  id: string;
  externalId: string; // ID do Personagem ou Monstro
  name: string;
  type: CombatantType;
  hp: {
    current: number;
    max: number;
  };
  ac: number;
  initiative: number;
  conditions: ConditionEffect[];
}

export interface LootItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Combat extends BaseEntity {
  campaignId: string;
  campaignName: string;
  location: string;
  status: CombatStatus;
  round: number;
  currentTurnIndex: number;
  combatants: Combatant[];
  totalXP: number;
  loot: LootItem[];
}

export interface CombatFilters {
  search: string;
  status: CombatStatus | 'Todos';
}
