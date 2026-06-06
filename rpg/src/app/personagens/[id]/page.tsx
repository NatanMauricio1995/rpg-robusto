"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import HPBar from "@/components/Characters/HPBar/HPBar";
import StatusPill from "@/components/Common/StatusPill/StatusPill";
import InventoryTab from "@/components/Characters/Tabs/InventoryTab";
import SpellsTab from "@/components/Characters/Tabs/SpellsTab";
import styles from "./details.module.css";

type SheetTab = 'Atributos' | 'Inventário' | 'Magias' | 'Status' | 'História';

export default function CharacterDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<SheetTab>('Atributos');

  // Mock de dados detalhados
  const char = {
    name: "Eldrin Valerius",
    race: "Elfo",
    class: "Mago",
    level: 12,
    ca: 15,
    status: "Aprovado",
    resources: { hp: { current: 45, max: 52, temp: 0 }, mana: { current: 20, max: 30 }, exp: { current: 12000, next: 15000 } },
    attributes: { for: 8, dex: 14, con: 12, int: 20, wis: 14, cha: 10 },
    inventory: [
      { id: 'i1', libraryId: 'l1', name: 'Grimório de Couro', quantity: 1, weight: 3, rarity: 'Comum', cost: '50 po' },
      { id: 'i2', libraryId: 'l2', name: 'Cajado do Arquimago', quantity: 1, weight: 4, rarity: 'Lendário', cost: '-' },
      { id: 'i3', libraryId: 'l3', name: 'Poção de Cura Maior', quantity: 3, weight: 0.5, rarity: 'Incomum', cost: '100 po' }
    ],
    spells: [
      { id: 's1', libraryId: 'sp1', name: 'Mão Mágica', level: 0, school: 'Conjuração', castingTime: '1 ação', range: '30 pés', isPrepared: true },
      { id: 's2', libraryId: 'sp2', name: 'Bola de Fogo', level: 3, school: 'Evocação', castingTime: '1 ação', range: '150 pés', isPrepared: true },
      { id: 's3', libraryId: 'sp3', name: 'Invisibilidade', level: 2, school: 'Ilusão', castingTime: '1 ação', range: 'Toque', isPrepared: false }
    ]
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Personagens", href: "/personagens" },
          { label: char.name }
        ]} />

        <header className={styles.sheetHeader}>
          <div className={styles.mainInfo}>
            <div className={styles.avatar}>EV</div>
            <div>
              <div className={styles.titleGroup}>
                <h1 className={styles.title}>{char.name}</h1>
                <StatusPill status={char.status} type="success" />
              </div>
              <p className={styles.subtitle}>{char.race} {char.class} - Nível {char.level}</p>
            </div>
          </div>
          
          <div className={styles.vitalStats}>
            <div className={styles.caBadge}>
              <span className={styles.caLabel}>CA</span>
              <span className={styles.caValue}>{char.ca}</span>
            </div>
            <div style={{ width: '200px' }}>
              <HPBar current={char.resources.hp.current} max={char.resources.hp.max} size="lg" />
            </div>
          </div>

          <div className={styles.actions}>
            <button className="btn btn-secondary" onClick={() => router.push(`/personagens/${id}/editar`)}>
              Editar Ficha
            </button>
          </div>
        </header>

        <nav className={styles.tabs}>
          {(['Atributos', 'Inventário', 'Magias', 'Status', 'História'] as SheetTab[]).map(tab => (
            <button 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className={styles.sheetContent}>
          {activeTab === 'Atributos' && (
            <div className={styles.attributesGrid}>
              {Object.entries(char.attributes).map(([attr, val]) => (
                <div key={attr} className={styles.attrCard}>
                  <span className={styles.attrName}>{attr.toUpperCase()}</span>
                  <span className={styles.attrValue}>{val}</span>
                  <span className={styles.attrMod}>
                    {Math.floor((val - 10) / 2) >= 0 ? `+${Math.floor((val - 10) / 2)}` : Math.floor((val - 10) / 2)}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'Inventário' && (
            <InventoryTab items={char.inventory as any} />
          )}

          {activeTab === 'Magias' && (
            <SpellsTab spells={char.spells as any} />
          )}

          {(activeTab === 'Status' || activeTab === 'História') && (
            <div className={styles.placeholder}>
              Conteúdo de {activeTab} em desenvolvimento...
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
