import React from 'react';
import clsx from 'clsx';
import styles from './ContentContainer.module.css';

/**
 * ContentContainer component for consistent page padding and layout
 */
const ContentContainer = ({ children, maxWidth = 'xl', className }) => {
  return (
    <main className={clsx(styles.container, styles[maxWidth], className)}>
      {children}
    </main>
  );
};

export default ContentContainer;
