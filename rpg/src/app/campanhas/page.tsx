"use client";

import MainLayout from "@/layouts/MainLayout/MainLayout";
import CampaignCard from "@/components/Campaigns/CampaignCard/CampaignCard";
import { useCampaigns } from "@/hooks/useCampaigns";
import styles from "./page.module.css";

export default function CampaignsPage() {
  const { campaigns, loading, filters, setFilters } = useCampaigns();

  return (
    <MainLayout>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>Minhas Campanhas</h1>
            <p className={styles.subtitle}>Gerencie suas mesas de jogo, sessões e diários de campanha.</p>
          </div>
          <button className="btn btn-primary">
            <span>📜</span> Nova Campanha
          </button>
        </header>

        <section className={styles.filters}>
          <input 
            type="text" 
            placeholder="Buscar por nome ou mundo..." 
            className={styles.searchInput}
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <div className={styles.filterGroup}>
            {['Todas', 'Ativa', 'Pausada', 'Finalizada', 'Recrutando'].map(status => (
              <button 
                key={status}
                className={`${styles.filterBtn} ${filters.status === status ? styles.activeFilter : ''}`}
                onClick={() => setFilters({ ...filters, status: status as any })}
              >
                {status}
              </button>
            ))}
          </div>
        </section>

        {loading ? (
          <div className={styles.loading}>Consultando as crônicas do tempo...</div>
        ) : (
          <div className={styles.grid}>
            {campaigns.map(campaign => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
            {campaigns.length === 0 && (
              <div className={styles.empty}>
                Nenhuma campanha encontrada com os filtros selecionados.
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
