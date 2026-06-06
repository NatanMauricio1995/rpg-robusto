export type CharacterStatus = 'Ativo' | 'Inativo' | 'Morto' | 'Arquivado';

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  campaign: string;
  status: CharacterStatus;
  avatarUrl?: string;
  lastUpdated: string;
}

export interface CharacterFilters {
  search: string;
  status: CharacterStatus | 'Todos';
  class: string | 'Todas';
}
