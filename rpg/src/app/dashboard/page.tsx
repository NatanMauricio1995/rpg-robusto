"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import StatCard from "@/components/Dashboard/StatCard/StatCard";
import RecentActivity from "@/components/Dashboard/RecentActivity/RecentActivity";
import QuickActions from "@/components/Dashboard/QuickActions/QuickActions";
import { useDashboard } from "@/hooks/useDashboard";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { data, loading } = useDashboard();

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>
          <p>Carregando Pergaminhos...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Painel do Mestre</h1>
          <p className={styles.subtitle}>Bem-vindo de volta, as crônicas aguardam sua liderança.</p>
        </header>

        <section className={styles.statsGrid}>
          <StatCard 
            label="Campanhas Ativas" 
            value={data?.stats.activeCampaigns || 0} 
            icon="🏰" 
            trend="+1 este mês"
          />
          <StatCard 
            label="Total de Personagens" 
            value={data?.stats.totalCharacters || 0} 
            icon="👥" 
          />
          <StatCard 
            label="Próxima Sessão" 
            value={data?.stats.nextSessionDate || "Nenhuma"} 
            icon="📅" 
          />
          <StatCard 
            label="Itens na Biblioteca" 
            value={data?.stats.libraryItems || 0} 
            icon="📖" 
          />
        </section>

        <div className={styles.mainGrid}>
          <div className={styles.leftCol}>
            <RecentActivity activities={data?.recentActivities || []} />
          </div>
          <div className={styles.rightCol}>
            <QuickActions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
