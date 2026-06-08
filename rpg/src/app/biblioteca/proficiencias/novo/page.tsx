"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import ProficiencyForm, { ProficiencyFormData } from "@/components/Library/ProficiencyForm/ProficiencyForm";
import { ProficiencyService } from "@/services/ProficiencyService";
import styles from "./page.module.css";

export default function NewProficiencyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProficiencyFormData) => {
    setLoading(true);
    setError(null);
    try {
      await ProficiencyService.saveProficiency(data);
      router.push("/biblioteca?category=Proficiências");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar proficiência";
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
            { label: "Proficiências", href: "/biblioteca?category=Proficiências" },
            { label: "Nova Proficiência" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Nova Proficiência</h1>
          <p className={styles.subtitle}>Cadastre uma nova arma, armadura ou ferramenta que os personagens podem dominar.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <ProficiencyForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
