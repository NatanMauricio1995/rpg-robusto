import styles from "./CharacterFilters.module.css";
import { CharacterFilters } from "@/types/character";

interface CharacterFiltersProps {
  filters: CharacterFilters;
  onChange: (filters: CharacterFilters) => void;
}

export default function CharacterFilters({ filters, onChange }: CharacterFiltersProps) {
  return (
    <div className={styles.container}>
      <div className={styles.searchField}>
        <input 
          type="text" 
          placeholder="Buscar herói pelo nome..." 
          className={styles.input}
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className={styles.selects}>
        <select 
          className={styles.select}
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as any })}
        >
          <option value="Todos">Todos os Status</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
          <option value="Morto">Morto</option>
        </select>

        <select 
          className={styles.select}
          value={filters.class}
          onChange={(e) => onChange({ ...filters, class: e.target.value })}
        >
          <option value="Todas">Todas as Classes</option>
          <option value="Guerreiro">Guerreiro</option>
          <option value="Mago">Mago</option>
          <option value="Ladino">Ladino</option>
          <option value="Clérigo">Clérigo</option>
        </select>
      </div>
    </div>
  );
}
