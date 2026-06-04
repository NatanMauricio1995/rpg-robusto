import React from 'react';
import { Header, Sidebar, Footer, ContentContainer } from '../components';
import HomeScreen from '../components/home/HomeScreen';

/**
 * Página Inicial do Sistema - Portal de Navegação
 * Integração com Layout Mestre conforme Arquitetura Visual
 */
export default function Page() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeModule="dashboard" />
        <ContentContainer>
          <HomeScreen />
        </ContentContainer>
      </div>
      <Footer />
    </div>
  );
}
