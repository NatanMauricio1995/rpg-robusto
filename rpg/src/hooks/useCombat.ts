import { useState, useCallback } from 'react';
import { Combatant, CombatState } from '@/types/combat';

const MOCK_COMBATANTS: Combatant[] = [
  { id: '1', name: 'Eldrin Valerius', type: 'Player', hp: { current: 45, max: 52 }, ac: 15, initiative: 22, conditions: [] },
  { id: '2', name: 'Lobo Atroz', type: 'NPC', hp: { current: 18, max: 18 }, ac: 13, initiative: 18, conditions: [] },
  { id: '3', name: 'Korg o Destruidor', type: 'Player', hp: { current: 12, max: 76 }, ac: 18, initiative: 14, conditions: ['Envenenado'] },
  { id: '4', name: 'Chefe Orc', type: 'Boss', hp: { current: 110, max: 110 }, ac: 16, initiative: 8, conditions: [] },
];

export function useCombat() {
  const [state, setState] = useState<CombatState>({
    combatants: MOCK_COMBATANTS.sort((a, b) => b.initiative - a.initiative),
    currentTurnIndex: 0,
    round: 1,
    isActive: false
  });

  const nextTurn = useCallback(() => {
    setState(prev => {
      let nextIndex = prev.currentTurnIndex + 1;
      let nextRound = prev.round;

      if (nextIndex >= prev.combatants.length) {
        nextIndex = 0;
        nextRound += 1;
      }

      return { ...prev, currentTurnIndex: nextIndex, round: nextRound };
    });
  }, []);

  const updateHP = useCallback((id: string, amount: number) => {
    setState(prev => ({
      ...prev,
      combatants: prev.combatants.map(c => {
        if (c.id !== id) return c;
        const newHP = Math.max(0, Math.min(c.hp.max, c.hp.current + amount));
        return { ...c, hp: { ...c.hp, current: newHP } };
      })
    }));
  }, []);

  const removeCombatant = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      combatants: prev.combatants.filter(c => c.id !== id)
    }));
  }, []);

  const startCombat = () => setState(prev => ({ ...prev, isActive: true }));

  return { state, nextTurn, updateHP, removeCombatant, startCombat };
}
