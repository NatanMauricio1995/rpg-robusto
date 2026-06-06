"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import CategoryNav from "@/components/World/CategoryNav/CategoryNav";
import EntryCard from "@/components/World/EntryCard/EntryCard";
import { useWorld } from "@/hooks/useWorld";
import styles from "./page.module.css";

export default function WorldPage() {
  const { entries, loading, selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useWorld();

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Mundo / Codex</h1>
            <p className={styles.subtitle}>Explore o conhecimento acumulado sobre as terras, povos e mitos.</p>
          </div>
          <div className={styles.actions}>
            <input 
              type="text" 
              placeholder="Pesquisar no Codex..." 
              className={styles.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">
              <span>✍️</span> Novo Verbete
            </button>
          </div>
        </header>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <CategoryNav selected={selectedCategory} onSelect={setSelectedCategory} />
          </aside>

          <main className={styles.main}>
            {loading ? (
              <div className={styles.loading}>Abrindo os antigos pergaminhos...</div>
            ) : (
              <>
                <div className={styles.info}>
                  Mostrando {entries.length} verbetes em <strong>{selectedCategory}</strong>
                </div>
                <div className={styles.grid}>
                  {entries.map(entry => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                  {entries.length === 0 && (
                    <div className={styles.empty}>
                      Nenhum conhecimento encontrado para esta busca.
                    </div>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
}
