"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import styles from "./details.module.css";

type TabType = 'Geral' | 'Continentes' | 'Religiões' | 'Facções' | 'Organizações';

export default function WorldDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('Geral');

  // Mock de dados do mundo
  const world = {
    id: id,
    name: "Aethelgard",
    system: "D&D 5e",
    status: "Ativo",
    description: "Um mundo de alta fantasia com foco em exploração de ruínas e política imperial.",
    createdAt: "2026-01-10",
    updatedAt: "2026-06-01",
  };

  const tabs: TabType[] = ['Geral', 'Continentes', 'Religiões', 'Facções', 'Organizações'];

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Mundos", href: "/mundo" },
            { label: world.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1 className={styles.title}>{world.name}</h1>
            <span className={`badge badge-success`}>{world.status}</span>
          </div>
          <div className={styles.meta}>
            Sistema: <strong>{world.system}</strong> | Criado em: {world.createdAt}
          </div>
        </header>

        <nav className={styles.tabs}>
          {tabs.map(tab => (
            <button 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <main className={styles.main}>
          {activeTab === 'Geral' && (
            <div className={styles.generalCard}>
              <h3 className={styles.sectionTitle}>Descrição do Mundo</h3>
              <p>{world.description}</p>
              
              <div className={styles.actions}>
                <button className="btn btn-secondary" onClick={() => router.push(`/mundo/${id}/editar`)}>
                  Editar Detalhes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Continentes' && (
            <div className={styles.subModule}>
              <CrudToolbar 
                newLabel="Novo Continente" 
                onNew={() => alert("Novo Continente")}
              />
              <DataGrid 
                data={[]} // TODO: Integrar com Hook de Continentes
                columns={[
                  { header: "Nome", accessor: "name" as any },
                  { header: "Status", accessor: "status" as any },
                  { header: "Criado em", accessor: "createdAt" as any }
                ]}
                onView={(item) => alert("Ver")}
                onEdit={(item) => alert("Editar")}
                onDelete={(item) => alert("Excluir")}
              />
            </div>
          )}

          {/* Outras tabs seguiriam o mesmo padrão de DataGrid */}
          {activeTab !== 'Geral' && activeTab !== 'Continentes' && (
            <div className={styles.placeholder}>
              <p>Módulo de {activeTab} em desenvolvimento.</p>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
