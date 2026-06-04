import React from 'react';
import { Plus, Download, Filter } from 'lucide-react';
import Button from '../../ui/Button';
import SearchBox from '../SearchBox';
import styles from './CrudToolbar.module.css';

/**
 * CrudToolbar component for managing data actions
 */
const CrudToolbar = ({ 
  onNew, 
  onSearch, 
  onExport, 
  onFilter,
  newLabel = 'Novo Registro',
  showSearch = true,
  showExport = false,
  showFilter = false,
}) => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        {showSearch && <SearchBox onSearch={onSearch} className={styles.search} />}
      </div>
      <div className={styles.right}>
        {showFilter && (
          <Button variant="ghost" icon={Filter} onClick={onFilter}>
            Filtros
          </Button>
        )}
        {showExport && (
          <Button variant="ghost" icon={Download} onClick={onExport}>
            Exportar
          </Button>
        )}
        {onNew && (
          <Button variant="primary" icon={Plus} onClick={onNew}>
            {newLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CrudToolbar;
