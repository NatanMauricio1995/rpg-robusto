import styles from "./EntryCard.module.css";
import { WorldEntry } from "@/types/world";

interface EntryCardProps {
  entry: WorldEntry;
}

export default function EntryCard({ entry }: EntryCardProps) {
  return (
    <div className={`${styles.card} card`}>
      <div className={styles.header}>
        <span className={styles.category}>{entry.category}</span>
        <h3 className={styles.title}>{entry.title}</h3>
      </div>
      <p className={styles.summary}>{entry.summary}</p>
      <div className={styles.footer}>
        <div className={styles.tags}>
          {entry.tags.map(tag => (
            <span key={tag} className={styles.tag}>#{tag}</span>
          ))}
        </div>
        <button className={styles.readMore}>Consultar 📜</button>
      </div>
    </div>
  );
}
