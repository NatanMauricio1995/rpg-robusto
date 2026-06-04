import React from 'react';
import clsx from 'clsx';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar component for RPG health/mana bars
 */
const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'gold', 
  label, 
  showValue = false,
  size = 'md',
  className 
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={clsx(styles.container, className)}>
      {(label || showValue) && (
        <div className={styles.info}>
          {label && <span className={styles.label}>{label}</span>}
          {showValue && <span className={styles.value}>{value} / {max}</span>}
        </div>
      )}
      <div className={clsx(styles.track, styles[size])}>
        <div 
          className={clsx(styles.fill, styles[color])} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
    </div>
  );
};

export default ProgressBar;
