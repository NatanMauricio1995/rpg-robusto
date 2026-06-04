'use client';

import React, { useEffect, useState, use } from 'react';
import srv from '../../../../services/CampaignInviteService';
import { useCampaignInvites } from '../../../../hooks/useCampaignInvites';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Button, Loading, Toast, TextBox 
} from '../../../../components';

/**
 * ConvitesPage - Painel de convites da campanha
 */
export default function ConvitesPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ usuarioId: '', mensagem: '' });
  const { send, cancel, loading, error, setError } = useCampaignInvites();

  const load = async () => {
    const r = await srv.listInvites(params.id);
    if (r.success) setList(r.data);
  };

  useEffect(() => { load(); }, [params.id]);

  const handleSend = async (e) => {
    e.preventDefault();
    const res = await send({ 
      ...form, 
      campanhaId: params.id, 
      mestreId: 'SESSAO_ATUAL' 
    });
    if (res.success) {
      setForm({ usuarioId: '', mensagem: '' });
      load();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle title="Painel de Convites" subtitle="Convide novos jogadores para sua campanha." />

          {loading && <Loading />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <form onSubmit={handleSend} style={{ 
            display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '15px', 
            padding: '20px', backgroundColor: '#fff', borderRadius: '8px', marginBottom: '30px' 
          }}>
            <TextBox 
              placeholder="ID do Usuário" 
              value={form.usuarioId} 
              onChange={e => setForm({...form, usuarioId: e.target.value})} 
              required
            />
            <TextBox 
              placeholder="Mensagem (Opcional)" 
              value={form.mensagem} 
              onChange={e => setForm({...form, mensagem: e.target.value})} 
            />
            <Button variant="primary" type="submit" loading={loading}>Enviar Convite</Button>
          </form>

          <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '20px' }}>
            <h3>Convites Enviados</h3>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '15px' }}>
              {list.map(i => (
                <li key={i.id} style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '12px', borderBottom: '1px solid #eee' 
                }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Para: {i.usuarioId}</span>
                    <span style={{ 
                      marginLeft: '15px', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', 
                      backgroundColor: i.status === 'ACEITO' ? '#C6F6D5' : '#FEEBC8'
                    }}>{i.status}</span>
                  </div>
                  {i.status === 'PENDENTE' && (
                    <Button variant="ghost" size="sm" onClick={async () => { await cancel(i.id); load(); }}>Cancelar</Button>
                  )}
                </li>
              ))}
              {list.length === 0 && <p style={{ color: '#999' }}>Nenhum convite enviado.</p>}
            </ul>
          </div>
        </ContentContainer>
      </div>
    </div>
  );
}
