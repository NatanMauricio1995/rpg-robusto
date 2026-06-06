"use client";

import styles from "./HPBar.module.css";

interface HPBarProps {
  current: number;
  max: number;
  temp?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function HPBar({ current, max, temp = 0, size = 'md' }: HPBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  const tempPercentage = Math.min((temp / max) * 100, 100);

  return (
    <div className={`${styles.container} ${styles[size]}`}>
      <div className={styles.label}>
        <span>Vida</span>
        <span>{current + temp} / {max}</span>
      </div>
      <div className={styles.barBackground}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
        {temp > 0 && <div className={styles.tempFill} style={{ width: `${tempPercentage}%` }} />}
      </div>
    </div>
  );
}
