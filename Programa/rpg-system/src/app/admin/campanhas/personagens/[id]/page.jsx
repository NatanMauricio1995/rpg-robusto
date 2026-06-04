'use client';

import React, { useEffect, useState, use } from 'react';
import { useCampanhaPersonagem } from '../../../../hooks/useCampanhaPersonagem';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Toast, StatCard, ProgressBar 
} from '../../../../components';

export default function DetalhesFichaPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { getSheet, loading, error, setError } = useCampanhaPersonagem();
  const [ficha, setFicha] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await getSheet(params.id);
      if (res.success) setFicha(res.data);
    };
    load();
  }, [params.id, getSheet]);

  if (loading && !ficha) return <Loading type="full" />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="admin" />
        <ContentContainer>
          {ficha && (
            <>
              <SectionTitle title={`Ficha: ${ficha.personagemNome || ficha.personagemId}`} subtitle={`ID da Campanha: ${ficha.campanhaId}`} />
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                <StatCard label="Nível" value={ficha.nivel} />
                <StatCard label="XP Atual" value={ficha.xp} />
                <StatCard label="CA" value={ficha.ca} />
                <StatCard label="Status" value={ficha.status} />
              </div>

              <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                <h3>Saúde</h3>
                <ProgressBar value={ficha.hpAtual} max={ficha.hpMaximo} label={`HP: ${ficha.hpAtual} / ${ficha.hpMaximo}`} />
              </div>

              <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                  <h3>Moedas</h3>
                  <ul>
                    <li>Ouro (po): {ficha.moedas?.po || 0}</li>
                    <li>Prata (pp): {ficha.moedas?.pp || 0}</li>
                    <li>Cobre (pc): {ficha.moedas?.pc || 0}</li>
                  </ul>
                </div>
                <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px' }}>
                  <h3>Inventário Rápido</h3>
                  <p>Itens Equipados: {ficha.equipamentos?.length || 0}</p>
                  <p>Itens no Inventário: {ficha.inventario?.length || 0}</p>
                </div>
              </div>
            </>
          )}
          {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        </ContentContainer>
      </div>
    </div>
  );
}
