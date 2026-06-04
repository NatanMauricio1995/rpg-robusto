'use client';

import React, { useState } from 'react';
import { usePersonagens } from '../hooks/usePersonagens';
import { 
  Header, 
  Sidebar, 
  ContentContainer, 
  SectionTitle,
  TextBox,
  TextArea,
  Select,
  Button,
  Toast
} from '../components';

/**
 * Página de Criação de Personagem
 * Implementação estrita do Fluxo FP-001
 */
export default function CriarPersonagem() {
  const { criarPersonagem, loading, error } = usePersonagens();
  
  // Estado unificado conforme árvore de passos do FP-001
  const [formData, setFormData] = useState({
    nome: '',
    raca: '',
    subRaca: '',
    classe: '',
    subclasse: '',
    historia: '',
    nivel: 1,
    atributos: {
      forca: 10,
      destreza: 10,
      constituicao: 10,
      inteligencia: 10,
      sabedoria: 10,
      carisma: 10
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: parseInt(value) || 0 }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await criarPersonagem(formData);
    } catch (err) {
      // Erro tratado pelo hook e exibido via toast/alert
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="personagens" />
        <ContentContainer>
          <SectionTitle 
            title="Criar Novo Personagem" 
            subtitle="Siga os passos para dar vida ao seu herói."
          />

          {error && <Toast message={error} type="error" />}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '800px' }}>
            
            {/* Passo 1: Dados Gerais */}
            <fieldset style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <legend style={{ padding: '0 10px', fontWeight: 'bold' }}>1. Dados Gerais</legend>
              <TextBox
                label="Nome do Personagem"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Ex: Valerius, o Bravo"
              />
            </fieldset>

            {/* Passo 2: Raça e Sub-Raça */}
            <fieldset style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <legend style={{ padding: '0 10px', fontWeight: 'bold' }}>2. Origem</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <TextBox
                  label="Raça"
                  name="raca"
                  value={formData.raca}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Humano, Elfo..."
                />
                <TextBox
                  label="Sub-Raça (Opcional)"
                  name="subRaca"
                  value={formData.subRaca}
                  onChange={handleChange}
                  placeholder="Ex: Alto Elfo, Elfo da Floresta..."
                />
              </div>
            </fieldset>

            {/* Passo 3: Classe e Subclasse */}
            <fieldset style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <legend style={{ padding: '0 10px', fontWeight: 'bold' }}>3. Treinamento</legend>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <TextBox
                  label="Classe"
                  name="classe"
                  value={formData.classe}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Guerreiro, Mago..."
                />
                <TextBox
                  label="Subclasse (Opcional)"
                  name="subclasse"
                  value={formData.subclasse}
                  onChange={handleChange}
                  placeholder="Ex: Campeão, Escola de Evocação..."
                />
              </div>
            </fieldset>

            {/* Passo 4: Atributos Base */}
            <fieldset style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <legend style={{ padding: '0 10px', fontWeight: 'bold' }}>4. Atributos</legend>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                <TextBox type="number" label="Força" name="atributos.forca" value={formData.atributos.forca} onChange={handleChange} />
                <TextBox type="number" label="Destreza" name="atributos.destreza" value={formData.atributos.destreza} onChange={handleChange} />
                <TextBox type="number" label="Constituição" name="atributos.constituicao" value={formData.atributos.constituicao} onChange={handleChange} />
                <TextBox type="number" label="Inteligência" name="atributos.inteligencia" value={formData.atributos.inteligencia} onChange={handleChange} />
                <TextBox type="number" label="Sabedoria" name="atributos.sabedoria" value={formData.atributos.sabedoria} onChange={handleChange} />
                <TextBox type="number" label="Carisma" name="atributos.carisma" value={formData.atributos.carisma} onChange={handleChange} />
              </div>
            </fieldset>

            {/* Passo 5: História */}
            <fieldset style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
              <legend style={{ padding: '0 10px', fontWeight: 'bold' }}>5. Narrativa</legend>
              <TextArea
                label="História do Personagem"
                name="historia"
                value={formData.historia}
                onChange={handleChange}
                placeholder="Conte a origem e motivações do seu herói..."
                rows={6}
              />
            </fieldset>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button variant="ghost" type="button" onClick={() => window.history.back()}>Cancelar</Button>
              <Button variant="primary" type="submit" loading={loading}>Finalizar e Enviar para Aprovação</Button>
            </div>
          </form>
        </ContentContainer>
      </div>
    </div>
  );
}
