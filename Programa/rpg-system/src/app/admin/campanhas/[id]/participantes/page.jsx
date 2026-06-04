'use client';

import React, { useEffect, useState, use } from 'react';
import srv from '../../../../services/CampaignParticipantService';
import { useCampaignParticipants } from '../../../../hooks/useCampaignParticipants';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast 
} from '../../../../components';

/**
 * ParticipantesPage - Gestão de participantes ativos e inativos
 */
export default function ParticipantesPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [list, setList] = useState([]);
  const { remove, deactivate, loading, error, setError } = useCampaignParticipants();

  const load = async () => {
    const r = await srv.listParticipants(params.id);
    if (r.success) setList(r.data);
  };

  useEffect(() => { load(); }, [params.id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle title="Participantes da Campanha" subtitle="Gerencie quem faz parte da sua jornada." />

          {loading && <Loading />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                <th style={{ padding: '12px' }}>Usuário</th>
                <th style={{ padding: '12px' }}>Personagem</th>
                <th style={{ padding: '12px' }}>Papel</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {list.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontSize: '13px' }}>{p.usuarioId}</td>
                  <td style={{ padding: '12px' }}>{p.personagemNome || p.personagemId}</td>
                  <td style={{ padding: '12px' }}>{p.papel}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
                      backgroundColor: p.status === 'ATIVO' ? '#C6F6D5' : '#FED7D7'
                    }}>{p.status}</span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      {p.status === 'ATIVO' && (
                        <Button variant="ghost" size="sm" onClick={async () => { await deactivate(p.id); load(); }}>Inativar</Button>
                      )}
                      {p.status !== 'EXPULSO' && (
                        <Button variant="danger" size="sm" onClick={async () => { await remove(p.id); load(); }}>Expulsar</Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ContentContainer>
      </div>
    </div>
  );
}
