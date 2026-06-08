"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SkillForm, { SkillFormData } from "@/components/Library/SkillForm/SkillForm";
import { SkillService } from "@/services/SkillService";
import styles from "./page.module.css";

export default function NewSkillPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SkillFormData) => {
    setLoading(true);
    setError(null);
    try {
      await SkillService.saveSkill(data);
      router.push("/biblioteca?category=Perícias");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar perícia";
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
            { label: "Perícias", href: "/biblioteca?category=Perícias" },
            { label: "Nova Perícia" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Nova Perícia</h1>
          <p className={styles.subtitle}>Defina uma nova habilidade treinável para os personagens.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <SkillForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
