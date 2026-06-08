"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import WorldForm, { WorldFormData } from "@/components/World/WorldForm/WorldForm";
import { WorldService } from "@/services/WorldService";
import { World } from "@/types/world";
import styles from "./page.module.css";

export default function EditWorldPage() {
  const { id } = useParams();
  const router = useRouter();
  const [world, setWorld] = useState<World | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await WorldService.getWorld(id as string);
        if (data) {
          setWorld(data);
        } else {
          setError("Mundo não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar mundo");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (data: WorldFormData) => {
    setSaving(true);
    setError(null);
    try {
      await WorldService.updateWorld(id as string, data);
      router.push(`/mundo/${id}`);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao salvar mundo";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Mundo...</div>
      </MainLayout>
    );
  }

  if (error || !world) {
    return (
      <MainLayout>
        <div className={styles.errorBanner}>{error || "Mundo não encontrado"}</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Mundos", href: "/mundo" },
          { label: world.name, href: `/mundo/${id}` },
          { label: "Editar" }
        ]} />

        <header className={styles.header}>
          <h1 className={styles.title}>Alterar Destino: {world.name}</h1>
          <p className={styles.subtitle}>Atualize as crônicas e detalhes fundamentais deste cenário.</p>
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          <WorldForm 
            initialData={world}
            onSubmit={handleSubmit} 
            onCancel={() => router.back()} 
            loading={saving}
          />
        </main>
      </div>
    </MainLayout>
  );
}
