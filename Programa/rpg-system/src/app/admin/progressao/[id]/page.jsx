'use client';

import React, { useEffect, useState, use } from 'react';
import { useProgression } from '../../../../hooks/useProgression';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button, StatCard 
} from '../../../../components';

/**
 * DetalhesProgressaoPage - Painel individual de auditoria de evolução.
 */
export default function DetalhesProgressaoPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { getProgression, refreshProgression, loading, error } = useProgression();
  const [ficha, setFicha] = useState(null);

  const load = async () => {
    const res = await getProgression(params.id);
    if (res.success) setFicha(res.data);
  };

  useEffect(() => { load(); }, [params.id]);

  if (loading && !ficha) return <Loading type="full" />;
  if (!ficha) return <div style={{ padding: '40px', textAlign: 'center' }}>Ficha de evolução não localizada.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <SectionTitle 
            title={`Painel de Evolução: ${ficha.nome}`} 
            subtitle={`${ficha.classe} ${ficha.subclasse ? `(${ficha.subclasse})` : ''}`} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px', marginTop: '25px' }}>
            {/* Coluna 1: Status e Ações */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>Estágio Vital</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <StatCard label="Nível Atual" value={ficha.nivel} />
                  <StatCard label="XP Acumulada" value={ficha.xp} />
                  <StatCard label="HP Máximo" value={ficha.hpMaximo} />
                </div>
                <Button 
                  variant="primary" 
                  style={{ width: '100%', marginTop: '20px' }} 
                  onClick={async () => { await refreshProgression(ficha.id); load(); }}
                  loading={loading}
                >
                  🔄 Forçar Sincronização de Nível
                </Button>
              </div>

              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px', flex: 1 }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>📜 Registro de Marcos</h3>
                <div style={{ maxHeight: '300px', overflowY: 'auto', fontSize: '0.85rem' }}>
                  {ficha.progressionLog?.slice().reverse().map((log, idx) => (
                    <div key={idx} style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px dashed #eee' }}>
                      <div style={{ fontWeight: 'bold', color: '#58111A' }}>Subiu para o Nível {log.nivelNovo}</div>
                      <small style={{ color: '#888' }}>{new Date(log.timestamp).toLocaleDateString()}</small>
                      {log.habilidadesAdquiridas?.length > 0 && (
                        <div style={{ marginTop: '5px' }}>✨ +{log.habilidadesAdquiridas.join(', ')}</div>
                      )}
                      {log.magiasAdquiridas?.length > 0 && (
                        <div style={{ marginTop: '2px' }}>📖 +{log.magiasAdquiridas.join(', ')}</div>
                      )}
                    </div>
                  ))}
                  {(!ficha.progressionLog || ficha.progressionLog.length === 0) && <p style={{ color: '#999' }}>Nenhum marco registrado.</p>}
                </div>
              </div>
            </div>

            {/* Coluna 2: Listagem de Poderes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', borderBottom: '2px solid #D4AF37', paddingBottom: '5px' }}>⚔️ Habilidades ({ficha.habilidadesDesbloqueadas?.length || 0})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                  {ficha.habilidadesDesbloqueadas?.map((h, i) => (
                    <div key={i} style={{ padding: '10px', backgroundColor: '#F5F2EB', borderRadius: '4px', border: '1px solid #eee' }}>
                      <strong>{h.nome}</strong> <br/>
                      <small style={{ color: '#666' }}>Nível {h.nivelDesbloqueio}</small>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', borderBottom: '2px solid #D4AF37', paddingBottom: '5px' }}>🔮 Grimório ({ficha.magiasDesbloqueadas?.length || 0})</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                  {ficha.magiasDesbloqueadas?.map((m, i) => (
                    <div key={i} style={{ padding: '10px', backgroundColor: '#F5F2EB', borderRadius: '4px', border: '1px solid #eee' }}>
                      <strong>{m.nome}</strong> <br/>
                      <small style={{ color: '#666' }}>Nível {m.nivelDesbloqueio}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
