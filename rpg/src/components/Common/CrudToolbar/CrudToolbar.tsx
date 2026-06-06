import styles from "./CrudToolbar.module.css";

interface CrudToolbarProps {
  onNew: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
  onExport?: () => void;
  newLabel: string;
  selectedCount?: number;
}

export default function CrudToolbar({ 
  onNew, 
  onEdit, 
  onDelete, 
  onDuplicate, 
  onExport,
  newLabel,
  selectedCount = 0
}: CrudToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.left}>
        <button className="btn btn-primary" onClick={onNew}>
          <span>+</span> {newLabel}
        </button>
      </div>
      
      <div className={styles.right}>
        {selectedCount > 0 && (
          <>
            {onEdit && <button className="btn btn-secondary" onClick={onEdit}>Editar</button>}
            {onDuplicate && <button className="btn btn-secondary" onClick={onDuplicate}>Duplicar</button>}
            {onDelete && <button className="btn btn-danger" onClick={onDelete}>Excluir</button>}
          </>
        )}
        {onExport && <button className="btn btn-secondary" onClick={onExport}>Exportar</button>}
      </div>
    </div>
  );
}
