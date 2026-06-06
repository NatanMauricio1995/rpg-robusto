"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useReports } from "@/hooks/useReports";
import { ReportCategory } from "@/types/report";
import styles from "./page.module.css";

export default function ReportsPage() {
  const router = useRouter();
  const { 
    activeCategory, 
    setActiveCategory, 
    data, 
    loading, 
    filters, 
    setFilters, 
    exportReport 
  } = useReports();

  const categories: ReportCategory[] = ['Campanhas', 'Personagens', 'Combates', 'Inimigos'];

  const getColumns = (): DataGridColumn<any>[] => {
    const baseColumns: DataGridColumn<any>[] = [
      { header: "Relatório", accessor: "name" },
    ];

    const categoryColumns: Record<ReportCategory, DataGridColumn<any>[]> = {
      Campanhas: [
        { header: "Sistema", accessor: "system" },
        { header: "Sessões", accessor: "totalSessions" },
        { header: "XP Total", accessor: (item) => `${item.totalXP} XP` },
      ],
      Personagens: [
        { header: "Jogador", accessor: "playerName" },
        { header: "Nível", accessor: "level" },
        { header: "Presença", accessor: (item) => `${item.sessionsPlayed} sessões` },
      ],
      Combates: [
        { header: "Campanha", accessor: "campaignName" },
        { header: "Rodadas", accessor: "totalRounds" },
        { header: "Dificuldade", accessor: "difficulty" },
      ],
      Inimigos: [
        { header: "Tipo", accessor: "type" },
        { header: "ND", accessor: "challengeRating" },
        { header: "Encontros", accessor: "timesEncountered" },
      ]
    };

    return [...baseColumns, ...categoryColumns[activeCategory], { header: "Atualizado em", accessor: "updatedAt" }];
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Relatórios" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Centro de Analytics</h1>
        </header>

        <nav className={styles.tabs}>
          <div className={styles.tabsInner}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.activeTab : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </nav>

        <CrudToolbar 
          newLabel="Gerar Novo Relatório" 
          onNew={() => alert("Configurando parâmetros do relatório...")}
          onExport={() => exportReport('PDF')}
        />

        <section className={styles.filters}>
          <div className={styles.filterGrid}>
            <input 
              type="text" 
              placeholder={`Pesquisar nos relatórios de ${activeCategory.toLowerCase()}...`} 
              className={styles.searchInput}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            
            <div className={styles.dateFilters}>
              <input type="date" className={styles.dateInput} title="Data Início" />
              <span className={styles.separator}>até</span>
              <input type="date" className={styles.dateInput} title="Data Fim" />
            </div>
          </div>
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={data} 
            columns={getColumns()} 
            loading={loading}
            onView={(item) => alert(`Visualizando ${item.name}`)}
            onEdit={(item) => alert(`Ajustando filtros de ${item.name}`)}
            onDelete={(item) => alert("Relatórios históricos não podem ser excluídos via UI.")}
          />
        </main>

        <footer className={styles.footer}>
          <span>Exibindo métricas consolidadas de {activeCategory}</span>
        </footer>
      </div>
    </MainLayout>
  );
}
