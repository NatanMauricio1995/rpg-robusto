"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { LanguageService } from "@/services/LanguageService";
import { Language } from "@/types/library";
import styles from "./page.module.css";

export default function LanguageDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await LanguageService.getLanguage(id);
        if (data) {
          setLanguage(data);
        } else {
          setError("Idioma não encontrado");
        }
      } catch {
        setError("Erro ao carregar idioma");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Deseja realmente excluir este idioma?")) {
      try {
        await LanguageService.deleteLanguage(id);
        router.push("/biblioteca?category=Idiomas");
      } catch {
        alert("Erro ao excluir idioma");
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Idioma...</div>
      </MainLayout>
    );
  }

  if (error || !language) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Idioma não encontrado"}</div>
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
            { label: "Idiomas", href: "/biblioteca?category=Idiomas" },
            { label: language.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{language.name}</h1>
            <span className={`${styles.status} ${language.status === 'Ativo' ? styles.active : ''}`}>
              {language.status}
            </span>
          </div>
          <CrudToolbar 
            onEdit={() => router.push(`/biblioteca/idiomas/${id}/editar`)}
            onDelete={handleDelete}
            onExport={() => alert("Exportando...")}
          />
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações Gerais</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Sistema de Escrita (Script)</span>
                <span className={styles.infoValue}>{language.script}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID</span>
                <span className={styles.infoValue}>{language.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Criado em</span>
                <span className={styles.infoValue}>{new Date(language.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.descriptionText}>
              {language.description || "Nenhuma descrição fornecida."}
            </p>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
