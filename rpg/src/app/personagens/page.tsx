"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useCharacters } from "@/hooks/useCharacters";
import { Character, CharacterStatus } from "@/types/character";
import styles from "./page.module.css";

export default function CharactersPage() {
  const router = useRouter();
  const { characters, loading, filters, setFilters, updateStatus, deleteCharacter } = useCharacters();

  const getStatusBadgeClass = (status: CharacterStatus) => {
    switch (status) {
      case 'Aprovado': return 'badge-success';
      case 'Pendente': return 'badge-warning';
      case 'Reprovado': return 'badge-error';
      case 'Morto': return 'badge-error';
      default: return 'badge-secondary';
    }
  };

  const columns: DataGridColumn<Character>[] = [
    { header: "Nome", accessor: "name" },
    { header: "Jogador", accessor: "userName" },
    { header: "Raça / Classe", accessor: (item) => `${item.race} ${item.class}` },
    { header: "Nível", accessor: (item) => `Nível ${item.level}` },
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
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Personagens" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Personagens</h1>
        </header>

        <CrudToolbar 
          newLabel="Novo Personagem" 
          onNew={() => router.push("/personagens/novo")}
          onExport={() => alert("Exportando personagens...")}
        />

        <section className={styles.filters}>
          <div className={styles.filterGrid}>
            <input 
              type="text" 
              placeholder="Buscar por nome ou jogador..." 
              className={styles.searchInput}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
            
            <div className={styles.tabsFilter}>
              {(['Todos', 'Pendente', 'Aprovado', 'Reprovado'] as const).map(status => (
                <button 
                  key={status}
                  className={`${styles.tabBtn} ${filters.status === status ? styles.activeTab : ''}`}
                  onClick={() => setFilters({ ...filters, status: status })}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={characters} 
            columns={columns} 
            loading={loading}
            onView={(item) => router.push(`/personagens/${item.id}`)}
            onEdit={(item) => router.push(`/personagens/${item.id}/editar`)}
            onDelete={(item) => deleteCharacter(item.id)}
          />
        </main>

        <footer className={styles.footer}>
          <span>Total de {characters.length} personagens encontrados</span>
        </footer>
      </div>
    </MainLayout>
  );
}
