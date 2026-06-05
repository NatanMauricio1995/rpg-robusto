export enum ApprovalStatus {
  PENDENTE = 'PENDENTE',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
}

export interface Modifier {
  origem: string;
  valor: number;
}

export interface Attribute {
  base: number;
  modificadores: Modifier[];
  total: number;
}

export interface Attributes {
  forca: Attribute;
  destreza: Attribute;
  constituicao: Attribute;
  inteligencia: Attribute;
  sabedoria: Attribute;
  carisma: Attribute;
}

export interface Character {
  id?: string;
  userId: string;
  nome: string;
  racaId: string;
  subRacaId?: string;
  classeId: string;
  subclasseId?: string;
  nivel: number;
  xp: number;
  atributos: Attributes;
  status: ApprovalStatus;
  vidaAtual: number;
  vidaMax: number;
  manaAtual?: number;
  manaMax?: number;
  ouro: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface CampaignSheet {
  id?: string;
  campanhaId: string;
  personagemId: string;
  userId: string;
  anotacoesMestre?: string;
  anotacoesJogador?: string;
  inventarioOverride?: any[]; // For campaign-specific items
  status: ApprovalStatus;
  createdAt?: any;
  updatedAt?: any;
}
