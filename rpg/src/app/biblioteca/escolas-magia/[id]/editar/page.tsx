"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import SpellSchoolForm, { SpellSchoolFormData } from "@/components/Library/SpellSchoolForm/SpellSchoolForm";
import { SpellSchoolService } from "@/services/SpellSchoolService";
import { SpellSchool } from "@/types/library";
import styles from "./page.module.css";

export default function EditSpellSchoolPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [school, setSchool] = useState<SpellSchool | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await SpellSchoolService.getSchool(id);
        if (data) {
          setSchool(data);
        } else {
          setError("Escola de magia não encontrada");
        }
      } catch {
        setError("Erro ao carregar escola de magia");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleSubmit = async (data: SpellSchoolFormData) => {
    setSaving(true);
    setError(null);
    try {
      await SpellSchoolService.updateSchool(id, data);
      router.push("/biblioteca?category=Escolas de Magia");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao atualizar escola de magia";
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className={styles.loading}>Carregando Escola...</div>
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
            { label: "Escolas de Magia", href: "/biblioteca?category=Escolas%20de%20Magia" },
            { label: school?.name || "Editar" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Editar Escola de Magia</h1>
          {school && <p className={styles.subtitle}>Ajustando os fundamentos de {school.name}.</p>}
        </header>

        {error && <div className={styles.errorBanner}>{error}</div>}

        <main className={styles.main}>
          {school && (
            <SpellSchoolForm 
              initialData={school}
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
