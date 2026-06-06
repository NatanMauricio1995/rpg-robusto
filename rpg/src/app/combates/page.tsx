"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import CombatantRow from "@/components/Combat/CombatantRow/CombatantRow";
import { useCombat } from "@/hooks/useCombat";
import styles from "./page.module.css";

export default function CombatPage() {
  const { state, nextTurn, updateHP, removeCombatant, startCombat } = useCombat();
  const currentCombatant = state.combatants[state.currentTurnIndex];

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Rastreador de Combate</h1>
            <p className={styles.subtitle}>Gerencie a iniciativa e o status vital dos combatentes.</p>
          </div>
          <div className={styles.controls}>
            <div className={styles.roundBadge}>Rodada {state.round}</div>
            <button className="btn btn-secondary"><span>⚔️</span> Adicionar Combatente</button>
            <button className="btn btn-primary" onClick={nextTurn}>Próximo Turno ➔</button>
          </div>
        </header>

        <div className={styles.mainContent}>
          <div className={styles.list}>
            {state.combatants.map((combatant, index) => (
              <CombatantRow 
                key={combatant.id}
                combatant={combatant}
                isCurrentTurn={index === state.currentTurnIndex}
                onUpdateHP={updateHP}
                onRemove={removeCombatant}
              />
            ))}
          </div>

          <aside className={styles.turnInfo}>
            <div className="card">
              <h3 className={styles.asideTitle}>Turno Atual</h3>
              {currentCombatant && (
                <div className={styles.activeFocus}>
                  <div className={styles.activeName}>{currentCombatant.name}</div>
                  <div className={styles.activeMeta}>{currentCombatant.type} • AC {currentCombatant.ac}</div>
                  <div className={styles.activeHP}>
                    {currentCombatant.hp.current} / {currentCombatant.hp.max} HP
                  </div>
                </div>
              )}
              <div className={styles.actionsGrid}>
                <button className="btn btn-secondary btn-sm">Dano em Área</button>
                <button className="btn btn-secondary btn-sm">Finalizar Combate</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
