import React from 'react';
import clsx from 'clsx';
import styles from './TextBox.module.css';

/**
 * Reusable TextBox component for RPG Robusto
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.error - Error message
 * @param {string} props.helperText - Helper text
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {boolean} props.required - Required state
 */
const TextBox = ({
  label,
  error,
  helperText,
  icon: Icon,
  required,
  className,
  type = 'text',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(styles.inputWrapper, error && styles.inputError)}>
        {Icon && <Icon className={styles.icon} size={18} />}
        <input
          id={inputId}
          type={type}
          className={clsx(styles.input, Icon && styles.withIcon)}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
      </div>
      {error && (
        <p id={`${inputId}-error`} className={styles.errorText}>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default TextBox;
