"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import BackgroundForm, { BackgroundFormData } from "@/components/Library/BackgroundForm/BackgroundForm";
import { BackgroundService } from "@/services/BackgroundService";
import { Background } from "@/types/library";
import styles from "./page.module.css";

export default function EditBackgroundPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [background, setBackground] = useState<Background | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await BackgroundService.getBackground(id);
        if (data) {
          setBackground(data);
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

  const handleSubmit = async (data: BackgroundFormData) => {
    setSaving(true);
    setError(null);
    try {
      await BackgroundService.updateBackground(id, data);
      router.push(`/biblioteca/antecedentes/${id}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar antecedente";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Antecedente...</div>
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
            { label: "Antecedentes", href: "/biblioteca?category=Antecedentes" },
            { label: background?.name || "Editar", href: `/biblioteca/antecedentes/${id}` },
            { label: "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Antecedente</h1>
          <p className={styles.subtitle}>Atualize os detalhes do antecedente.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <BackgroundForm 
            initialData={background || undefined}
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={saving}
          />
        </main>
      </div>
    </MainLayout>
  );
}
