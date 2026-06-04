'use client';

import React, { useEffect, useState, use } from 'react';
import { useCombat } from '../../../../hooks/useCombat';
import combatService from '../../../../services/CombatService';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast 
} from '../../../../components';

/**
 * ArenaCombatePage - Painel Tático de Combate (Arena)
 */
export default function ArenaCombatePage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [c, setCombat] = useState(null);
  const { startCombat, endCombat, applyDamage, applyHealing, loading, error } = useCombat();

  const load = async () => {
    const r = await combatService.getCombat(params.id);
    if (r.success) setCombat(r.data);
  };

  useEffect(() => { load(); }, [params.id]);

  if (!c && loading) return <Loading type="full" />;
  if (!c) return <div style={{ padding: '40px', textAlign: 'center' }}>Combate não localizado.</div>;

  const participantsOrdered = [...c.participantes, ...c.inimigos].sort((a, b) => b.iniciativa - a.iniciativa);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <header style={{ borderBottom: '2px solid #D4AF37', paddingBottom: '10px', marginBottom: '20px' }}>
            <SectionTitle 
              title={`Arena: ${c.nome}`} 
              subtitle={`Status: ${c.status} | Rodada: ${c.rodadaAtual}`} 
            />
            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
              {c.status === 'PREPARACAO' && (
                <Button variant="primary" onClick={async () => { await startCombat(c.id); load(); }}>⚔️ Iniciar Combate</Button>
              )}
              {c.status === 'ATIVO' && (
                <Button variant="danger" onClick={async () => { await endCombat(c.id); load(); }}>🛑 Finalizar Combate</Button>
              )}
            </div>
          </header>

          {error && <Toast message={error.message || "Erro no combate"} type="error" />}

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '30px' }}>
            {/* Coluna 1: Participantes e Ações */}
            <div>
              <h3>Ordem de Turno</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                {participantsOrdered.map(p => (
                  <div key={p.campanhaPersonagemId || p.snapshotId} style={{ 
                    padding: '20px', 
                    background: '#fff', 
                    border: '1px solid #D4AF37', 
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <strong>{p.nome} <small>({p.tipo})</small></strong>
                      <span style={{ fontWeight: 'bold', color: '#58111A' }}>Iniciativa: {p.iniciativa}</span>
                    </div>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <div style={{ fontSize: '13px', marginBottom: '5px' }}>HP: {p.hpAtual} / {p.hpMaximo} | 🛡️ CA: {p.ca}</div>
                      <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ 
                          width: `${(p.hpAtual / p.hpMaximo) * 100}%`, 
                          height: '100%', 
                          background: p.hpAtual < p.hpMaximo * 0.3 ? '#e53e3e' : '#38a169',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                    </div>

                    {c.status === 'ATIVO' && (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="danger" size="sm" onClick={async () => { 
                          await applyDamage(c.id, { 
                            targetId: p.campanhaPersonagemId || p.snapshotId, 
                            damage: 5, 
                            sourceId: 'Mestre', 
                            description: 'Dano manual' 
                          }); 
                          load(); 
                        }}>💥 -5 HP</Button>
                        <Button variant="ghost" size="sm" onClick={async () => { 
                          await applyHealing(c.id, { 
                            targetId: p.campanhaPersonagemId || p.snapshotId, 
                            healing: 5, 
                            sourceId: 'Mestre', 
                            description: 'Cura manual' 
                          }); 
                          load(); 
                        }}>💚 +5 HP</Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2: Combat Log */}
            <div style={{ background: '#fff', border: '1px solid #D4AF37', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <h3>Histórico do Combate</h3>
              <div style={{ 
                marginTop: '15px', 
                flex: 1, 
                maxHeight: '500px', 
                overflowY: 'auto', 
                fontSize: '0.85rem',
                border: '1px solid #eee',
                padding: '10px',
                backgroundColor: '#fafafa'
              }}>
                {c.combatLog.map((log, i) => (
                  <p key={i} style={{ margin: '5px 0', borderBottom: '1px dotted #eee', paddingBottom: '5px' }}>
                    <code style={{ color: '#888' }}>[{new Date(log.t).toLocaleTimeString()}]</code> {log.m}
                  </p>
                ))}
                {c.combatLog.length === 0 && <p style={{ color: '#999', textAlign: 'center' }}>Nenhum evento registrado.</p>}
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
