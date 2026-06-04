import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import styles from './Loading.module.css';

export const Spinner = ({ size = 24, className }) => (
  <Loader2 className={clsx(styles.spinner, className)} size={size} />
);

export const Skeleton = ({ width, height, circle, className }) => (
  <div 
    className={clsx(styles.skeleton, className)} 
    style={{ 
      width, 
      height, 
      borderRadius: circle ? '50%' : 'var(--border-radius)' 
    }} 
  />
);

export const FullScreenLoading = ({ label = 'Carregando...' }) => (
  <div className={styles.fullScreen}>
    <div className={styles.loadingContainer}>
      <Spinner size={48} className={styles.goldSpinner} />
      <p className={styles.label}>{label}</p>
    </div>
  </div>
);

const Loading = ({ type = 'spinner', ...props }) => {
  if (type === 'full') return <FullScreenLoading {...props} />;
  if (type === 'skeleton') return <Skeleton {...props} />;
  return <Spinner {...props} />;
};

export default Loading;
