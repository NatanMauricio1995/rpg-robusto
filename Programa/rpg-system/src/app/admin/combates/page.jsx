'use client';

import React, { useEffect, useState } from 'react';
import combatService from '../../../services/CombatService';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast 
} from '../../../components';

/**
 * ListagemCombatesPage - Página administrativa de combates da campanha
 */
export default function ListagemCombatesPage() {
  const [combats, setCombats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Nota: O ID da campanha deveria vir do contexto ou query param
  const campaignId = 'GLOBAL_TEST'; 

  const loadData = async () => {
    setLoading(true);
    const r = await combatService.listCombats(campaignId);
    if (r.success) setCombats(r.data);
    else setError(r.error.message);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <SectionTitle title="Combates da Campanha" subtitle="Gerencie os encontros táticos da sua mesa." />

          {loading && <Loading type="full" />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#58111A', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>Nome</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Rodada</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {combats.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #D4AF37' }}>
                  <td style={{ padding: '15px' }}>{c.nome}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: c.status === 'ATIVO' ? '#C6F6D5' : c.status === 'PREPARACAO' ? '#FEEBC8' : '#E2E8F0'
                    }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '15px' }}>{c.rodadaAtual}</td>
                  <td style={{ padding: '15px' }}>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/combates/${c.id}`}>Abrir Painel</Button>
                  </td>
                </tr>
              ))}
              {combats.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                    Nenhum combate registrado para esta campanha.
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
