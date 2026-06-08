"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SenseForm, { SenseFormData } from "@/components/Library/SenseForm/SenseForm";
import { SenseService } from "@/services/SenseService";
import styles from "./page.module.css";

export default function NewSensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SenseFormData) => {
    setLoading(true);
    setError(null);
    try {
      await SenseService.saveSense(data);
      router.push("/biblioteca?category=Sentidos");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar sentido";
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
            { label: "Sentidos", href: "/biblioteca?category=Sentidos" },
            { label: "Novo Sentido" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Novo Sentido</h1>
          <p className={styles.subtitle}>Adicione uma nova percepção sensorial para as criaturas do seu mundo.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <SenseForm 
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={loading}
          />
        </main>
      </div>
    </MainLayout>
  );
}
