"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useCampaigns } from "@/hooks/useCampaigns";
import { Campaign } from "@/types/campaign";
import styles from "./page.module.css";

export default function CampaignsPage() {
  const router = useRouter();
  const { 
    campaigns, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    statusFilter, 
    setStatusFilter,
    deleteCampaign 
  } = useCampaigns();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Ativa': return 'badge-success';
      case 'Pausada': return 'badge-warning';
      case 'Finalizada': return 'badge-secondary';
      case 'Recrutando': return 'badge-error';
      default: return '';
    }
  };

  const columns: DataGridColumn<Campaign>[] = [
    { header: "Nome", accessor: "name" },
    { header: "Sistema", accessor: "system" },
    { header: "Mundo", accessor: "worldName" },
    { header: "Mestre", accessor: "dmName" },
    { header: "Jogadores", accessor: (item) => `${item.playerCount} / ${item.maxPlayers}` },
    { 
      header: "Status", 
      accessor: (item) => (
        <span className={`badge ${getStatusBadgeClass(item.status)}`}>
          {item.status}
        </span>
      ) 
    },
    { header: "Criado em", accessor: "createdAt" },
    { header: "Atualizado em", accessor: "updatedAt" },
  ];

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Campanhas" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Campanhas</h1>
        </header>

        <CrudToolbar 
          newLabel="Nova Campanha" 
          onNew={() => router.push("/campanhas/novo")}
          onExport={() => alert("Exportando campanhas...")}
        />

        <section className={styles.filters}>
          <div className={styles.filterGrid}>
            <input 
              type="text" 
              placeholder="Buscar por nome, mestre ou mundo..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            
            <div className={styles.tabsFilter}>
              {['Todas', 'Ativa', 'Pausada', 'Recrutando', 'Finalizada'].map(status => (
                <button 
                  key={status}
                  className={`${styles.tabBtn} ${statusFilter === status ? styles.activeTab : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={campaigns} 
            columns={columns} 
            loading={loading}
            onView={(item) => router.push(`/campanhas/${item.id}`)}
            onEdit={(item) => router.push(`/campanhas/${item.id}/editar`)}
            onDelete={(item) => deleteCampaign(item.id)}
          />
        </main>

        <footer className={styles.footer}>
          <span>Exibindo {campaigns.length} mesas de jogo</span>
        </footer>
      </div>
    </MainLayout>
  );
}
