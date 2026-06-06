import { BaseEntity } from "./common";

export type ReportCategory = 'Campanhas' | 'Personagens' | 'Combates' | 'Inimigos';

export interface CampaignReport extends BaseEntity {
  system: string;
  totalSessions: number;
  totalXP: number;
  totalLootGold: number;
  completionRate: number;
}

export interface CharacterReport extends BaseEntity {
  playerName: string;
  level: number;
  sessionsPlayed: number;
  totalDamageDealt: number;
  totalHealingDone: number;
}

export interface CombatReport extends BaseEntity {
  campaignName: string;
  location: string;
  totalRounds: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Mortal';
}

export interface EnemyReport extends BaseEntity {
  type: string;
  challengeRating: string;
  timesEncountered: number;
  lethalityRate: number; // Porcentagem de vezes que causou queda de jogador
}

export interface ReportFilters {
  search: string;
  startDate?: string;
  endDate?: string;
  campaignId?: string;
}
