export type CombatantType = 'Player' | 'NPC' | 'Boss';
export type CombatStatus = 'Atordoado' | 'Envenenado' | 'Caído' | 'Invisível' | 'Paralisado';

export interface Combatant {
  id: string;
  name: string;
  type: CombatantType;
  hp: {
    current: number;
    max: number;
  };
  ac: number;
  initiative: number;
  conditions: CombatStatus[];
}

export interface CombatState {
  combatants: Combatant[];
  currentTurnIndex: number;
  round: number;
  isActive: boolean;
}
