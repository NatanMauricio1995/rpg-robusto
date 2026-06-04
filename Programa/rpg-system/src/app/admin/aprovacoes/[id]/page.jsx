'use client';

import React, { useEffect, useState, use } from 'react';
import { useApproval } from '../../../../hooks/useApproval';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, Button, TextArea 
} from '../../../../components';

/**
 * LinhaTempoDetalhesWorkflowPage - Auditoria de transições de uma entidade específica.
 */
export default function LinhaTempoDetalhesWorkflowPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { getEntityHistory, approve, reject, requestReview, archive, loading, error } = useApproval();
  const [historico, setHistorico] = useState([]);
  const [obs, setObs] = useState('');

  // ID composto: Tipo_EntidadeId
  const partes = params.id.split('_');
  const entityType = partes[0];
  const entityId = partes.slice(1).join('_');

  // Simulação de usuário logado (Mestre)
  const mockAdminUser = { id: 'usr_mestre_01', nome: 'Gran Mestre Alistair', role: 'MESTRE' };

  const load = async () => {
    const res = await getEntityHistory(entityType, entityId);
    if (res.success) setHistorico(res.data);
  };

  useEffect(() => { load(); }, [entityType, entityId]);

  const handleAction = async (tipoAcao) => {
    if (!obs.trim()) {
      alert('A justificativa é obrigatória para registrar a decisão.');
      return;
    }
    
    let res;
    if (tipoAcao === 'APPROVE') res = await approve(entityType, entityId, mockAdminUser, obs);
    if (tipoAcao === 'REJECT') res = await reject(entityType, entityId, mockAdminUser, obs);
    if (tipoAcao === 'REVIEW') res = await requestReview(entityType, entityId, mockAdminUser, obs);
    if (tipoAcao === 'ARCHIVE') res = await archive(entityType, entityId, mockAdminUser);

    if (res?.success) {
      setObs('');
      load();
    }
  };

  if (loading && historico.length === 0) return <Loading type="full" />;

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
            title={`Fluxo de Decisão: ${entityType}`} 
            subtitle={`Entidade ID: ${entityId}`} 
          />

          {error && <Toast message={error.message} type="error" />}

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginTop: '30px' }}>
            {/* Coluna 1: Linha do Tempo */}
            <div style={{ background: '#fff', border: '1px solid #D4AF37', padding: '30px', borderRadius: '8px' }}>
              <h3 style={{ color: '#58111A', marginBottom: '25px', borderBottom: '2px solid #F5F2EB', paddingBottom: '10px' }}>🔀 Eventos de Governança</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {historico.length === 0 ? (
                  <p style={{ color: '#999' }}>Nenhum histórico para esta entidade.</p>
                ) : historico.map((h, idx) => (
                  <div key={h.id} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#D4AF37', zIndex: 2 }}></div>
                      {idx !== historico.length - 1 && <div style={{ width: '2px', background: '#F5F2EB', flex: 1, zIndex: 1 }}></div>}
                    </div>
                    <div style={{ paddingBottom: '30px' }}>
                      <div style={{ fontWeight: 'bold', color: '#58111A', fontSize: '1rem' }}>
                        {h.statusAnterior} → {h.statusNovo}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '4px' }}>
                        Por: {h.usuarioResponsavel} | {new Date(h.createdAt).toLocaleString()}
                      </div>
                      {h.observacao && (
                        <div style={{ marginTop: '10px', padding: '12px', background: '#F5F2EB', borderRadius: '4px', fontSize: '0.85rem', color: '#333', fontStyle: 'italic', borderLeft: '4px solid #D4AF37' }}>
                          "{h.observacao}"
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Coluna 2: Ações de Supervisor */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: '#fff', border: '1px solid #D4AF37', padding: '25px', borderRadius: '8px' }}>
                <h3 style={{ color: '#58111A', marginBottom: '15px' }}>🛠️ Decisão Administrativa</h3>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
                  Operador: <strong>{mockAdminUser.nome}</strong>
                </p>

                <TextArea 
                  label="Parecer / Justificativa Obrigatória" 
                  value={obs} 
                  onChange={e => setObs(e.target.value)} 
                  placeholder="Escreva o motivo da sua decisão..."
                  rows={5}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '20px' }}>
                  <Button variant="primary" onClick={() => handleAction('APPROVE')}>🟢 APROVAR</Button>
                  <Button variant="danger" onClick={() => handleAction('REJECT')}>🔴 REPROVAR</Button>
                  <Button variant="ghost" onClick={() => handleAction('REVIEW')}>🟡 REVISAR</Button>
                  <Button variant="ghost" onClick={() => handleAction('ARCHIVE')}>⚫ ARQUIVAR</Button>
                </div>
              </div>
            </div>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
