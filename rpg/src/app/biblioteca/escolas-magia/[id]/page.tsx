"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { SpellSchoolService } from "@/services/SpellSchoolService";
import { SpellSchool } from "@/types/library";
import styles from "./page.module.css";

export default function SpellSchoolDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [school, setSchool] = useState<SpellSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await SpellSchoolService.getSchool(id);
        if (data) {
          setSchool(data);
        } else {
          setError("Escola de magia não encontrada");
        }
      } catch {
        setError("Erro ao carregar escola de magia");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Deseja realmente excluir esta escola de magia?")) {
      try {
        await SpellSchoolService.deleteSchool(id);
        router.push("/biblioteca?category=Escolas de Magia");
      } catch {
        alert("Erro ao excluir escola de magia");
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Escola...</div>
      </MainLayout>
    );
  }

  if (error || !school) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Escola não encontrada"}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Biblioteca RPG", href: "/biblioteca" },
            { label: "Escolas de Magia", href: "/biblioteca?category=Escolas%20de%20Magia" },
            { label: school.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{school.name}</h1>
            <span className={`${styles.status} ${school.status === 'Ativo' ? styles.active : ''}`}>
              {school.status}
            </span>
          </div>
          <CrudToolbar 
            onEdit={() => router.push(`/biblioteca/escolas-magia/${id}/editar`)}
            onDelete={handleDelete}
            onExport={() => alert("Exportando...")}
          />
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações Gerais</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID</span>
                <span className={styles.infoValue}>{school.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Criado em</span>
                <span className={styles.infoValue}>{new Date(school.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.descriptionText}>
              {school.description || "Nenhuma descrição fornecida."}
            </p>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
