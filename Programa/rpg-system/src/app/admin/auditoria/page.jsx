'use client';

import React, { useEffect, useState } from 'react';
import { useAudit } from '../../../hooks/useAudit';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button, TextBox 
} from '../../../components';

/**
 * AuditoriaListPage - Painel Administrativo de Auditoria Global
 */
export default function AuditoriaListPage() {
  const { listLogs, loading, error } = useAudit();
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    const res = await listLogs();
    if (res.success) setLogs(res.data);
  };

  useEffect(() => { loadData(); }, [listLogs]);

  const filteredLogs = logs.filter(l => 
    l.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.entityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.action?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.entityType?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle 
            title="Auditoria e Rastreabilidade" 
            subtitle="Histórico completo de transações e modificações estruturais." 
          />

          <div style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <TextBox 
                placeholder="Filtrar por usuário, entidade ou ação..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            <Button variant="ghost" onClick={loadData}>🔄 Atualizar</Button>
          </div>

          {loading && <Loading type="full" label="Recuperando logs..." />}
          {error && <Toast message={error.message} type="error" />}

          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <thead>
              <tr style={{ background: '#58111A', color: '#fff', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>Data/Hora</th>
                <th style={{ padding: '15px' }}>Ação</th>
                <th style={{ padding: '15px' }}>Usuário</th>
                <th style={{ padding: '15px' }}>Entidade</th>
                <th style={{ padding: '15px' }}>ID Recurso</th>
                <th style={{ padding: '15px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px', fontSize: '0.85rem' }}>
                    {new Date(log.timestamp).toLocaleString()}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '3px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold',
                      backgroundColor: log.action === 'CREATE' ? '#C6F6D5' : log.action === 'DELETE' ? '#FED7D7' : '#E2E8F0',
                      color: log.action === 'CREATE' ? '#22543D' : log.action === 'DELETE' ? '#822727' : '#4A5568'
                    }}>{log.action}</span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{log.userName}</div>
                    <small style={{ color: '#888' }}>{log.userRole}</small>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{log.entityName}</div>
                    <small style={{ color: '#888' }}>{log.entityType}</small>
                  </td>
                  <td style={{ padding: '12px', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                    {log.entityId}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/auditoria/${log.id}`}>Ver Detalhes</Button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && !loading && (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>Nenhum log de auditoria encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </ContentContainer>
      </div>
    </div>
  );
}
