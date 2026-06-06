"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import DataGrid from "@/components/Common/DataGrid/DataGrid";
import styles from "./class-details.module.css";

type ClassTab = 'Perícias' | 'Progressão' | 'Subclasses' | 'Proficiências';

export default function ClassDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ClassTab>('Progressão');

  // Mock de dados de Classe
  const cls = {
    name: "Mago",
    status: "Ativo",
    hitDie: "d6",
    primaryAbility: ["INT"],
    saves: ["INT", "WIS"],
    armorProficiencies: ["Nenhuma"],
    weaponProficiencies: ["Adagas", "Dardos", "Cajados"],
    progression: [
      { level: 1, prof: 2, features: ["Conjuração", "Recuperação Arcana"] },
      { level: 2, prof: 2, features: ["Tradição Arcana"] },
      { level: 3, prof: 2, features: ["-"] }
    ]
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Biblioteca", href: "/biblioteca" },
          { label: "Classes", href: "/biblioteca/classes" },
          { label: cls.name }
        ]} />

        <header className={styles.header}>
          <h1 className={styles.title}>{cls.name}</h1>
          <div className={styles.meta}>
            Dado de Vida: <strong>{cls.hitDie}</strong> | Atributo Chave: <strong>{cls.primaryAbility.join(', ')}</strong>
          </div>
        </header>

        <nav className={styles.tabs}>
          {(['Progressão', 'Perícias', 'Proficiências', 'Subclasses'] as ClassTab[]).map(tab => (
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
          {activeTab === 'Progressão' && (
            <div className={styles.progressionTableWrapper}>
              <table className={styles.progressionTable}>
                <thead>
                  <tr>
                    <th>Nível</th>
                    <th>Bônus Prof.</th>
                    <th>Características</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.progression.map(row => (
                    <tr key={row.level}>
                      <td>{row.level}º</td>
                      <td>+{row.prof}</td>
                      <td>{row.features.join(', ')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'Proficiências' && (
            <div className={styles.profSection}>
              <div className={styles.listGroup}>
                <h4>Salvaguardas (Resistências)</h4>
                <div className={styles.tagList}>
                  {cls.saves.map(s => <span key={s} className={styles.tag}>{s}</span>)}
                </div>
              </div>
              <div className={styles.listGroup}>
                <h4>Armas e Armaduras</h4>
                <div className={styles.tagList}>
                  {[...cls.weaponProficiencies, ...cls.armorProficiencies].map(p => <span key={p} className={styles.tag}>{p}</span>)}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Subclasses' && (
            <DataGrid 
              data={[]} // TODO: useSubClasses(id)
              columns={[
                { header: 'Subclasse', accessor: 'name' as any },
                { header: 'Nível de Início', accessor: 'level' as any },
                { header: 'Status', accessor: 'status' as any }
              ]}
              onView={() => {}} onEdit={() => {}} onDelete={() => {}}
            />
          )}

          {activeTab === 'Perícias' && (
            <div className={styles.placeholder}>
              Regras de escolha de perícias em desenvolvimento...
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
