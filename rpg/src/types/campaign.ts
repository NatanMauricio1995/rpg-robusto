import { BaseEntity } from "./common";

export type CampaignStatus = 'Recrutando' | 'Ativa' | 'Pausada' | 'Finalizada';
export type InvitationStatus = 'Pendente' | 'Aceito' | 'Recusado';

export interface Campaign extends BaseEntity {
  system: string;
  worldId: string;
  worldName: string;
  dmId: string;
  dmName: string;
  maxPlayers: number;
  playerCount: number;
  status: CampaignStatus;
}

export interface Participant extends BaseEntity {
  campaignId: string;
  userId: string;
  userName: string;
  role: 'Mestre' | 'Jogador';
  characterId?: string;
}

export interface Invitation extends BaseEntity {
  campaignId: string;
  senderId: string;
  receiverId: string;
  receiverEmail: string;
  status: InvitationStatus;
}

export interface Session extends BaseEntity {
  campaignId: string;
  number: number;
  date: string;
  notes?: string;
  summary?: string;
}

export interface Quest extends BaseEntity {
  campaignId: string;
  isCompleted: boolean;
  reward?: string;
}

export interface Chapter extends BaseEntity {
  campaignId: string;
  order: number;
}

export interface CampaignFilters {
  search: string;
  status: CampaignStatus | 'Todas';
}
