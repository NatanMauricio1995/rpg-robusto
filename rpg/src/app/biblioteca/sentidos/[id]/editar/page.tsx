"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SenseForm, { SenseFormData } from "@/components/Library/SenseForm/SenseForm";
import { SenseService } from "@/services/SenseService";
import { Sense } from "@/types/library";
import styles from "./page.module.css";

export default function EditSensePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [sense, setSense] = useState<Sense | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await SenseService.getSense(id);
        if (data) {
          setSense(data);
        } else {
          setError("Sentido não encontrado");
        }
      } catch {
        setError("Erro ao carregar sentido");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (data: SenseFormData) => {
    setSaving(true);
    setError(null);
    try {
      await SenseService.updateSense(id, data);
      router.push("/biblioteca?category=Sentidos");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar sentido";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Sentido...</div>
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
            { label: "Sentidos", href: "/biblioteca?category=Sentidos" },
            { label: sense?.name || "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Sentido</h1>
          {sense && <p className={styles.subtitle}>Ajustando os detalhes de {sense.name}.</p>}
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          {sense && (
            <SenseForm 
              initialData={sense}
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
