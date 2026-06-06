export type EntityStatus = 'Ativo' | 'Inativo' | 'Rascunho';

export interface BaseEntity {
  id: string;
  name: string;
  status: EntityStatus;
  createdAt: string;
  updatedAt: string;
  description?: string;
}
