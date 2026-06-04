'use client';

import React, { useState, useEffect } from 'react';
import personagemService from '../services/PersonagemService';
import personagemRepository from '../repositories/PersonagemRepository';
import { 
  Header, 
  Sidebar, 
  ContentContainer, 
  SectionTitle,
  Button,
  Toast,
  Loading
} from '../components';

/**
 * AdminPersonagens - Painel Administrativo de Personagens
 * Implementação dos fluxos FP-002 (Aprovação) e FP-003 (Alteração/Reaprovação)
 * Conforme RN-031 e Regras de Segurança
 */
export default function AdminPersonagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  /**
   * Carrega a listagem de todos os personagens para administração
   */
  const fetchData = async () => {
    setLoading(true);
    try {
      // Utiliza o repositório para listagem administrativa (Cap. 4 Arq. BackEnd)
      const data = await personagemRepository.findAll('createdAt', 'desc');
      setPersonagens(data);
    } catch (error) {
      setToast({ message: 'Erro ao carregar personagens: ' + error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Fluxo FP-002: Aprovação de Personagem
   */
  const handleAprovar = async (id) => {
    try {
      setLoading(true);
      await personagemService.approveCharacter(id);
      setToast({ message: 'Personagem aprovado com sucesso!', type: 'success' });
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fluxo FP-002: Rejeição de Personagem
   */
  const handleReprovar = async (id) => {
    const motivo = window.prompt('Informe o motivo da reprovação/ajuste:');
    if (!motivo) return;

    try {
      setLoading(true);
      await personagemService.rejectCharacter(id, motivo);
      setToast({ message: 'Personagem reprovado e notificado.', type: 'success' });
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fluxo FP-003: Alteração Pós-Aprovação / Solicitação de Revisão
   * RN-031: Alterar um personagem aprovado reverte seu status para PENDENTE.
   */
  const handleReenviarAprovacao = async (id) => {
    try {
      setLoading(true);
      const character = personagens.find(p => p.id === id);
      
      // Chamada ao Service que aplica a RN-031 internamente
      await personagemService.updateCharacter(id, { ...character });
      
      setToast({ message: 'Personagem reenviado para a fila de aprovação.', type: 'success' });
      fetchData();
    } catch (error) {
      setToast({ message: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle 
            title="Administração de Personagens" 
            subtitle="Painel do Mestre para aprovação e controle de fichas."
          />

          {loading && <Loading type="full" label="Carregando..." />}
          {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ textAlign: 'left', backgroundColor: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '15px' }}>Personagem</th>
                <th style={{ padding: '15px' }}>Status Atual</th>
                <th style={{ padding: '15px' }}>Dono (UID)</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {personagens.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>
                    <strong>{p.nome}</strong>
                    <div style={{ fontSize: '12px', color: '#666' }}>{p.raca} / {p.classe}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: p.status === 'Aprovado' ? '#C6F6D5' : p.status === 'Reprovado' ? '#FED7D7' : '#FEEBC8',
                      color: p.status === 'Aprovado' ? '#22543D' : p.status === 'Reprovado' ? '#822727' : '#744210'
                    }}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px', fontSize: '12px', color: '#888' }}>{p.userId}</td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {p.status === 'Pendente' && (
                        <>
                          <Button variant="primary" size="sm" onClick={() => handleAprovar(p.id)}>Aprovar</Button>
                          <Button variant="danger" size="sm" onClick={() => handleReprovar(p.id)}>Reprovar</Button>
                        </>
                      )}
                      {(p.status === 'Aprovado' || p.status === 'Reprovado') && (
                        <Button variant="ghost" size="sm" onClick={() => handleReenviarAprovacao(p.id)}>Forçar Revisão</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {personagens.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                    Nenhum personagem encontrado para administração.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </ContentContainer>
      </div>
    </div>
  );
}
