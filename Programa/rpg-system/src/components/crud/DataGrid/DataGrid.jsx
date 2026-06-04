"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';
import { Spinner } from '../../ui/Loading';
import EmptyState from '../../rpg/EmptyState';
import styles from './DataGrid.module.css';

/**
 * Reusable DataGrid component for RPG Robusto
 */
const DataGrid = ({
  columns = [],
  data = [],
  loading = false,
  pagination = { page: 1, totalPages: 1, totalItems: 0 },
  onPageChange,
  onSort,
  sortConfig = { key: null, direction: 'asc' },
  emptyMessage,
}) => {
  const handleSort = (key) => {
    if (!onSort) return;
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort(key, direction);
  };

  if (loading && data.length === 0) {
    return (
      <div className={styles.loadingWrapper}>
        <Spinner size={40} />
      </div>
    );
  }

  if (data.length === 0) {
    return <EmptyState title={emptyMessage} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th 
                  key={col.key} 
                  style={{ width: col.width }}
                  className={clsx(col.sortable && styles.sortable)}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className={styles.headerCell}>
                    {col.label}
                    {col.sortable && sortConfig.key === col.key && (
                      <span className={styles.sortIcon}>
                        {sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={row.id || rowIndex}>
                {columns.map((col) => (
                  <td key={col.key}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <span className={styles.totalItems}>
            Total de {pagination.totalItems} itens
          </span>
          <div className={styles.pages}>
            <button 
              className={styles.pageBtn} 
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
            >
              <ChevronLeft size={18} />
            </button>
            <span className={styles.pageInfo}>
              Página {pagination.page} de {pagination.totalPages}
            </span>
            <button 
              className={styles.pageBtn} 
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataGrid;
