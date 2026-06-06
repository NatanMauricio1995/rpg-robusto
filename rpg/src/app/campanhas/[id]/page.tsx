"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import styles from "./details.module.css";

type TabType = 'Geral' | 'Participantes' | 'Convites' | 'Sessões' | 'Missões' | 'Capítulos';

export default function CampaignDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Geral');

  const campaign = {
    id: id,
    name: "As Crônicas de Aethelgard",
    system: "D&D 5e",
    worldName: "Aethelgard",
    dmName: "Mestre Arcano",
    status: "Ativa",
    description: "Uma jornada épica para recuperar os fragmentos da Estrela Caída...",
    createdAt: "2026-01-15",
    updatedAt: "2026-06-01",
  };

  const tabs: TabType[] = ['Geral', 'Participantes', 'Convites', 'Sessões', 'Missões', 'Capítulos'];

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Campanhas", href: "/campanhas" },
            { label: campaign.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{campaign.name}</h1>
            <span className={`badge badge-success`}>{campaign.status}</span>
          </div>
          <div className={styles.meta}>
            Sistema: <strong>{campaign.system}</strong> | Mestre: <strong>{campaign.dmName}</strong>
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
          {activeTab === 'Geral' && (
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Sinopse da Campanha</h3>
              <p>{campaign.description}</p>
              <div className={styles.actions}>
                <button className="btn btn-secondary" onClick={() => router.push(`/campanhas/${id}/editar`)}>
                  Editar Detalhes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Participantes' && (
            <div className={styles.subModule}>
              <CrudToolbar 
                newLabel="Convidar Jogador" 
                onNew={() => setActiveTab('Convites')}
              />
              <DataGrid 
                data={[]} // TODO: Integrar Hook
                columns={[
                  { header: "Nome", accessor: "userName" as any },
                  { header: "Papel", accessor: "role" as any },
                  { header: "Personagem", accessor: "characterName" as any },
                  { header: "Status", accessor: "status" as any },
                ]}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}

          {activeTab === 'Sessões' && (
            <div className={styles.subModule}>
              <CrudToolbar 
                newLabel="Nova Sessão" 
                onNew={() => alert("Criar Sessão")}
              />
              <DataGrid 
                data={[]} // TODO: Integrar Hook
                columns={[
                  { header: "Número", accessor: "number" as any, width: "80px" },
                  { header: "Título", accessor: "name" as any },
                  { header: "Data", accessor: "date" as any },
                  { header: "Resumo", accessor: "summary" as any },
                ]}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          )}

          {['Missões', 'Capítulos', 'Convites'].includes(activeTab) && (
            <div className={styles.placeholder}>
              <p>O módulo de {activeTab} está em fase de preparação para esta mesa.</p>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
