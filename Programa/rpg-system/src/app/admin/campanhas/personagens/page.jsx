'use client';

import React, { useState, useEffect } from 'react';
import { useCampanhaPersonagem } from '../../../../hooks/useCampanhaPersonagem';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  TextBox, Button, Loading, Toast 
} from '../../../../components';

export default function AdminFichasPage() {
  const { getByCampaign, updateSheet, loading, error, setError } = useCampanhaPersonagem();
  const [fichas, setFichas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadFichas = async () => {
    const res = await getByCampaign('GLOBAL'); // Ou ID específico se necessário
    if (res.success) setFichas(res.data);
  };

  useEffect(() => { loadFichas(); }, []);

  const handleInlineUpdate = async (id, field, value) => {
    const res = await updateSheet(id, { [field]: value });
    if (res.success) {
      setFichas(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
    }
  };

  const filteredFichas = fichas.filter(f => 
    f.personagemNome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.id.includes(searchTerm)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          <SectionTitle title="Fichas de Campanha" subtitle="Gestão centralizada de HP, Moedas e CA dos jogadores." />
          
          <div style={{ marginBottom: '20px' }}>
            <TextBox placeholder="Buscar ficha..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

          {loading && <Loading />}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}

          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Personagem</th>
                <th style={{ padding: '12px' }}>HP (Atual/Max)</th>
                <th style={{ padding: '12px' }}>CA</th>
                <th style={{ padding: '12px' }}>Moedas (Ouro)</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredFichas.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>{f.personagemNome || f.personagemId}</td>
                  <td style={{ padding: '12px' }}>
                    <input 
                      type="number" 
                      value={f.hpAtual} 
                      onChange={(e) => handleInlineUpdate(f.id, 'hpAtual', parseInt(e.target.value))}
                      style={{ width: '50px' }}
                    /> / {f.hpMaximo}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <input 
                      type="number" 
                      value={f.ca} 
                      onChange={(e) => handleInlineUpdate(f.id, 'ca', parseInt(e.target.value))}
                      style={{ width: '40px' }}
                    />
                  </td>
                  <td style={{ padding: '12px' }}>{f.moedas?.po || 0}</td>
                  <td style={{ padding: '12px' }}>{f.status}</td>
                  <td style={{ padding: '12px' }}>
                    <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/campanhas/personagens/${f.id}`}>Ver Tudo</Button>
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
