"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import styles from "./details.module.css";

type TabType = 'Iniciativa' | 'Participantes' | 'Inimigos' | 'Loot' | 'XP & Fechamento';

export default function CombatDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Iniciativa');

  const combat = {
    id: id,
    name: "Emboscada na Estrada",
    campaignName: "As Crônicas de Aethelgard",
    status: "Ativo",
    round: 3,
    totalXP: 1200,
  };

  const tabs: TabType[] = ['Iniciativa', 'Participantes', 'Inimigos', 'Loot', 'XP & Fechamento'];

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Combates", href: "/combates" },
            { label: combat.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{combat.name}</h1>
            <span className={`badge badge-success`}>{combat.status}</span>
          </div>
          <div className={styles.meta}>
            Campanha: <strong>{combat.campaignName}</strong> | Rodada: <strong>{combat.round}</strong>
          </div>
        </header>

        <nav className={styles.tabs}>
          <div className={styles.tabsInner}>
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </nav>

        <main className={styles.main}>
          {activeTab === 'Iniciativa' && (
            <div className={styles.trackerArea}>
              <div className={styles.trackerHeader}>
                <div className={styles.roundInfo}>Rodada {combat.round}</div>
                <button className="btn btn-primary">Próximo Turno ➔</button>
              </div>
              
              <div className={styles.combatList}>
                {/* Aqui entra o DataGrid de Iniciativa customizado ou o antigo CombatantRow adaptado */}
                <p className={styles.placeholder}>Rastreador de iniciativa em tempo real.</p>
              </div>
            </div>
          )}

          {activeTab === 'Participantes' && (
            <div className={styles.subModule}>
              <CrudToolbar newLabel="Adicionar Jogador" onNew={() => {}} />
              <DataGrid 
                data={[]} // TODO: Integrar Hook
                columns={[
                  { header: "Nome", accessor: "name" as any },
                  { header: "HP", accessor: (item: any) => `${item.hp.current}/${item.hp.max}` },
                  { header: "Iniciativa", accessor: "initiative" as any },
                ]}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}

          {activeTab === 'Loot' && (
            <div className={styles.subModule}>
              <CrudToolbar newLabel="Adicionar Item de Loot" onNew={() => {}} />
              <DataGrid 
                data={[]}
                columns={[
                  { header: "Item", accessor: "name" as any },
                  { header: "Quantidade", accessor: "quantity" as any },
                ]}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}

          {['Inimigos', 'XP & Fechamento'].includes(activeTab) && (
            <div className={styles.placeholder}>
              <p>Módulo de {activeTab} integrado ao fluxo ERP.</p>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
