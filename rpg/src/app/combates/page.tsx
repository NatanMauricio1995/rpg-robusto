"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useCombatList } from "@/hooks/useCombatList";
import { Combat } from "@/types/combat";
import styles from "./page.module.css";

export default function CombatListPage() {
  const router = useRouter();
  const { combats, loading, filters, setFilters, deleteCombat } = useCombatList();

  const columns: DataGridColumn<Combat>[] = [
    { header: "Encontro", accessor: "name" },
    { header: "Campanha", accessor: "campaignName" },
    { header: "Local", accessor: "location" },
    { header: "XP Total", accessor: (item) => `${item.totalXP} XP` },
    { 
      header: "Status", 
      accessor: (item) => (
        <span className={`badge ${item.status === 'Ativo' ? 'badge-success' : 'badge-secondary'}`}>
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
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Combates" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Gerenciamento de Combates</h1>
        </header>

        <CrudToolbar 
          newLabel="Novo Combate" 
          onNew={() => router.push("/combates/novo")}
          onExport={() => alert("Exportando log de combates...")}
        />

        <section className={styles.filters}>
          <div className={styles.filterGrid}>
            <input 
              type="text" 
              placeholder="Buscar por encontro ou campanha..." 
              className={styles.searchInput}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            
            <div className={styles.tabsFilter}>
              {['Todos', 'Ativo', 'Encerrado', 'Pausado'].map(status => (
                <button 
                  key={status}
                  className={`${styles.tabBtn} ${filters.status === status ? styles.activeTab : ''}`}
                  onClick={() => setFilters({ ...filters, status: status as any })}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={combats} 
            columns={columns} 
            loading={loading}
            onView={(item) => router.push(`/combates/${item.id}`)}
            onEdit={(item) => router.push(`/combates/${item.id}/editar`)}
            onDelete={(item) => deleteCombat(item.id)}
          />
        </main>

        <footer className={styles.footer}>
          <span>Histórico de {combats.length} combates registrados</span>
        </footer>
      </div>
    </MainLayout>
  );
}
