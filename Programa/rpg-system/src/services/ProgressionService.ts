import { Character } from '../models/Character';

export default class ProgressionService {
  private static XP_TABLE: Record<number, number> = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 100000,
    13: 120000,
    14: 140000,
    15: 165000,
    16: 195000,
    17: 225000,
    18: 265000,
    19: 305000,
    20: 355000,
  };

  /**
   * Calculates the level based on XP (RN-016).
   */
  static calculateLevel(xp: number): number {
    let level = 1;
    for (let l = 1; l <= 20; l++) {
      if (xp >= this.XP_TABLE[l]) {
        level = l;
      } else {
        break;
      }
    }
    return Math.min(level, 20); // RN-018: Cap at 20
  }

  /**
   * Applies level up logic: updates level, restores resources, and checks for unlocks (RN-016).
   */
  static applyLevelUp(character: Character): Character {
    const newLevel = this.calculateLevel(character.xp);
    
    if (newLevel > character.nivel) {
      const updatedCharacter = { ...character, nivel: newLevel };
      
      // Restore Resources (HP/Mana)
      updatedCharacter.vidaAtual = updatedCharacter.vidaMax;
      if (updatedCharacter.manaMax) {
        updatedCharacter.manaAtual = updatedCharacter.manaMax;
      }

      return updatedCharacter;
    }

    return character;
  }

  /**
   * Checks if a subclass can be unlocked (RN-017).
   * Usually subclasses unlock at level 3.
   */
  static canUnlockSubclass(level: number, requiredLevel: number = 3): boolean {
    return level >= requiredLevel;
  }

  /**
   * Simple resource restoration.
   */
  static restoreResources(character: Character): Character {
    return {
      ...character,
      vidaAtual: character.vidaMax,
      manaAtual: character.manaMax
    };
  }
}
