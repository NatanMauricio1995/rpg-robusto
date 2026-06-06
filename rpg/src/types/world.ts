import { BaseEntity } from "./common";

export interface World extends BaseEntity {
  system: string;
  imageUrl?: string;
}

export interface Continent extends BaseEntity {
  worldId: string;
}

export interface Kingdom extends BaseEntity {
  continentId: string;
}

export interface City extends BaseEntity {
  kingdomId: string;
}

export interface Environment extends BaseEntity {
  cityId: string;
}

export interface Location extends BaseEntity {
  environmentId: string;
}

export interface Religion extends BaseEntity {
  worldId: string;
  alignment?: string;
  deity?: string;
}

export interface Faction extends BaseEntity {
  worldId: string;
  leader?: string;
}

export interface Organization extends BaseEntity {
  worldId: string;
  type: string;
}
