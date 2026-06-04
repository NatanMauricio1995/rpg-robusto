import React from 'react';
import clsx from 'clsx';
import styles from './TextArea.module.css';

/**
 * Reusable TextArea component for RPG Robusto
 */
const TextArea = ({
  label,
  error,
  helperText,
  required,
  className,
  rows = 4,
  id,
  ...props
}) => {
  const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={clsx(styles.textarea, error && styles.inputError)}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        {...props}
      />
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

export default TextArea;
