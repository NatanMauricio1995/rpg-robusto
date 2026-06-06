import styles from "./DataGrid.module.css";

export interface DataGridColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
}

interface DataGridProps<T> {
  data: T[];
  columns: DataGridColumn<T>[];
  onView: (item: T) => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  loading?: boolean;
}

export default function DataGrid<T extends { id: string }>({ 
  data, 
  columns, 
  onView, 
  onEdit, 
  onDelete,
  loading 
}: DataGridProps<T>) {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} style={{ width: col.width }}>{col.header}</th>
            ))}
            <th className={styles.actionsHeader}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={columns.length + 1} className={styles.loading}>Carregando...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={columns.length + 1} className={styles.empty}>Nenhum registro encontrado.</td></tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className={styles.row}>
                {columns.map((col, idx) => (
                  <td key={idx}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                <td className={styles.actions}>
                  <button title="Visualizar" onClick={() => onView(item)}>👁️</button>
                  <button title="Editar" onClick={() => onEdit(item)}>✍️</button>
                  <button title="Excluir" onClick={() => onDelete(item)}>🗑️</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
