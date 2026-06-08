"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { ProficiencyService } from "@/services/ProficiencyService";
import { Proficiency } from "@/types/library";
import styles from "./page.module.css";

export default function ProficiencyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [proficiency, setProficiency] = useState<Proficiency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await ProficiencyService.getProficiency(id);
        if (data) {
          setProficiency(data);
        } else {
          setError("Proficiência não encontrada");
        }
      } catch {
        setError("Erro ao carregar proficiência");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Deseja realmente excluir esta proficiência?")) {
      try {
        await ProficiencyService.deleteProficiency(id);
        router.push("/biblioteca?category=Proficiências");
      } catch {
        alert("Erro ao excluir proficiência");
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Proficiência...</div>
      </MainLayout>
    );
  }

  if (error || !proficiency) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Proficiência não encontrada"}</div>
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
            { label: "Proficiências", href: "/biblioteca?category=Proficiências" },
            { label: proficiency.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{proficiency.name}</h1>
            <span className={`${styles.status} ${proficiency.status === 'Ativo' ? styles.active : ''}`}>
              {proficiency.status}
            </span>
          </div>
          <CrudToolbar 
            onEdit={() => router.push(`/biblioteca/proficiencias/${id}/editar`)}
            onDelete={handleDelete}
            onExport={() => alert("Exportando...")}
          />
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações Gerais</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Tipo</span>
                <span className={styles.infoValue}>{proficiency.type}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID</span>
                <span className={styles.infoValue}>{proficiency.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Criado em</span>
                <span className={styles.infoValue}>{new Date(proficiency.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.descriptionText}>
              {proficiency.description || "Nenhuma descrição fornecida."}
            </p>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
