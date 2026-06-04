'use client';

import React, { useEffect, useState, use } from 'react';
import partService from '../../../../services/CampaignParticipantService';
import fichaService from '../../../../services/CampanhaPersonagemService';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast 
} from '../../../../components';

/**
 * ParticipantesPage - Gestão de participantes e visualização de fichas integradas
 * Implementação conforme Auditoria de Integração (FC-002, FC-003)
 */
export default function ParticipantesPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await partService.listParticipants(params.id);
      if (res.success) {
        // Busca as fichas de campanha correspondentes para cada participante
        const extendedData = await Promise.all(res.data.map(async (part) => {
          if (part.campanhaPersonagemId) {
            const fichaRes = await fichaService.getSheet(part.campanhaPersonagemId);
            return { ...part, ficha: fichaRes.success ? fichaRes.data : null };
          }
          return { ...part, ficha: null };
        }));
        setList(extendedData);
      } else {
        setError(res.error.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [params.id]);

  if (loading) return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <Loading type="full" label="Carregando dados da mesa..." />
        </ContentContainer>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle 
            title="Participantes e Fichas de Campanha" 
            subtitle="Visão consolidada de todos os heróis da mesa."
          />

          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: '#58111A', color: '#F5F2EB', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>Jogador</th>
                <th style={{ padding: '15px' }}>Personagem</th>
                <th style={{ padding: '15px' }}>Nível / XP</th>
                <th style={{ padding: '15px' }}>❤️ HP / 🛡️ CA</th>
                <th style={{ padding: '15px' }}>🪙 Moedas</th>
                <th style={{ padding: '15px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #D4AF37' }}>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold' }}>{p.usuarioId}</div>
                    <small style={{ color: '#666' }}>Papel: {p.papel}</small>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold', color: '#58111A' }}>{p.ficha?.nome || 'Ficha não encontrada'}</div>
                    <small style={{ color: '#666' }}>{p.ficha?.raca} | {p.ficha?.classe}</small>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div>Nível: {p.ficha?.nivel || 1}</div>
                    <small style={{ color: '#666' }}>XP: {p.ficha?.xp || 0}</small>
                  </td>
                  <td style={{ padding: '15px' }}>
                    <div style={{ fontWeight: 'bold' }}>❤️ {p.ficha?.hpAtual || 0} / {p.ficha?.hpMaximo || 0}</div>
                    <div style={{ fontSize: '13px' }}>🛡️ CA: {p.ficha?.ca || 10}</div>
                  </td>
                  <td style={{ padding: '15px' }}>
                    🪙 {p.ficha?.moedas?.po || 0} PO
                  </td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: p.status === 'ATIVO' ? '#C6F6D5' : '#FED7D7',
                      color: p.status === 'ATIVO' ? '#22543D' : '#822727'
                    }}>{p.status}</span>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
                    Nenhum participante ativo nesta campanha.
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
