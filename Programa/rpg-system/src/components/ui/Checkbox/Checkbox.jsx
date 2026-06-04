import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

/**
 * Reusable Checkbox component for RPG Robusto
 */
const Checkbox = ({
  label,
  description,
  checked,
  onChange,
  disabled,
  className,
  id,
  ...props
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.container, disabled && styles.disabled, className)}>
      <div className={styles.wrapper}>
        <input
          type="checkbox"
          id={checkboxId}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={styles.hiddenInput}
          {...props}
        />
        <div className={clsx(styles.checkbox, checked && styles.checked)}>
          {checked && <Check size={14} strokeWidth={3} />}
        </div>
        <div className={styles.textWrapper}>
          {label && (
            <label htmlFor={checkboxId} className={styles.label}>
              {label}
            </label>
          )}
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    </div>
  );
};

export default Checkbox;
