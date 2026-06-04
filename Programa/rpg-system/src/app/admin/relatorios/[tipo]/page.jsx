'use client';

import React, { useEffect, useState, use } from 'react';
import { useReports } from '../../../../hooks/useReports';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button 
} from '../../../../components';

/**
 * RelatorioModularEspecificoPage - Exibição de métricas detalhadas por módulo.
 */
export default function RelatorioModularEspecificoPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { loadCampaignReport, loadCharacterReport, loadCombatReport, loadLootReport, loadProgressionReport, loading, error } = useReports();
  const [dados, setDados] = useState(null);
  const { tipo } = params;

  useEffect(() => {
    const load = async () => {
      const mapeamento = {
        campanhas: loadCampaignReport,
        personagens: loadCharacterReport,
        combates: loadCombatReport,
        loot: loadLootReport,
        progressao: loadProgressionReport
      };

      const executor = mapeamento[tipo];
      if (executor) {
        const res = await executor();
        if (res.success) setDados(res.data);
      }
    };
    load();
  }, [tipo, loadCampaignReport, loadCharacterReport, loadCombatReport, loadLootReport, loadProgressionReport]);

  if (loading || !dados) return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <Loading type="full" label={`Compilando relatório de ${tipo}...`} />
        </ContentContainer>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <div style={{ marginBottom: '20px' }}>
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>← Voltar ao Painel Geral</Button>
          </div>

          <SectionTitle 
            title={`Relatório Consolidado: ${tipo.toUpperCase()}`} 
            subtitle="Indicadores de desempenho e auditoria técnica." 
          />

          {error && <Toast message={error.message} type="error" />}

          <div style={{ marginTop: '25px', background: '#fff', border: '1px solid #D4AF37', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ borderBottom: '2px solid #F5F2EB', paddingBottom: '15px', marginTop: 0, color: '#58111A' }}>Indicadores Principais</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {Object.entries(dados).map(([chave, valor]) => {
                if (typeof valor !== 'object') {
                  return (
                    <div key={chave} style={{ padding: '15px', borderBottom: '1px solid #f8f9fa', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 'bold', textTransform: 'capitalize', color: '#666', fontSize: '0.9rem' }}>
                        {chave.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span style={{ color: '#58111A', fontWeight: 'bold', fontSize: '1.1rem' }}>{valor}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* Listagem de itens se existir (ex: itensMaisObtidos) */}
            {dados.itensMaisObtidos && (
              <div style={{ marginTop: '40px' }}>
                <h4 style={{ color: '#58111A', marginBottom: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  📦 Itens Mais Dropados / Reivindicados
                </h4>
                <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '4px', overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: '#F5F2EB', color: '#58111A', textAlign: 'left' }}>
                      <th style={{ padding: '12px' }}>Nome do Item</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Quantidade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dados.itensMaisObtidos.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{item.nome}</td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>{item.quantidade}x</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
