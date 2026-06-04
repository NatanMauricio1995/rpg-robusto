'use client';

import React, { useEffect, useState } from 'react';
import { useLoot } from '../../../hooks/useLoot';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast 
} from '../../../components';

/**
 * ListagemLootsPage - Página administrativa de saques da campanha
 */
export default function ListagemLootsPage() {
  const { listCampaignLoots, loading, error } = useLoot();
  const [loots, setLoots] = useState([]);

  // Nota: CampanhaID deve vir do contexto ou rota pai
  const campaignId = 'GLOBAL_TEST';

  const loadData = async () => {
    const r = await listCampaignLoots(campaignId);
    if (r.success) setLoots(r.data);
  };

  useEffect(() => { loadData(); }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <SectionTitle 
            title="Gerenciador de Saques (Loot)" 
            subtitle="Controle a distribuição de espólios e recompensas de guerra." 
          />

          {loading && <Loading type="full" />}
          {error && <Toast message={error.message} type="error" />}

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#58111A', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>ID do Combate</th>
                <th style={{ padding: '15px' }}>Status</th>
                <th style={{ padding: '15px' }}>Itens Disponíveis</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {loots.map(l => (
                <tr key={l.id} style={{ borderBottom: '1px solid #D4AF37' }}>
                  <td style={{ padding: '15px' }}>{l.combatId}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: l.status === 'PENDENTE' ? '#FEEBC8' : '#E2E8F0'
                    }}>{l.status}</span>
                  </td>
                  <td style={{ padding: '15px' }}>{l.generatedLoot?.length || 0} tipos de item</td>
                  <td style={{ padding: '15px' }}>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/loot/${l.id}`}>Gerenciar Baú</Button>
                  </td>
                </tr>
              ))}
              {loots.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                    Nenhum lote de loot gerado até o momento.
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
