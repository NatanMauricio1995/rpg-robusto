"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SkillForm, { SkillFormData } from "@/components/Library/SkillForm/SkillForm";
import { SkillService } from "@/services/SkillService";
import { Skill } from "@/types/library";
import styles from "./page.module.css";

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (data: SkillFormData) => {
    setSaving(true);
    setError(null);
    try {
      await SkillService.updateSkill(id, data);
      router.push("/biblioteca?category=Perícias");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar perícia";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Perícia...</div>
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
            { label: skill?.name || "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Perícia</h1>
          {skill && <p className={styles.subtitle}>Ajustando os detalhes de {skill.name}.</p>}
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          {skill && (
            <SkillForm 
              initialData={skill}
              onSubmit={handleSubmit} 
              onCancel={() => router.back()} 
              loading={saving}
            />
          )}
        </main>
      </div>
    </MainLayout>
  );
}
