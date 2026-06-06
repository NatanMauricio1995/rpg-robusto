import styles from "./ProgressCard.module.css";
import { PlayerStats } from "@/types/report";

interface ProgressCardProps {
  player: PlayerStats;
}

export default function ProgressCard({ player }: ProgressCardProps) {
  const expPercentage = (player.exp.current / player.exp.next) * 100;

  return (
    <div className={`${styles.card} card`}>
      <div className={styles.header}>
        <div className={styles.nameArea}>
          <h3 className={styles.name}>{player.name}</h3>
          <span className={styles.level}>Nível {player.level}</span>
        </div>
        <div className={styles.kda}>
          <span>⚔️ {player.kills} Abates</span>
          <span>🛡️ {player.assists} Assist.</span>
        </div>
      </div>

      <div className={styles.progressArea}>
        <div className={styles.labels}>
          <span>Experiência</span>
          <span>{player.exp.current} / {player.exp.next} XP</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.fill} style={{ width: `${expPercentage}%` }} />
        </div>
      </div>
    </div>
  );
}
