"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import CharacterTable from "@/components/Characters/CharacterTable/CharacterTable";
import CharacterFilters from "@/components/Characters/CharacterFilters/CharacterFilters";
import { useCharacters } from "@/hooks/useCharacters";
import styles from "./page.module.css";

export default function CharactersPage() {
  const { characters, loading, filters, setFilters } = useCharacters();

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Lista de Personagens</h1>
            <p className={styles.subtitle}>Gerencie e acompanhe o progresso de todos os heróis das campanhas.</p>
          </div>
          <button className="btn btn-primary">
            <span>⚔️</span> Novo Personagem
          </button>
        </header>

        <section className={styles.content}>
          <CharacterFilters filters={filters} onChange={setFilters} />
          
          {loading ? (
            <div className={styles.loading}>Consultando o Oráculo...</div>
          ) : (
            <div className={styles.tableWrapper}>
              <CharacterTable characters={characters} />
              <div className={styles.footer}>
                Mostrando {characters.length} heróis encontrados
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}
