"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import DataGrid from "@/components/Common/DataGrid/DataGrid";
import styles from "./race-details.module.css";

type RaceTab = 'Atributos' | 'Proficiências' | 'Sub-Raças' | 'Traços';

export default function RaceDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<RaceTab>('Atributos');

  // Mock de dados de Raça
  const race = {
    name: "Elfo",
    status: "Ativo",
    size: "Médio",
    speed: 30,
    attributeBonuses: [
      { attribute: 'DEX', bonus: 2 },
      { attribute: 'INT', bonus: 1 }
    ],
    languages: ["Comum", "Élfico"],
    proficiencies: ["Percepção"],
    traits: [
      { name: "Ancestralidade Feérica", description: "Vantagem contra ser encantado e imune a sono mágico." },
      { name: "Transe", description: "Não precisa dormir, medita por 4 horas." }
    ]
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Biblioteca", href: "/biblioteca" },
          { label: "Raças", href: "/biblioteca/racas" },
          { label: race.name }
        ]} />

        <header className={styles.header}>
          <h1 className={styles.title}>{race.name}</h1>
          <div className={styles.meta}>
            Tamanho: <strong>{race.size}</strong> | Deslocamento: <strong>{race.speed} ft</strong>
          </div>
        </header>

        <nav className={styles.tabs}>
          {(['Atributos', 'Proficiências', 'Traços', 'Sub-Raças'] as RaceTab[]).map(tab => (
            <button 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className={styles.content}>
          {activeTab === 'Atributos' && (
            <div className={styles.attrGrid}>
              {race.attributeBonuses.map(attr => (
                <div key={attr.attribute} className={styles.attrCard}>
                  <span className={styles.attrName}>{attr.attribute}</span>
                  <span className={styles.attrBonus}>+{attr.bonus}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Proficiências' && (
            <div className={styles.profSection}>
              <div className={styles.listGroup}>
                <h4>Idiomas Nativos</h4>
                <div className={styles.tagList}>
                  {race.languages.map(l => <span key={l} className={styles.tag}>{l}</span>)}
                </div>
              </div>
              <div className={styles.listGroup}>
                <h4>Perícias e Proficiências</h4>
                <div className={styles.tagList}>
                  {race.proficiencies.map(p => <span key={p} className={styles.tag}>{p}</span>)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Traços' && (
            <div className={styles.traitsList}>
              {race.traits.map(trait => (
                <div key={trait.name} className={styles.traitCard}>
                  <h4 className={styles.traitName}>{trait.name}</h4>
                  <p className={styles.traitDesc}>{trait.description}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Sub-Raças' && (
            <DataGrid 
              data={[]} // TODO: useSubRaces(id)
              columns={[
                { header: 'Sub-Raça', accessor: 'name' as any },
                { header: 'Status', accessor: 'status' as any },
                { header: 'Criado em', accessor: 'createdAt' as any }
              ]}
              onView={() => {}} onEdit={() => {}} onDelete={() => {}}
            />
          )}
        </main>
      </div>
    </MainLayout>
  );
}
