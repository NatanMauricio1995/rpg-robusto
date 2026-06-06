import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.navGroup}>
        <Link href="/dashboard" className={`${styles.navItem} ${styles.active}`}>
          Dashboard
        </Link>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Mundo</div>

        <Link href="/mundo" className={styles.navItem}>
          Mundo
        </Link>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Biblioteca RPG</div>

        <Link href="/biblioteca" className={styles.navItem}>
          Biblioteca RPG
        </Link>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Gestão</div>

        <Link href="/personagens" className={styles.navItem}>
          Personagens
        </Link>

        <Link href="/campanhas" className={styles.navItem}>
          Campanhas
        </Link>

        <Link href="/combates" className={styles.navItem}>
          Combates
        </Link>

        <Link href="/relatorios" className={styles.navItem}>
          Relatórios
        </Link>
      </div>

      <div className={styles.navGroup}>
        <div className={styles.navLabel}>Sistema</div>

        <Link href="/configuracoes" className={styles.navItem}>
          Configurações
        </Link>
      </div>
    </aside>
  );
}