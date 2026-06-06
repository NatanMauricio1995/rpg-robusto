import styles from "./LibraryCard.module.css";
import { ItemRarity } from "@/types/library";

interface LibraryCardProps {
  title: string;
  subtitle: string;
  description: string;
  rarity?: ItemRarity;
  meta?: string;
}

export default function LibraryCard({ title, subtitle, description, rarity, meta }: LibraryCardProps) {
  const getRarityClass = (r: ItemRarity) => {
    switch (r) {
      case 'Comum': return styles.rarityComum;
      case 'Incomum': return styles.rarityIncomum;
      case 'Raro': return styles.rarityRaro;
      case 'Muito Raro': return styles.rarityMuitoRaro;
      case 'Lendário': return styles.rarityLendario;
      default: return '';
    }
  };

  return (
    <div className={`${styles.card} card`}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.subtitle}>{subtitle}</span>
        </div>
        {rarity && (
          <span className={`${styles.rarity} ${getRarityClass(rarity)}`}>
            {rarity}
          </span>
        )}
      </div>
      <p className={styles.description}>{description}</p>
      {meta && (
        <div className={styles.footer}>
          <span className={styles.meta}>{meta}</span>
        </div>
      )}
    </div>
  );
}
