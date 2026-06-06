import styles from "./LibraryTabs.module.css";
import { LibraryTab } from "@/types/library";

interface LibraryTabsProps {
  activeTab: LibraryTab;
  onTabChange: (tab: LibraryTab) => void;
}

export default function LibraryTabs({ activeTab, onTabChange }: LibraryTabsProps) {
  const tabs: LibraryTab[] = ['Itens', 'Magias', 'Bestiário'];

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
