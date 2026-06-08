"use client";

import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import DataGrid, { DataGridColumn } from "@/components/Common/DataGrid/DataGrid";
import { useLibrary } from "@/hooks/useLibrary";
import { LibraryCategory, BaseEntity } from "@/types/library";
import styles from "./page.module.css";

export default function LibraryPage() {
  const router = useRouter();
  const { 
    activeCategory, 
    setActiveCategory, 
    data, 
    loading, 
    searchQuery, 
    setSearchQuery, 
    deleteItem 
  } = useLibrary();

  const categories: LibraryCategory[] = [
    'Idiomas', 'Escolas de Magia', 'Raças', 'Sub-Raças', 'Classes', 'Subclasses', 
    'Habilidades', 'Magias', 'Armas', 'Armaduras', 'Itens', 'Encantamentos', 
    'Receitas', 'NPCs', 'Inimigos'
  ];

  const columns: DataGridColumn<BaseEntity>[] = [
    { header: "Nome", accessor: "name" },
    { 
      header: "Status", 
      accessor: (item: BaseEntity) => (
        <span className={`badge ${item.status === 'Ativo' ? 'badge-success' : 'badge-secondary'}`}>
          {item.status}
        </span>
      ) 
    },
    { header: "Criado em", accessor: "createdAt" },
    { header: "Atualizado em", accessor: "updatedAt" },
  ];

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ /g, "-");
  };

  const getSingularLabel = (category: LibraryCategory) => {
    switch (category) {
      case 'Escolas de Magia': return 'Escola de Magia';
      case 'Idiomas': return 'Idioma';
      case 'Sentidos': return 'Sentido';
      case 'Perícias': return 'Perícia';
      case 'Raças': return 'Raça';
      case 'Sub-Raças': return 'Sub-Raça';
      case 'Classes': return 'Classe';
      case 'Subclasses': return 'Subclasse';
      case 'Habilidades': return 'Habilidade';
      case 'Magias': return 'Magia';
      case 'Armas': return 'Arma';
      case 'Armaduras': return 'Armadura';
      case 'Itens': return 'Item';
      case 'Encantamentos': return 'Encantamento';
      case 'Receitas': return 'Receita';
      case 'NPCs': return 'NPC';
      case 'Inimigos': return 'Inimigo';
      default: return category;
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[{ label: "Home", href: "/dashboard" }, { label: "Biblioteca RPG" }]} />
        
        <header className={styles.header}>
          <h1 className={styles.title}>Biblioteca RPG</h1>
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
          newLabel={`Novo(a) ${getSingularLabel(activeCategory)}`} 
          onNew={() => router.push(`/biblioteca/${slugify(activeCategory)}/novo`)}
          onExport={() => alert("Exportando...")}
        />

        <section className={styles.filters}>
          <input 
            type="text" 
            placeholder={`Filtrar ${activeCategory.toLowerCase()}...`} 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </section>

        <main className={styles.main}>
          <DataGrid 
            data={data} 
            columns={columns} 
            loading={loading}
            onView={(item) => router.push(`/biblioteca/${slugify(activeCategory)}/${item.id}`)}
            onEdit={(item) => router.push(`/biblioteca/${slugify(activeCategory)}/${item.id}/editar`)}
            onDelete={(item) => deleteItem(item.id)}
          />
        </main>

        <footer className={styles.footer}>
          <span>Exibindo {data.length} registros em {activeCategory}</span>
        </footer>
      </div>
    </MainLayout>
  );
}
