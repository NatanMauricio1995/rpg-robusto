"use client";

import HPBar from "@/components/Characters/HPBar/HPBar";
import StatusPill from "@/components/Common/StatusPill/StatusPill";
import { Combatant } from "@/types/combat";
import styles from "./CombatTracker.module.css";

interface CombatTrackerProps {
  combatants: Combatant[];
  currentTurnIndex: number;
  onUpdateHP: (id: string, amount: number) => void;
}

export default function CombatTracker({ combatants, currentTurnIndex, onUpdateHP }: CombatTrackerProps) {
  return (
    <div className={styles.tracker}>
      <div className={styles.header}>
        <span className={styles.initCol}>INI</span>
        <span className={styles.nameCol}>Combatente</span>
        <span className={styles.vitalCol}>Status Vital</span>
        <span className={styles.actionsCol}>Ações</span>
      </div>
      
      <div className={styles.list}>
        {combatants.map((c, index) => {
          const isActive = index === currentTurnIndex;
          return (
            <div key={c.id} className={`${styles.row} ${isActive ? styles.active : ''}`}>
              <div className={styles.initiative}>{c.initiative}</div>
              
              <div className={styles.info}>
                <span className={styles.name}>{c.name}</span>
                <div className={styles.conditions}>
                  {c.conditions.map(cond => (
                    <StatusPill key={cond} status={cond} type="warning" />
                  ))}
                </div>
              </div>

              <div className={styles.vitals}>
                <HPBar current={c.hp.current} max={c.hp.max} size="sm" />
                <div className={styles.meta}>AC: {c.ac} | {c.type}</div>
              </div>

              <div className={styles.actions}>
                <div className={styles.hpControls}>
                  <button onClick={() => onUpdateHP(c.id, -5)} className={styles.damageBtn}>-5</button>
                  <button onClick={() => onUpdateHP(c.id, 5)} className={styles.healBtn}>+5</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
