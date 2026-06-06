import styles from "./CategoryNav.module.css";
import { WorldCategory } from "@/types/world";

interface CategoryNavProps {
  selected: WorldCategory | 'Todas';
  onSelect: (category: WorldCategory | 'Todas') => void;
}

const CATEGORIES: (WorldCategory | 'Todas')[] = [
  'Todas', 'Geografia', 'História', 'Divindades', 'Organizações', 'Lendas'
];

export default function CategoryNav({ selected, onSelect }: CategoryNavProps) {
  return (
    <nav className={styles.nav}>
      <h3 className={styles.title}>Categorias</h3>
      <ul className={styles.list}>
        {CATEGORIES.map((cat) => (
          <li key={cat}>
            <button 
              className={`${styles.item} ${selected === cat ? styles.active : ''}`}
              onClick={() => onSelect(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
