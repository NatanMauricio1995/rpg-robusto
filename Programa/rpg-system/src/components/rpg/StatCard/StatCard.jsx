import React from 'react';
import clsx from 'clsx';
import styles from './StatCard.module.css';

/**
 * StatCard component for RPG statistics
 */
const StatCard = ({ label, value, icon: Icon, trend, color = 'gold', className }) => {
  return (
    <div className={clsx(styles.card, styles[color], className)}>
      <div className={styles.header}>
        {Icon && <Icon className={styles.icon} size={20} />}
        <span className={styles.label}>{label}</span>
      </div>
      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        {trend && (
          <span className={clsx(styles.trend, trend > 0 ? styles.positive : styles.negative)}>
            {trend > 0 ? `+${trend}` : trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
