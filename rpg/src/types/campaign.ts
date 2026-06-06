export type CampaignStatus = 'Ativa' | 'Pausada' | 'Finalizada' | 'Recrutando';

export interface Campaign {
  id: string;
  name: string;
  system: string;
  world: string;
  dm: string;
  playerCount: number;
  maxPlayers: number;
  status: CampaignStatus;
  nextSession: string | null;
  frequency: string;
  description: string;
  imageUrl?: string;
}

export interface Session {
  id: string;
  campaignId: string;
  number: number;
  title: string;
  date: string;
  notes?: string;
}

export interface CampaignFilters {
  search: string;
  status: CampaignStatus | 'Todas';
}
