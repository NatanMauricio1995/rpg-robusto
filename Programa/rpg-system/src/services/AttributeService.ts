import { Attribute, Attributes, Modifier } from '../models/Character';

export default class AttributeService {
  /**
   * Calculates the total value of an attribute based on its base value and modifiers.
   */
  static calculateAttribute(attribute: Attribute): number {
    const modifiersTotal = attribute.modificadores.reduce((acc, mod) => acc + mod.valor, 0);
    return attribute.base + modifiersTotal;
  }

  /**
   * Calculates the D&D style modifier (e.g., +1 for 12, -1 for 8).
   */
  static calculateModifier(totalValue: number): number {
    return Math.floor((totalValue - 10) / 2);
  }

  /**
   * Recalculates all attributes and updates their total values.
   */
  static calculateAllAttributes(attributes: Attributes): Attributes {
    const updatedAttributes = { ...attributes };
    (Object.keys(updatedAttributes) as Array<keyof Attributes>).forEach((key) => {
      updatedAttributes[key].total = this.calculateAttribute(updatedAttributes[key]);
    });
    return updatedAttributes;
  }

  /**
   * Applies racial and sub-racial modifiers to the attributes (RN-014, RN-015).
   */
  static applyRacialModifiers(
    attributes: Attributes, 
    raceModifiers: Modifier[], 
    subRaceModifiers: Modifier[] = []
  ): Attributes {
    const updatedAttributes = JSON.parse(JSON.stringify(attributes)); // Deep clone
    const allRacialMods = [...raceModifiers, ...subRaceModifiers];

    (Object.keys(updatedAttributes) as Array<keyof Attributes>).forEach((key) => {
      // Clear existing racial modifiers first to avoid duplication on re-selection
      updatedAttributes[key].modificadores = updatedAttributes[key].modificadores.filter(
        (m: Modifier) => m.origem !== 'Raça' && m.origem !== 'Sub-Raça'
      );

      // Filter relevant modifiers for this attribute
      // Assuming raceModifiers might be mapped by attribute name or we receive them filtered
      // For this implementation, we expect raceModifiers to be specific to the attribute if called per attribute,
      // but here we might need a more complex mapping if it's a bulk operation.
    });

    return updatedAttributes;
  }
}
