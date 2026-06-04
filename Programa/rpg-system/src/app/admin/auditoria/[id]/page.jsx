'use client';

import React, { useEffect, useState, use } from 'react';
import { useAudit } from '../../../../hooks/useAudit';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button 
} from '../../../../components';

/**
 * AuditoriaDetailPage - Visão detalhada de um log com diff JSON
 */
export default function AuditoriaDetailPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { getLog, loading, error } = useAudit();
  const [log, setLog] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getLog(params.id);
      if (res.success) setLog(res.data);
    };
    load();
  }, [params.id, getLog]);

  if (loading && !log) return <Loading type="full" />;
  if (!log) return <div style={{ padding: '40px', textAlign: 'center' }}>Log não localizado.</div>;

  const renderJson = (data) => (
    <pre style={{ 
      background: '#2d3748', 
      color: '#edf2f7', 
      padding: '20px', 
      borderRadius: '8px', 
      overflowX: 'auto',
      fontSize: '0.85rem',
      lineHeight: '1.5'
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <div style={{ marginBottom: '20px' }}>
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>← Voltar à Lista</Button>
          </div>

          <SectionTitle 
            title={`Detalhes do Log: ${log.action}`} 
            subtitle={`Evento registrado em ${new Date(log.timestamp).toLocaleString()}`} 
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '25px' }}>
            {/* Metadados do Evento */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '25px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Informações do Ator</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <p><strong>Usuário:</strong> {log.userName}</p>
                  <p><strong>Papel:</strong> {log.userRole}</p>
                  <p><strong>ID do Usuário:</strong> <code style={{ fontSize: '0.8rem' }}>{log.userId}</code></p>
                  <p><strong>Endereço IP:</strong> {log.ip}</p>
                  <p><strong>Sessão:</strong> {log.sessionId}</p>
                </div>
              </div>

              <div style={{ background: '#fff', padding: '25px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Informações do Recurso</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                  <p><strong>Entidade:</strong> {log.entityType}</p>
                  <p><strong>Nome:</strong> {log.entityName}</p>
                  <p><strong>ID do Recurso:</strong> <code style={{ fontSize: '0.8rem' }}>{log.entityId}</code></p>
                </div>
              </div>
            </div>

            {/* Diferenças de Dados */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', padding: '25px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>⬅️ Estado Anterior (Before)</h3>
                {log.beforeData ? renderJson(log.beforeData) : <p style={{ color: '#999', fontStyle: 'italic' }}>Nenhum dado anterior (Criação).</p>}
              </div>

              <div style={{ background: '#fff', padding: '25px', border: '1px solid #D4AF37', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>➡️ Estado Posterior (After)</h3>
                {log.afterData ? renderJson(log.afterData) : <p style={{ color: '#999', fontStyle: 'italic' }}>Nenhum dado posterior (Exclusão).</p>}
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
