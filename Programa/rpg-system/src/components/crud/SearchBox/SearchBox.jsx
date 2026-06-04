"use client";

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import clsx from 'clsx';
import styles from './SearchBox.module.css';

/**
 * SearchBox component for filtering data
 */
const SearchBox = ({ onSearch, placeholder = 'Pesquisar...', className }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    const newVal = e.target.value;
    setValue(newVal);
    onSearch && onSearch(newVal);
  };

  const handleClear = () => {
    setValue('');
    onSearch && onSearch('');
  };

  return (
    <div className={clsx(styles.container, className)}>
      <Search size={18} className={styles.searchIcon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className={styles.clearBtn} onClick={handleClear} aria-label="Limpar">
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBox;
