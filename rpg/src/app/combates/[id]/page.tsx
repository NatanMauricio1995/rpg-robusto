"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CombatTracker from "@/components/Combat/CombatTracker/CombatTracker";
import CombatTimeline from "@/components/Combat/CombatTimeline/CombatTimeline";
import DataGrid from "@/components/Common/DataGrid/DataGrid";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import StatusPill from "@/components/Common/StatusPill/StatusPill";
import { useCombatDetails } from "@/hooks/useCombat";
import styles from "./details.module.css";

type CombatTab = 'Iniciativa' | 'Loot' | 'XP' | 'Participantes';

export default function CombatDetailsPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<CombatTab>('Iniciativa');
  const { combat, loading, nextTurn, updateHP, closeCombat, events } = useCombatDetails(id as string);

  if (loading) return (
    <MainLayout>
      <div className={styles.loading}>Invocando as energias do combate...</div>
    </MainLayout>
  );

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Combates", href: "/combates" },
          { label: combat?.name || "Encontro" }
        ]} />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{combat?.name}</h1>
            <StatusPill status={combat?.status || 'Ativo'} type="success" />
          </div>
          <div className={styles.actions}>
            <button className="btn btn-secondary" onClick={() => {}}>Ajustar Iniciativa</button>
            <button className="btn btn-danger" onClick={closeCombat}>Encerrar Encontro</button>
          </div>
        </header>

        <nav className={styles.tabs}>
          <div className={styles.tabsInner}>
            {(['Iniciativa', 'Participantes', 'Loot', 'XP'] as CombatTab[]).map(tab => (
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

        <main className={styles.content}>
          {activeTab === 'Iniciativa' && combat && (
            <div className={styles.warRoom}>
              <section className={styles.trackerArea}>
                <div className={styles.trackerHeader}>
                  <div className={styles.roundInfo}>
                    <span className={styles.roundLabel}>RODADA</span>
                    <span className={styles.roundValue}>{combat.round}</span>
                  </div>
                  <button className="btn btn-primary" onClick={nextTurn}>Próximo Turno ➔</button>
                </div>
                
                <CombatTracker 
                  combatants={combat.combatants} 
                  currentTurnIndex={combat.currentTurnIndex}
                  onUpdateHP={updateHP}
                />
              </section>

              <aside className={styles.timelineArea}>
                <CombatTimeline events={events} />
              </aside>
            </div>
          )}
          
          {activeTab === 'Participantes' && (
            <div className={styles.subModule}>
              <CrudToolbar newLabel="Adicionar Jogador" onNew={() => {}} />
              <DataGrid 
                data={combat?.combatants.filter(c => c.type === 'Player') || []}
                columns={[
                  { header: 'Nome', accessor: 'name' },
                  { header: 'AC', accessor: 'ac' },
                  { header: 'HP', accessor: (c) => `${c.hp.current}/${c.hp.max}` }
                ]}
                onView={() => {}} onEdit={() => {}} onDelete={() => {}}
              />
            </div>
          )}

          {activeTab === 'Loot' && (
            <div className={styles.subModule}>
              <CrudToolbar newLabel="Adicionar Item" onNew={() => {}} />
              <DataGrid 
                data={combat?.loot || []}
                columns={[
                  { header: 'Item', accessor: 'name' },
                  { header: 'Qtd', accessor: 'quantity' }
                ]}
                onView={() => {}} onEdit={() => {}} onDelete={() => {}}
              />
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
