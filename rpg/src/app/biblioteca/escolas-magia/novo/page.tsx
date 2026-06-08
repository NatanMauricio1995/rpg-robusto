"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SpellSchoolForm, { SpellSchoolFormData } from "@/components/Library/SpellSchoolForm/SpellSchoolForm";
import { SpellSchoolService } from "@/services/SpellSchoolService";
import styles from "./page.module.css";

export default function NewSpellSchoolPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SpellSchoolFormData) => {
    setLoading(true);
    setError(null);
    try {
      await SpellSchoolService.saveSchool(data);
      router.push("/biblioteca?category=Escolas de Magia");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar escola de magia";
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
            { label: "Escolas de Magia", href: "/biblioteca?category=Escolas%20de%20Magia" },
            { label: "Nova Escola" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Nova Escola de Magia</h1>
          <p className={styles.subtitle}>Defina uma nova tradição arcana ou divina para o seu mundo.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <SpellSchoolForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
