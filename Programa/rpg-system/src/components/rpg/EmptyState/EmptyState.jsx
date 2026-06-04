import React from 'react';
import clsx from 'clsx';
import { Archive } from 'lucide-react';
import styles from './EmptyState.module.css';

/**
 * EmptyState component for empty lists/searches
 */
const EmptyState = ({ 
  title = 'Nenhum item encontrado', 
  description, 
  icon: Icon = Archive,
  action,
  className 
}) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.iconWrapper}>
        <Icon size={48} />
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default EmptyState;
