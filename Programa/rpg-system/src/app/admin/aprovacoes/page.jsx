'use client';

import React, { useEffect, useState } from 'react';
import { useApproval } from '../../../hooks/useApproval';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button 
} from '../../../components';

/**
 * PainelWorkflowAprovacoesPage - Lista geral de transições de governança.
 */
export default function PainelWorkflowAprovacoesPage() {
  const { getHistory, loading, error } = useApproval();
  const [historicos, setHistoricos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('');

  const loadData = async () => {
    const res = await getHistory();
    if (res.success) setHistoricos(res.data);
  };

  useEffect(() => { loadData(); }, []);

  const filtered = historicos.filter(h => !filtroTipo || h.entityType === filtroTipo);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle 
            title="Centro de Governança e Validação" 
            subtitle="Controle centralizado de aprovações de conteúdo da mesa." 
          />

          {error && <Toast message={error.message} type="error" />}

          <div style={{ margin: '20px 0', display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Filtrar Módulo:</span>
            <select 
              value={filtroTipo} 
              onChange={e => setFiltroTipo(e.target.value)}
              style={{ padding: '8px', border: '1px solid #D4AF37', borderRadius: '4px', background: '#fff' }}
            >
              <option value="">Todos os Módulos</option>
              <option value="Personagem">Personagens</option>
              <option value="Campanha">Campanhas</option>
              <option value="NPC">NPCs</option>
              <option value="Inimigo">Inimigos</option>
              <option value="Item">Itens / Equipamentos</option>
            </select>
            <Button variant="ghost" size="sm" onClick={loadData}>🔄 Atualizar</Button>
          </div>

          {loading ? (
            <Loading type="full" label="Interrogando workflow de governança..." />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ background: '#58111A', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '15px' }}>Entidade</th>
                  <th style={{ padding: '15px' }}>Transição</th>
                  <th style={{ padding: '15px' }}>Responsável</th>
                  <th style={{ padding: '15px' }}>Data</th>
                  <th style={{ padding: '15px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(h => (
                  <tr key={h.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>
                      <strong>{h.entityType}</strong>
                      <br/><code style={{ fontSize: '10px', color: '#888' }}>{h.entityId}</code>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ color: '#888' }}>{h.statusAnterior}</span>
                      <span style={{ margin: '0 10px' }}>→</span>
                      <span style={{ 
                        fontWeight: 'bold', 
                        color: h.statusNovo === 'APROVADO' ? '#2e7d32' : h.statusNovo === 'REPROVADO' ? '#c62828' : '#ff9800' 
                      }}>{h.statusNovo}</span>
                    </td>
                    <td style={{ padding: '15px' }}>{h.usuarioResponsavel}</td>
                    <td style={{ padding: '15px', fontSize: '0.85rem' }}>{new Date(h.createdAt).toLocaleString()}</td>
                    <td style={{ padding: '15px' }}>
                      <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/aprovacoes/${h.entityType}_${h.entityId}`}>🛡️ Linha do Tempo</Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>Nenhum registro de governança encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
