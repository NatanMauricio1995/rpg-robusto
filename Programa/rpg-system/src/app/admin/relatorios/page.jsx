'use client';

import React, { useEffect, useState } from 'react';
import { useReports } from '../../../hooks/useReports';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast 
} from '../../../components';

/**
 * CentralRelatoriosDashboardPage - Dashboard analítico geral do sistema.
 */
export default function CentralRelatoriosDashboardPage() {
  const { loadDashboard, loading, error } = useReports();
  const [dash, setDash] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await loadDashboard();
      if (res.success) setDash(res.data);
    };
    load();
  }, [loadDashboard]);

  if (loading || !dash) return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <Loading type="full" label="Calculando métricas globais do sistema..." />
        </ContentContainer>
      </div>
    </div>
  );

  const { cards, analytics } = dash;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle 
            title="Painel Analítico Administrativo" 
            subtitle="Métricas consolidadas de todas as aventuras e personagens." 
          />

          {error && <Toast message={error.message} type="error" />}

          {/* Grade de Indicadores Rápidos (Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {Object.entries(cards).map(([label, valor]) => (
              <div key={label} style={{ background: '#fff', border: '1px solid #D4AF37', borderRadius: '8px', padding: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#666', display: 'block', fontWeight: 'bold', letterSpacing: '1px' }}>{label.replace(/([A-Z])/g, ' $1')}</span>
                <span style={{ fontSize: '2rem', color: '#58111A', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>{valor}</span>
              </div>
            ))}
          </div>

          {/* Atalhos para Relatórios Modulares */}
          <h2 style={{ color: '#58111A', marginTop: '40px', borderBottom: '2px solid #D4AF37', paddingBottom: '5px' }}>Relatórios Consolidados</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginTop: '20px' }}>
            {[
              { id: 'campanhas', label: 'Campanhas' },
              { id: 'personagens', label: 'Personagens' },
              { id: 'combates', label: 'Combates' },
              { id: 'loot', label: 'Loot' },
              { id: 'progressao', label: 'Progressão' }
            ].map(tipo => (
              <a 
                key={tipo.id} 
                href={`/admin/relatorios/${tipo.id}`} 
                style={{ background: '#58111A', color: '#F5F2EB', textDecoration: 'none', padding: '15px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', transition: 'transform 0.2s' }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Relatório de {tipo.label}
              </a>
            ))}
          </div>

          {/* Gráficos em HTML/CSS Puro */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {/* Gráfico de Combates */}
            <div style={{ background: '#fff', border: '1px solid #D4AF37', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#58111A', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>⚔️ Eficácia em Combates</h3>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                    <span>Vitórias</span>
                    <strong>{analytics.combateReport?.vitorias}</strong>
                  </div>
                  <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ background: '#38a169', height: '100%', width: `${(analytics.combateReport?.vitorias / (analytics.combateReport?.totalCombates || 1)) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                    <span>Derrotas</span>
                    <strong>{analytics.combateReport?.derrotas}</strong>
                  </div>
                  <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ background: '#e53e3e', height: '100%', width: `${(analytics.combateReport?.derrotas / (analytics.combateReport?.totalCombates || 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gráfico de Loot */}
            <div style={{ background: '#fff', border: '1px solid #D4AF37', padding: '25px', borderRadius: '8px' }}>
              <h3 style={{ color: '#58111A', marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🎁 Fluxo de Recompensas</h3>
              <div style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                    <span>Lotes Distribuídos</span>
                    <strong>{analytics.lootReport?.lootDistribuido}</strong>
                  </div>
                  <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ background: '#D4AF37', height: '100%', width: `${(analytics.lootReport?.lootDistribuido / (analytics.lootReport?.totalLotes || 1)) * 100}%` }}></div>
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '14px' }}>
                    <span>Lotes Pendentes</span>
                    <strong>{analytics.lootReport?.lootPendente}</strong>
                  </div>
                  <div style={{ background: '#f0f0f0', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ background: '#718096', height: '100%', width: `${(analytics.lootReport?.lootPendente / (analytics.lootReport?.totalLotes || 1)) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
