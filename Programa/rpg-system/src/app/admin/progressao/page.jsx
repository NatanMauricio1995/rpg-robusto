'use client';

import React, { useEffect, useState } from 'react';
import cpRepository from '../../../repositories/CampanhaPersonagemRepository';
import { 
  Header, Sidebar, ContentContainer, SectionTitle, 
  Loading, Button 
} from '../../../components';

/**
 * ListagemProgressaoPage - Monitor administrativo de evolução dos heróis da mesa.
 */
export default function ListagemProgressaoPage() {
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const res = await cpRepository.findAll();
      setFichas(res || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="combates" />
        <ContentContainer>
          <SectionTitle 
            title="Monitor de Progressão de Heróis" 
            subtitle="Acompanhe o nível, XP e poderes desbloqueados dos jogadores." 
          />

          {loading ? (
            <Loading type="full" label="Carregando fichas de campanha..." />
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#58111A', color: '#fff', textAlign: 'left' }}>
                  <th style={{ padding: '15px' }}>Personagem</th>
                  <th style={{ padding: '15px' }}>Classe / Subclasse</th>
                  <th style={{ padding: '15px' }}>Nível / XP</th>
                  <th style={{ padding: '15px' }}>Conteúdo Habilitado</th>
                  <th style={{ padding: '15px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {fichas.map(f => (
                  <tr key={f.id} style={{ borderBottom: '1px solid #D4AF37' }}>
                    <td style={{ padding: '15px' }}><strong>{f.nome}</strong></td>
                    <td style={{ padding: '15px' }}>{f.classe} {f.subclasse ? `(${f.subclasse})` : ''}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ fontWeight: 'bold', color: '#58111A' }}>Lvl {f.nivel}</span>
                      <br/><small style={{ color: '#666' }}>{f.xp} XP</small>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px' }}>
                        <span>⚔️ {f.habilidadesDesbloqueadas?.length || 0} Habs</span>
                        <span>🔮 {f.magiasDesbloqueadas?.length || 0} Magias</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <Button variant="ghost" size="sm" onClick={() => window.location.href=`/admin/progressao/${f.id}`}>Ver Detalhes</Button>
                    </td>
                  </tr>
                ))}
                {fichas.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: '#999' }}>Nenhum herói em aventura.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </ContentContainer>
      </div>
    </div>
  );
}
