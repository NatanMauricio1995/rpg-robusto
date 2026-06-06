"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import styles from "./novo.module.css";

export default function NewWorldPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    system: "D&D 5e",
    status: "Rascunho",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulação de salvamento
    setTimeout(() => {
      alert("Mundo criado com sucesso!");
      router.push("/mundo");
    }, 800);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <Breadcrumb 
          items={[
            { label: "Home", href: "/dashboard" }, 
            { label: "Mundos", href: "/mundo" },
            { label: "Novo Mundo" }
          ]} 
        />

        <header className={styles.header}>
          <h1 className={styles.title}>Novo Mundo</h1>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.grid}>
            <div className={styles.field}>
              <label>Nome do Mundo</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className={styles.field}>
              <label>Sistema de Regras</label>
              <select 
                value={formData.system}
                onChange={e => setFormData({...formData, system: e.target.value})}
              >
                <option value="D&D 5e">D&D 5e</option>
                <option value="Pathfinder 2e">Pathfinder 2e</option>
                <option value="Tormenta20">Tormenta20</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Status Inicial</label>
              <select 
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value as any})}
              >
                <option value="Rascunho">Rascunho</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label>Descrição / Lore Inicial</label>
            <textarea 
              rows={6}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Salvando..." : "Criar Mundo"}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}
