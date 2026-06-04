import React from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import styles from './Button.module.css';

/**
 * Reusable Button component for RPG Robusto
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {Function} props.onClick - Click handler
 * @param {string} props.variant - primary, secondary, danger, ghost, success
 * @param {string} props.size - sm, md, lg
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.loading - Loading state
 * @param {string} props.type - button, submit, reset
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  loading = false,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        loading && styles.loading,
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <Loader2 className={styles.spinner} size={18} />
      ) : (
        <>
          {Icon && <Icon className={styles.icon} size={18} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
