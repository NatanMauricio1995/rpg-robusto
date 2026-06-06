"use client";

import styles from "./StatusPill.module.css";

interface StatusPillProps {
  status: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
}

export default function StatusPill({ status, type = 'default' }: StatusPillProps) {
  const getClassName = () => {
    switch (type) {
      case 'success': return styles.success;
      case 'warning': return styles.warning;
      case 'error': return styles.error;
      case 'info': return styles.info;
      default: return styles.default;
    }
  };

  return (
    <span className={`${styles.pill} ${getClassName()}`}>
      {status}
    </span>
  );
}
