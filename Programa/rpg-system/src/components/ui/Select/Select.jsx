import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';

/**
 * Reusable Select component for RPG Robusto
 */
const Select = ({
  label,
  options = [],
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required,
  className,
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, className)}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={clsx(styles.selectWrapper, error && styles.inputError)}>
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          className={styles.select}
          required={required}
          aria-invalid={!!error}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.icon} size={18} />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default Select;
