"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import LibraryTabs from "@/components/Library/LibraryTabs/LibraryTabs";
import LibraryCard from "@/components/Library/LibraryCard/LibraryCard";
import { useLibrary } from "@/hooks/useLibrary";
import { LibraryItem, Spell, Creature } from "@/types/library";
import styles from "./page.module.css";

export default function LibraryPage() {
  const { activeTab, setActiveTab, search, setSearch, loading, filteredData } = useLibrary();

  const renderContent = () => {
    if (loading) return <div className={styles.loading}>Consultando os tomos...</div>;

    return (
      <div className={styles.grid}>
        {activeTab === 'Itens' && (filteredData as LibraryItem[]).map(item => (
          <LibraryCard 
            key={item.id}
            title={item.name}
            subtitle={item.type}
            description={item.description}
            rarity={item.rarity}
            meta={`${item.cost || '-'} | ${item.weight || '-'}`}
          />
        ))}
        {activeTab === 'Magias' && (filteredData as Spell[]).map(spell => (
          <LibraryCard 
            key={spell.id}
            title={spell.name}
            subtitle={`Nível ${spell.level} - ${spell.school}`}
            description={spell.description}
            meta={`${spell.castingTime} | ${spell.range} | ${spell.duration}`}
          />
        ))}
        {activeTab === 'Bestiário' && (filteredData as Creature[]).map(creature => (
          <LibraryCard 
            key={creature.id}
            title={creature.name}
            subtitle={`${creature.size} ${creature.type}`}
            description={creature.description}
            meta={`ND: ${creature.challengeRating} | ${creature.alignment}`}
          />
        ))}
      </div>
    );
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Biblioteca RPG</h1>
            <p className={styles.subtitle}>Consulte regras, grimórios e compêndios de criaturas.</p>
          </div>
          <div className={styles.actions}>
            <input 
              type="text" 
              placeholder={`Buscar em ${activeTab}...`} 
              className={styles.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary">
              <span>📚</span> Novo Registro
            </button>
          </div>
        </header>

        <section className={styles.content}>
          <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </section>
      </div>
    </MainLayout>
  );
}
