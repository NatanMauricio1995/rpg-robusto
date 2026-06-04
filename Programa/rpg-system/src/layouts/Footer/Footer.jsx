"use client";

import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component for RPG Robusto
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.copyright}>
          &copy; {currentYear} RPG ROBUSTO. Todos os direitos reservados.
        </p>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Termos</a>
          <a href="#" className={styles.link}>Privacidade</a>
          <a href="#" className={styles.link}>Suporte</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
