"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { WorldService } from "@/services/WorldService";
import { World } from "@/types/world";
import styles from "./details.module.css";

type TabType = 'Geral' | 'Continentes' | 'Religiões' | 'Facções' | 'Organizações';

export default function WorldDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [world, setWorld] = useState<World | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('Geral');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await WorldService.getWorld(id as string);
        if (data) {
          setWorld(data);
        } else {
          setError("Mundo não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar mundo");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Mundo...</div>
      </MainLayout>
    );
  }

  if (error || !world) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Mundo não encontrado"}</div>
      </MainLayout>
    );
  }

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
            <span className={`badge ${world.status === 'Ativo' ? 'badge-success' : 'badge-secondary'}`}>
              {world.status}
            </span>
          </div>
          <div className={styles.meta}>
            Sistema: <strong>{world.system}</strong> | Criado em: {new Date(world.createdAt).toLocaleDateString()}
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
            <div className={styles.generalCard}>
              <h3 className={styles.sectionTitle}>Descrição do Mundo</h3>
              <p className={styles.descriptionText}>
                {world.description || "Nenhuma descrição fornecida."}
              </p>
              
              <div className={styles.actions}>
                <button className="btn btn-secondary" onClick={() => router.push(`/mundo/${id}/editar`)}>
                  Editar Detalhes
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'Geral' && (
            <div className={styles.subModule}>
              <CrudToolbar 
                newLabel={`Novo(a) ${activeTab.slice(0, -1)}`} 
                onNew={() => alert(`Novo(a) ${activeTab}`)}
              />
              <div className={styles.placeholder}>
                <p>Módulo de {activeTab} em desenvolvimento.</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </MainLayout>
  );
}
