'use client';

import React, { useEffect, useState, use } from 'react';
import { useLoot } from '../../../../hooks/useLoot';
import { useCombat } from '../../../../hooks/useCombat';
import combatService from '../../../../services/CombatService';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast 
} from '../../../../components';

/**
 * DetalhesLootPage - Painel de distribuição de espólios
 */
export default function DetalhesLootPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { getCombatLoot, claimLoot, finalizeLoot, loading, error } = useLoot();
  const [loot, setLoot] = useState(null);
  const [combate, setCombate] = useState(null);

  const loadData = async () => {
    const r = await getCombatLoot(params.id);
    if (r.success) {
      setLoot(r.data);
      const cRes = await combatService.getCombat(r.data.combatId);
      if (cRes.success) setCombate(cRes.data);
    }
  };

  useEffect(() => { loadData(); }, [params.id]);

  if (!loot && loading) return <Loading type="full" />;
  if (!loot) return <div style={{ padding: '40px', textAlign: 'center' }}>Baú de loot não localizado.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <SectionTitle 
            title="Distribuição de Recompensas" 
            subtitle={`Lote: ${loot.id} | Status: ${loot.status}`} 
          />

          {error && <Toast message={error.message} type="error" />}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '25px' }}>
            {/* Coluna 1: Itens Gerados */}
            <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
              <h3 style={{ color: '#58111A', marginBottom: '15px' }}>🎁 Itens no Drop</h3>
              {loot.generatedLoot.length === 0 ? (
                <p style={{ color: '#999' }}>Vazio.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {loot.generatedLoot.map(item => (
                    <li key={item.itemId} style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span><strong>{item.nome}</strong> (x{item.quantidade})</span>
                      {loot.status === 'PENDENTE' && combate?.participantes?.map(p => (
                        <Button 
                          key={p.id} 
                          variant="ghost" 
                          size="sm" 
                          onClick={async () => { 
                            await claimLoot(loot.id, p.id, [{ itemId: item.itemId, nome: item.nome, quantidade: 1 }]); 
                            loadData(); 
                          }}
                        >
                          Dar a {p.nome}
                        </Button>
                      ))}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Coluna 2: Ações do Mestre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>🛡️ Jogadores Presentes</h3>
                {combate?.participantes?.map(p => (
                  <div key={p.id} style={{ padding: '8px 0', borderBottom: '1px solid #f8f9fa' }}>
                    • {p.nome} <small>(HP: {p.hpAtual}/{p.hpMaximo})</small>
                  </div>
                ))}
                <div style={{ marginTop: '20px' }}>
                  {loot.status === 'PENDENTE' && (
                    <Button variant="primary" style={{ width: '100%' }} onClick={async () => { await finalizeLoot(loot.id); loadData(); }}>
                      🔒 Encerrar e Concluir Distribuição
                    </Button>
                  )}
                </div>
              </div>

              {/* Log de Resgates */}
              <div style={{ background: '#fff', padding: '20px', border: '1px solid #D4AF37', borderRadius: '8px', flex: 1 }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>📜 Histórico de Resgates</h3>
                <div style={{ maxHeight: '200px', overflowY: 'auto', fontSize: '0.85rem' }}>
                  {loot.lootLog?.map((log, idx) => (
                    <div key={idx} style={{ marginBottom: '8px', paddingBottom: '4px', borderBottom: '1px dotted #eee' }}>
                      <code>[{new Date(log.timestamp).toLocaleTimeString()}]</code> <strong>{log.action}</strong>: {log.description}
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
