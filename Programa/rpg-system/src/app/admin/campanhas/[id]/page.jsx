'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { 
  Header, Sidebar, ContentContainer, SectionTitle 
} from '../../../components';

/**
 * CentralCampanha - Painel de controle de uma campanha específica
 */
export default function CentralCampanha({ params: paramsPromise }) {
  const params = use(paramsPromise);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="campanhas" />
        <ContentContainer>
          <SectionTitle 
            title={`Gerenciamento de Campanha`} 
            subtitle={`ID: ${params.id}`} 
          />
          
          <nav style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px', 
            marginTop: '30px' 
          }}>
            <Link 
              href={`/admin/campanhas/${params.id}/participantes`}
              style={{ padding: '20px', background: '#fff', border: '1px solid #D4AF37', borderRadius: '8px', textDecoration: 'none', color: '#58111A', fontWeight: 'bold', textAlign: 'center' }}
            >
              👥 Gerenciar Participantes
            </Link>
            <Link 
              href={`/admin/campanhas/${params.id}/convites`}
              style={{ padding: '20px', background: '#fff', border: '1px solid #D4AF37', borderRadius: '8px', textDecoration: 'none', color: '#58111A', fontWeight: 'bold', textAlign: 'center' }}
            >
              ✉️ Painel de Convites
            </Link>
          </nav>
        </ContentContainer>
      </div>
    </div>
  );
}
