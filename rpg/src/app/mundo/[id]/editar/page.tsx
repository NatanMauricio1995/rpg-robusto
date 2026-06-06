"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import "@/styles/forms.css";

export default function EditWorldPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "Aethelgard",
    system: "dnd5e",
    status: "Ativo",
    description: "Um mundo de alta fantasia com foco em exploração de ruínas e política imperial.",
    imageUrl: ""
  });

  // TODO: Integrar useWorldDetails(id) para preencher formData

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Mundo atualizado com sucesso!");
      router.push(`/mundo/${id}`);
    }, 800);
  };

  return (
    <MainLayout>
      <div className="container">
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Mundos", href: "/mundo" },
          { label: formData.name, href: `/mundo/${id}` },
          { label: "Editar" }
        ]} />

        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '24px', color: 'var(--stone-900)' }}>Alterar Destino: {formData.name}</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Atualize as crônicas e detalhes fundamentais deste cenário.</p>
        </header>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            <section>
              <h3 className="section-header">Identidade do Cenário</h3>
              <div className="field">
                <label>Nome do Mundo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="field">
                <label>Sistema de Regras</label>
                <select 
                  value={formData.system}
                  onChange={e => setFormData({...formData, system: e.target.value})}
                  required
                >
                  <option value="dnd5e">D&D 5e</option>
                  <option value="pf2">Pathfinder 2e</option>
                  <option value="t20">Tormenta20</option>
                  <option value="custom">Sistema Customizado</option>
                </select>
              </div>
              <div className="field">
                <label>Status do Projeto</label>
                <select 
                  value={formData.status}
                  onChange={e => setFormData({...formData, status: e.target.value as any})}
                  required
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Rascunho">Rascunho</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </section>

            <section>
              <h3 className="section-header">Visual e Lore</h3>
              <div className="field">
                <label>URL da Imagem de Capa</label>
                <input 
                  type="url" 
                  value={formData.imageUrl}
                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                  placeholder="https://link-da-imagem.jpg" 
                />
              </div>
              <div className="field">
                <label>Descrição / Introdução para Jogadores</label>
                <textarea 
                  rows={6} 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>
            </section>
          </div>

          <footer className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Reescrevendo..." : "Salvar Alterações"}
            </button>
          </footer>
        </form>
      </div>
    </MainLayout>
  );
}
