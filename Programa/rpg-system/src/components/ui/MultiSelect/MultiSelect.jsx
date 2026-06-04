"use client";

import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { X, ChevronDown, Search } from 'lucide-react';
import styles from './MultiSelect.module.css';

/**
 * Reusable MultiSelect component for RPG Robusto
 */
const MultiSelect = ({
  label,
  options = [],
  value = [],
  onChange,
  placeholder = 'Selecione...',
  error,
  helperText,
  required,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (optionValue) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const removeValue = (e, optionValue) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOptions = options.filter((opt) => value.includes(opt.value));

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div 
        className={clsx(styles.control, isOpen && styles.controlOpen, error && styles.controlError)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.values}>
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span key={opt.value} className={styles.badge}>
                {opt.label}
                <X 
                  size={14} 
                  className={styles.removeIcon} 
                  onClick={(e) => removeValue(e, opt.value)}
                />
              </span>
            ))
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
        </div>
        <ChevronDown size={18} className={clsx(styles.chevron, isOpen && styles.chevronOpen)} />
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.search}
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          </div>
          <div className={styles.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  className={clsx(styles.option, value.includes(opt.value) && styles.optionSelected)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(opt.value);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={value.includes(opt.value)}
                    readOnly
                    className={styles.checkbox}
                  />
                  {opt.label}
                </div>
              ))
            ) : (
              <div className={styles.noOptions}>Nenhuma opção encontrada</div>
            )}
          </div>
        </div>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
      {helperText && !error && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default MultiSelect;
