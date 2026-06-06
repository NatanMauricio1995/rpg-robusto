"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useWorld } from "@/hooks/useWorld";
import { World } from "@/types/world";
import styles from "./page.module.css";

export default function WorldListPage() {
  const router = useRouter();
  const { worlds, loading, searchQuery, setSearchQuery, deleteWorld, duplicateWorld } = useWorld();

  const columns: DataGridColumn<World>[] = [
    { header: "Nome", accessor: "name" },
    { header: "Sistema", accessor: "system" },
    { 
      header: "Status", 
      accessor: (item) => (
        <span className={`badge ${getStatusClass(item.status)}`}>
          {item.status}
        </span>
      ) 
    },
    { header: "Criado em", accessor: "createdAt" },
    { header: "Atualizado em", accessor: "updatedAt" },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Ativo': return 'badge-success';
      case 'Inativo': return 'badge-warning';
      case 'Rascunho': return 'badge-secondary';
      default: return '';
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Mundos" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Mundos</h1>
        </header>

        <CrudToolbar 
          newLabel="Novo Mundo" 
          onNew={() => router.push("/mundo/novo")}
          onExport={() => alert("Exportando dados...")}
        />

        <section className={styles.filters}>
          <input 
            type="text" 
            placeholder="Filtrar por nome ou sistema..." 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={worlds} 
            columns={columns} 
            loading={loading}
            onView={(item) => router.push(`/mundo/${item.id}`)}
            onEdit={(item) => router.push(`/mundo/${item.id}/editar`)}
            onDelete={(item) => deleteWorld(item.id)}
          />
        </main>

        <footer className={styles.footer}>
          <span>Exibindo {worlds.length} registros</span>
        </footer>
      </div>
    </MainLayout>
  );
}
