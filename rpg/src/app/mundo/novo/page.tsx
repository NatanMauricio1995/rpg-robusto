"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import "@/styles/forms.css";

export default function NewWorldPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/mundo'), 1000);
  };

  return (
    <MainLayout>
      <div className="container">
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Mundos", href: "/mundo" },
          { label: "Novo Mundo" }
        ]} />

        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '24px', color: 'var(--stone-900)' }}>Invocação de Mundo</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Estabeleça as fundações de um novo cenário épico.</p>
        </header>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Coluna 1: Identidade */}
            <section>
              <h3 className="section-header">Identidade do Cenário</h3>
              <div className="field">
                <label>Nome do Mundo</label>
                <input type="text" placeholder="Ex: Aethelgard" required />
              </div>
              <div className="field">
                <label>Sistema de Regras</label>
                <select required>
                  <option value="dnd5e">D&D 5e</option>
                  <option value="pf2">Pathfinder 2e</option>
                  <option value="t20">Tormenta20</option>
                  <option value="custom">Sistema Customizado</option>
                </select>
              </div>
              <div className="field">
                <label>Status do Projeto</label>
                <select required>
                  <option value="Ativo">Ativo (Pronto para jogo)</option>
                  <option value="Rascunho">Rascunho (Em construção)</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </section>

            {/* Coluna 2: Detalhes Visuais e Lore */}
            <section>
              <h3 className="section-header">Visual e Lore Inicial</h3>
              <div className="field">
                <label>URL da Imagem de Capa</label>
                <input type="url" placeholder="https://link-da-imagem.jpg" />
              </div>
              <div className="field">
                <label>Descrição / Introdução para Jogadores</label>
                <textarea rows={6} placeholder="Descreva brevemente o clima e as regras fundamentais deste mundo..."></textarea>
              </div>
            </section>
          </div>

          <footer className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Materializando..." : "Criar Mundo"}
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
}
