import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>🛡️</div>

        <span className={styles.logoText}>
          RPG Robusto
        </span>
      </div>

      <div className={styles.search}>
        <span>Buscar personagens, campanhas...</span>
      </div>

      <div className={styles.actions}>
        <button className={styles.iconButton}>
          🔔
          <span className={styles.notificationDot}></span>
        </button>

        <div className={styles.avatar}>
          GM
        </div>
      </div>
    </header>
  );
}