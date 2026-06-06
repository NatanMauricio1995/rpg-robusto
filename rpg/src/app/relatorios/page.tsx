"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import MetricCard from "@/components/Reports/MetricCard/MetricCard";
import ProgressCard from "@/components/Reports/ProgressCard/ProgressCard";
import { useReports } from "@/hooks/useReports";
import styles from "./page.module.css";

export default function ReportsPage() {
  const { data, loading } = useReports();

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Crônicas & Estatísticas</h1>
            <p className={styles.subtitle}>Analise o progresso da campanha e as conquistas dos heróis.</p>
          </div>
          <button className="btn btn-secondary">
            <span>📜</span> Exportar Pergaminho
          </button>
        </header>

        {loading ? (
          <div className={styles.loading}>Tecendo os fios do destino...</div>
        ) : (
          <>
            <section className={styles.metricsGrid}>
              <MetricCard 
                label="Sessões Realizadas" 
                value={data?.metrics.totalSessions || 0} 
                subValue="+2 esta semana"
                icon="📜"
              />
              <MetricCard 
                label="Horas de Jogo" 
                value={`${data?.metrics.totalHours || 0}h`} 
                icon="⏳"
              />
              <MetricCard 
                label="Batalhas Vencidas" 
                value={data?.metrics.combatsWon || 0} 
                subValue="95% Taxa de Vitória"
                icon="⚔️"
              />
              <MetricCard 
                label="Ouro Acumulado" 
                value={`${(data?.metrics.goldEarned || 0).toLocaleString()} po`} 
                icon="💰"
              />
            </section>

            <div className={styles.mainContent}>
              <section className={styles.progressSection}>
                <h2 className={styles.sectionTitle}>Evolução dos Heróis</h2>
                <div className={styles.progressGrid}>
                  {data?.playerStats.map(player => (
                    <ProgressCard key={player.id} player={player} />
                  ))}
                </div>
              </section>

              <aside className={styles.summaryAside}>
                <div className="card">
                  <h3 className={styles.summaryTitle}>Marco Histórico</h3>
                  <div className={styles.milestone}>
                    <div className={styles.milestoneIcon}>🏆</div>
                    <div className={styles.milestoneInfo}>
                      <div className={styles.milestoneName}>Matadores de Dragão</div>
                      <div className={styles.milestoneDesc}>Derrotaram o Dragão Vermelho de Aethelgard.</div>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>Ver Todos os Marcos</button>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
