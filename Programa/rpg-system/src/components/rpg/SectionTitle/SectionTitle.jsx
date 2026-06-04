import React from 'react';
import clsx from 'clsx';
import styles from './SectionTitle.module.css';

/**
 * SectionTitle component for standard section headers
 */
const SectionTitle = ({ title, subtitle, action, className }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.textWrapper}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
};

export default SectionTitle;
