import React from 'react';
import Link from 'next/link';
import styles from './HomeScreen.module.css';

/**
 * HomeCard - Card de navegação para a home
 */
export default function HomeCard({ title, description, icon, href, disabled }) {
  if (disabled) {
    return (
      <div className={`${styles.card} ${styles.disabled}`}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <h3>{title}</h3>
        {description && <p>{description}</p>}
        <span className={styles.badge}>Em desenvolvimento</span>
      </div>
    );
  }

  return (
    <Link href={href} className={styles.card}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </Link>
  );
}
