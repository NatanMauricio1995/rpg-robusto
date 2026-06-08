"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { SkillService } from "@/services/SkillService";
import { Skill } from "@/types/library";
import styles from "./page.module.css";

export default function SkillDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await SkillService.getSkill(id);
        if (data) {
          setSkill(data);
        } else {
          setError("Perícia não encontrada");
        }
      } catch {
        setError("Erro ao carregar perícia");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Deseja realmente excluir esta perícia?")) {
      try {
        await SkillService.deleteSkill(id);
        router.push("/biblioteca?category=Perícias");
      } catch {
        alert("Erro ao excluir perícia");
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Perícia...</div>
      </MainLayout>
    );
  }

  if (error || !skill) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Perícia não encontrada"}</div>
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
            { label: "Perícias", href: "/biblioteca?category=Perícias" },
            { label: skill.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{skill.name}</h1>
            <span className={`${styles.status} ${skill.status === 'Ativo' ? styles.active : ''}`}>
              {skill.status}
            </span>
          </div>
          <CrudToolbar 
            onEdit={() => router.push(`/biblioteca/pericias/${id}/editar`)}
            onDelete={handleDelete}
            onExport={() => alert("Exportando...")}
          />
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Informações Gerais</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Atributo Base</span>
                <span className={styles.infoValue}>{skill.attribute}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>ID</span>
                <span className={styles.infoValue}>{skill.id}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Criado em</span>
                <span className={styles.infoValue}>{new Date(skill.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.descriptionText}>
              {skill.description || "Nenhuma descrição fornecida."}
            </p>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
