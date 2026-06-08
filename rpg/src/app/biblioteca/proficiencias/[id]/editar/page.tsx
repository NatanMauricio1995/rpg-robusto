"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import ProficiencyForm, { ProficiencyFormData } from "@/components/Library/ProficiencyForm/ProficiencyForm";
import { ProficiencyService } from "@/services/ProficiencyService";
import { Proficiency } from "@/types/library";
import styles from "./page.module.css";

export default function EditProficiencyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [proficiency, setProficiency] = useState<Proficiency | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (data: ProficiencyFormData) => {
    setSaving(true);
    setError(null);
    try {
      await ProficiencyService.updateProficiency(id, data);
      router.push(`/biblioteca/proficiencias/${id}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar proficiência";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Proficiência...</div>
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
            { label: proficiency?.name || "Editar", href: `/biblioteca/proficiencias/${id}` },
            { label: "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Proficiência</h1>
          <p className={styles.subtitle}>Atualize os detalhes da proficiência.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <ProficiencyForm 
            initialData={proficiency || undefined}
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={saving}
          />
        </main>
      </div>
    </MainLayout>
  );
}
