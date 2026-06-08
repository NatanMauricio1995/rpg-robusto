"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LanguageForm, { LanguageFormData } from "@/components/Library/LanguageForm/LanguageForm";
import { LanguageService } from "@/services/LanguageService";
import styles from "./page.module.css";

export default function NewLanguagePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: LanguageFormData) => {
    setLoading(true);
    setError(null);
    try {
      await LanguageService.saveLanguage(data);
      router.push("/biblioteca?category=Idiomas");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar idioma";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Biblioteca RPG", href: "/biblioteca" },
            { label: "Idiomas", href: "/biblioteca?category=Idiomas" },
            { label: "Novo Idioma" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Novo Idioma</h1>
          <p className={styles.subtitle}>Cadastre um novo sistema de comunicação para o seu mundo.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <LanguageForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
