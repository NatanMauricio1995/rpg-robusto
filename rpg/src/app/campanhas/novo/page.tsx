"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import "@/styles/forms.css";

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push('/campanhas'), 1000);
  };

  return (
    <MainLayout>
      <div className="container">
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Campanhas", href: "/campanhas" },
          { label: "Nova Campanha" }
        ]} />

        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '24px', color: 'var(--stone-900)' }}>Nova Crônica</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Inicie uma nova mesa de jogo e reuna seus aventureiros.</p>
        </header>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Coluna 1: Configurações da Mesa */}
            <section>
              <h3 className="section-header">Configurações da Mesa</h3>
              <div className="field">
                <label>Título da Campanha</label>
                <input type="text" placeholder="Ex: Sombras sobre o Império" required />
              </div>
              <div className="field">
                <label>Mundo Vinculado</label>
                <select required>
                  <option value="">Selecione um mundo...</option>
                  <option value="w1">Aethelgard</option>
                  <option value="w2">Ravnica</option>
                </select>
              </div>
              <div className="field-group">
                <div className="field">
                  <label>Limite de Jogadores</label>
                  <input type="number" min="1" max="10" defaultValue="4" />
                </div>
                <div className="field">
                  <label>Status Inicial</label>
                  <select>
                    <option value="Recrutando">Recrutando</option>
                    <option value="Ativa">Ativa (Iniciada)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Coluna 2: Planejamento */}
            <section>
              <h3 className="section-header">Planejamento e Diário</h3>
              <div className="field">
                <label>Frequência das Sessões</label>
                <input type="text" placeholder="Ex: Semanal, às Sextas 20h" />
              </div>
              <div className="field">
                <label>Sinopse Secreta (Mestre)</label>
                <textarea rows={6} placeholder="Objetivos reais, plot twists iniciais e segredos dos deuses..."></textarea>
              </div>
            </section>
          </div>

          <footer className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Ecrevendo Pergaminho..." : "Abrir Mesa"}
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
}
