"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import "@/styles/forms.css";

export default function EditCharacterPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "Eldrin Valerius",
    race: "elfo",
    class: "mago",
    level: 12,
    player: "u1"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Ficha atualizada com sucesso!");
      router.push(`/personagens/${id}`);
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="container">
        <Breadcrumb items={[
          { label: "Home", href: "/dashboard" },
          { label: "Personagens", href: "/personagens" },
          { label: formData.name, href: `/personagens/${id}` },
          { label: "Editar" }
        ]} />

        <header style={{ marginBottom: '24px' }}>
          <h1 style={{ fontFamily: 'var(--font-cinzel)', fontSize: '24px', color: 'var(--stone-900)' }}>Reescrever Herói</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>Ajuste os dados e as origens de {formData.name}.</p>
        </header>

        <form className="form-card" onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Coluna 1: Dados Básicos */}
            <section>
              <h3 className="section-header">Dados do Jogador</h3>
              <div className="field">
                <label>Nome do Personagem</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="field">
                <label>Jogador Responsável</label>
                <select 
                  value={formData.player}
                  onChange={e => setFormData({...formData, player: e.target.value})}
                  required
                >
                  <option value="u1">Mestre Arcano</option>
                  <option value="u2">Jogador 1</option>
                </select>
              </div>
            </section>

            {/* Coluna 2: Origens */}
            <section>
              <h3 className="section-header">Origens e Regras</h3>
              <div className="field-group">
                <div className="field">
                  <label>Raça</label>
                  <select 
                    value={formData.race}
                    onChange={e => setFormData({...formData, race: e.target.value})}
                    required
                  >
                    <option value="humano">Humano</option>
                    <option value="elfo">Elfo</option>
                  </select>
                </div>
                <div className="field">
                  <label>Classe</label>
                  <select 
                    value={formData.class}
                    onChange={e => setFormData({...formData, class: e.target.value})}
                    required
                  >
                    <option value="guerreiro">Guerreiro</option>
                    <option value="mago">Mago</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label>Nível</label>
                <input 
                  type="number" 
                  min="1" 
                  max="20" 
                  value={formData.level}
                  onChange={e => setFormData({...formData, level: Number(e.target.value)})}
                />
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
