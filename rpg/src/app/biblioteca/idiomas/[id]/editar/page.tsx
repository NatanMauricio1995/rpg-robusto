"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LanguageForm, { LanguageFormData } from "@/components/Library/LanguageForm/LanguageForm";
import { LanguageService } from "@/services/LanguageService";
import { Language } from "@/types/library";
import styles from "./page.module.css";

export default function EditLanguagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [language, setLanguage] = useState<Language | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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

  const handleSubmit = async (data: LanguageFormData) => {
    setSaving(true);
    setError(null);
    try {
      await LanguageService.updateLanguage(id, data);
      router.push("/biblioteca?category=Idiomas");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar idioma";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Idioma...</div>
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
            { label: language?.name || "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Idioma</h1>
          {language && <p className={styles.subtitle}>Ajustando os registros de {language.name}.</p>}
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          {language && (
            <LanguageForm 
              initialData={language}
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
