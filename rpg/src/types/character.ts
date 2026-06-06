import { BaseEntity } from "./common";

export type CharacterStatus = 'Pendente' | 'Aprovado' | 'Reprovado' | 'Morto' | 'Arquivado';

export interface Character extends BaseEntity {
  race: string;
  class: string;
  level: number;
  campaignId?: string;
  campaignName?: string;
  userId: string;
  userName: string;
  status: CharacterStatus;
  avatarUrl?: string;
}

export interface CharacterFilters {
  search: string;
  status: CharacterStatus | 'Todos';
  class: string | 'Todas';
}
