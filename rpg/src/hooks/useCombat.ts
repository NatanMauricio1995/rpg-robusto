"use client";

import { useState, useCallback, useEffect } from 'react';
import { Combat, Combatant } from '@/types/combat';

const MOCK_COMBATANTS: Combatant[] = [
  { id: '1', externalId: 'p1', name: 'Eldrin Valerius', type: 'Player', hp: { current: 45, max: 52 }, ac: 15, initiative: 22, conditions: [] },
  { id: '2', externalId: 'm1', name: 'Lobo Atroz', type: 'NPC', hp: { current: 18, max: 18 }, ac: 13, initiative: 18, conditions: [] },
  { id: '3', externalId: 'p2', name: 'Korg o Destruidor', type: 'Player', hp: { current: 12, max: 76 }, ac: 18, initiative: 14, conditions: ['Envenenado'] },
  { id: '4', externalId: 'm2', name: 'Chefe Orc', type: 'Boss', hp: { current: 110, max: 110 }, ac: 16, initiative: 8, conditions: [] },
];

export function useCombatDetails(id: string) {
  const [combat, setCombat] = useState<Combat | null>(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Simulação de carregamento
    const timer = setTimeout(() => {
      setCombat({
        id,
        name: "Emboscada na Estrada",
        campaignId: "c1",
        campaignName: "As Crônicas de Aethelgard",
        location: "Estrada do Rei",
        status: "Ativo",
        round: 1,
        currentTurnIndex: 0,
        combatants: [...MOCK_COMBATANTS].sort((a, b) => b.initiative - a.initiative),
        totalXP: 1200,
        loot: [],
        createdAt: '2026-06-05',
        updatedAt: '2026-06-05'
      });
      setEvents([
        { id: 'e1', round: 1, timestamp: '20:00', type: 'system', description: 'O combate iniciou!' },
        { id: 'e2', round: 1, timestamp: '20:01', type: 'turn', description: 'Turno de Eldrin Valerius.' }
      ]);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [id]);

  const nextTurn = useCallback(() => {
    if (!combat) return;
    setCombat(prev => {
      if (!prev) return null;
      let nextIndex = prev.currentTurnIndex + 1;
      let nextRound = prev.round;
      if (nextIndex >= prev.combatants.length) {
        nextIndex = 0;
        nextRound++;
      }
      
      const nextActor = prev.combatants[nextIndex];
      setEvents(ev => [{
        id: Math.random().toString(),
        round: nextRound,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'turn',
        description: `Turno de ${nextActor.name}.`
      }, ...ev]);

      return { ...prev, currentTurnIndex: nextIndex, round: nextRound };
    });
  }, [combat]);

  const updateHP = useCallback((combatantId: string, amount: number) => {
    setCombat(prev => {
      if (!prev) return null;
      const actor = prev.combatants.find(c => c.id === combatantId);
      if (actor) {
        setEvents(ev => [{
          id: Math.random().toString(),
          round: prev.round,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: amount < 0 ? 'damage' : 'heal',
          description: `${actor.name} ${amount < 0 ? 'recebeu' : 'recuperou'} ${Math.abs(amount)} HP.`
        }, ...ev]);
      }
      return {
        ...prev,
        combatants: prev.combatants.map(c => 
          c.id === combatantId 
            ? { ...c, hp: { ...c.hp, current: Math.max(0, Math.min(c.hp.max, c.hp.current + amount)) } }
            : c
        )
      };
    });
  }, []);

  const closeCombat = useCallback(() => {
    alert("Combate encerrado. XP e Loot distribuídos!");
  }, []);

  return { combat, loading, nextTurn, updateHP, closeCombat, events };
}
