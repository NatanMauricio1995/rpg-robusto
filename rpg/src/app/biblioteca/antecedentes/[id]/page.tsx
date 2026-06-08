"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import CrudToolbar from "@/components/Common/CrudToolbar/CrudToolbar";
import { BackgroundService } from "@/services/BackgroundService";
import { Background, Skill, Language, Proficiency } from "@/types/library";
import { SkillService } from "@/services/SkillService";
import { LanguageService } from "@/services/LanguageService";
import { ProficiencyService } from "@/services/ProficiencyService";
import styles from "./page.module.css";

export default function BackgroundDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [background, setBackground] = useState<Background | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [tools, setTools] = useState<Proficiency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [bgData, allSkills, allLangs, allProfs] = await Promise.all([
          BackgroundService.getBackground(id),
          SkillService.listSkills(),
          LanguageService.listLanguages(),
          ProficiencyService.listProficiencies()
        ]);

        if (bgData) {
          setBackground(bgData);
          setSkills(allSkills);
          setLanguages(allLangs);
          setTools(allProfs);
        } else {
          setError("Antecedente não encontrado");
        }
      } catch {
        setError("Erro ao carregar antecedente");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Deseja realmente excluir este antecedente?")) {
      try {
        await BackgroundService.deleteBackground(id);
        router.push("/biblioteca?category=Antecedentes");
      } catch {
        alert("Erro ao excluir antecedente");
      }
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Antecedente...</div>
      </MainLayout>
    );
  }

  if (error || !background) {
    return (
      <MainLayout>
        <div className={styles.error}>{error || "Antecedente não encontrado"}</div>
      </MainLayout>
    );
  }

  const getSkillNames = () => {
    return background.skillProficiencies
      .map(sid => skills.find(s => s.id === sid)?.name)
      .filter(Boolean)
      .join(", ") || "Nenhuma";
  };

  const getLanguageNames = () => {
    return background.languageProficiencies
      .map(lid => languages.find(l => l.id === lid)?.name)
      .filter(Boolean)
      .join(", ") || "Nenhum";
  };

  const getToolNames = () => {
    return background.toolProficiencies
      .map(tid => tools.find(t => t.id === tid)?.name)
      .filter(Boolean)
      .join(", ") || "Nenhuma";
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Biblioteca RPG", href: "/biblioteca" },
            { label: "Antecedentes", href: "/biblioteca?category=Antecedentes" },
            { label: background.name }
          ]} 
        />

        <header className={styles.header}>
          <div className={styles.titleArea}>
            <h1 className={styles.title}>{background.name}</h1>
            <span className={`${styles.status} ${background.status === 'Ativo' ? styles.active : ''}`}>
              {background.status}
            </span>
          </div>
          <CrudToolbar 
            onEdit={() => router.push(`/biblioteca/antecedentes/${id}/editar`)}
            onDelete={handleDelete}
            onExport={() => alert("Exportando...")}
          />
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Descrição</h2>
            <p className={styles.descriptionText}>
              {background.description || "Nenhuma descrição fornecida."}
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Proficiências e Idiomas</h2>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Perícias</span>
                <span className={styles.infoValue}>{getSkillNames()}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Idiomas</span>
                <span className={styles.infoValue}>{getLanguageNames()}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Ferramentas</span>
                <span className={styles.infoValue}>{getToolNames()}</span>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Característica: {background.featureName}</h2>
            <p className={styles.descriptionText}>{background.featureDescription}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Equipamento Inicial</h2>
            <p className={styles.descriptionText}>{background.equipmentDescription || "Nenhum especificado."}</p>
          </section>
        </main>
      </div>
    </MainLayout>
  );
}
