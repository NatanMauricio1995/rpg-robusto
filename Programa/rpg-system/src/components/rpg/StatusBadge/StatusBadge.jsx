import React from 'react';
import clsx from 'clsx';
import styles from './StatusBadge.module.css';

/**
 * StatusBadge component for RPG states
 */
const StatusBadge = ({ children, variant = 'neutral', className }) => {
  return (
    <span className={clsx(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
};

export default StatusBadge;
