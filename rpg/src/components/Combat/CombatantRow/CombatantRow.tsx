import styles from "./CombatantRow.module.css";
import { Combatant } from "@/types/combat";

interface CombatantRowProps {
  combatant: Combatant;
  isCurrentTurn: boolean;
  onUpdateHP: (id: string, amount: number) => void;
  onRemove: (id: string) => void;
}

export default function CombatantRow({ combatant, isCurrentTurn, onUpdateHP, onRemove }: CombatantRowProps) {
  const hpPercentage = (combatant.hp.current / combatant.hp.max) * 100;
  
  const getHPColor = () => {
    if (hpPercentage <= 25) return 'var(--blood-600)';
    if (hpPercentage <= 50) return 'var(--gold-500)';
    return 'var(--forest-600)';
  };

  return (
    <div className={`${styles.row} ${isCurrentTurn ? styles.activeTurn : ''} card`}>
      <div className={styles.initiative}>{combatant.initiative}</div>
      
      <div className={styles.mainInfo}>
        <div className={styles.nameGroup}>
          <span className={styles.name}>{combatant.name}</span>
          <span className={styles.type}>{combatant.type}</span>
        </div>
        
        <div className={styles.stats}>
          <div className={styles.acBadge}>🛡️ {combatant.ac}</div>
          <div className={styles.hpArea}>
            <div className={styles.hpText}>
              {combatant.hp.current} / {combatant.hp.max} HP
            </div>
            <div className={styles.hpBarContainer}>
              <div 
                className={styles.hpBarFill} 
                style={{ width: `${hpPercentage}%`, backgroundColor: getHPColor() }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.conditions}>
        {combatant.conditions.map(cond => (
          <span key={cond} className={styles.conditionTag}>{cond}</span>
        ))}
      </div>

      <div className={styles.actions}>
        <div className={styles.hpControls}>
          <button onClick={() => onUpdateHP(combatant.id, -5)} className={styles.damageBtn}>-5</button>
          <button onClick={() => onUpdateHP(combatant.id, 5)} className={styles.healBtn}>+5</button>
        </div>
        <button onClick={() => onRemove(combatant.id)} className={styles.removeBtn}>✕</button>
      </div>
    </div>
  );
}
