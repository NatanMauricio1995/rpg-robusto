"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import BackgroundForm, { BackgroundFormData } from "@/components/Library/BackgroundForm/BackgroundForm";
import { BackgroundService } from "@/services/BackgroundService";
import styles from "./page.module.css";

export default function NewBackgroundPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: BackgroundFormData) => {
    setLoading(true);
    setError(null);
    try {
      await BackgroundService.saveBackground(data);
      router.push("/biblioteca?category=Antecedentes");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar antecedente";
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
            { label: "Antecedentes", href: "/biblioteca?category=Antecedentes" },
            { label: "Novo Antecedente" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Novo Antecedente</h1>
          <p className={styles.subtitle}>Defina a origem e história prévia dos personagens.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <BackgroundForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
