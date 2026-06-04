import React from 'react';
import styles from './HomeScreen.module.css';

/**
 * HomeSection - Seção de agrupamento de cards na home
 */
export default function HomeSection({ title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}
