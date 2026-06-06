"use client";

import styles from "./ManaBar.module.css";

interface ManaBarProps {
  current: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function ManaBar({ current, max, size = 'md' }: ManaBarProps) {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.label}>
        <span>Mana</span>
        <span>{current} / {max}</span>
      </div>
      <div className={styles.barBackground}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
