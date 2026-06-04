import React from 'react';
import HomeSection from './HomeSection';
import HomeCard from './HomeCard';
import { ROUTES } from '../../utils/routesRegistry';
import styles from './HomeScreen.module.css';

/**
 * HomeScreen - Tela principal de navegação (Portal)
 * Atualizada via Auditoria de Rotas (ETAPA 4)
 */
export default function HomeScreen() {
  // Array otimizado e validado via routesRegistry
  const bibliotecaCards = [
    { title: 'Idiomas', route: ROUTES.idiomas }, 
    { title: 'Sentidos', route: ROUTES.sentidos },
    { title: 'Perícias', route: ROUTES.pericias }, 
    { title: 'Proficiências', route: ROUTES.proficiencias },
    { title: 'Escolas de Magia', route: ROUTES.escolasMagia }, 
    { title: 'Raças', route: ROUTES.racas },
    { title: 'Sub-Raças', route: ROUTES.subRacas }, 
    { title: 'Classes', route: ROUTES.classes },
    { title: 'Subclasses', route: ROUTES.subclasses }, 
    { title: 'Habilidades', route: ROUTES.habilidades },
    { title: 'Magias', route: ROUTES.magias }, 
    { title: 'Armas', route: ROUTES.armas },
    { title: 'Armaduras', route: ROUTES.armaduras }, 
    { title: 'Itens', route: ROUTES.itens },
    { title: 'Encantamentos', route: ROUTES.encantamentos }, 
    { title: 'Receitas', route: ROUTES.receitas },
    { title: 'NPCs', route: ROUTES.npcs }, 
    { title: 'Inimigos', route: ROUTES.inimigos }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1>Bem-vindo ao RPG Robusto</h1>
        <p>O Portal Definitivo para sua Jornada Heróica.</p>
        <div className={styles.quickAccess}>
          <HomeCard title="Dashboard" href={ROUTES.dashboard} disabled={!ROUTES.dashboard} />
          <HomeCard title="Meus Personagens" href={ROUTES.personagens} disabled={!ROUTES.personagens} />
          <HomeCard title="Minhas Campanhas" href={ROUTES.campanhas} disabled={!ROUTES.campanhas} />
        </div>
      </header>

      <HomeSection title="SEÇÃO 1 — BIBLIOTECA RPG">
        {bibliotecaCards.map(c => (
          <HomeCard 
            key={c.title} 
            title={c.title} 
            href={c.route} 
            disabled={!c.route} 
          />
        ))}
      </HomeSection>

      <HomeSection title="SEÇÃO 2 — PERSONAGENS">
        <HomeCard title="Criar Personagem" href={ROUTES.criarPersonagem} disabled={!ROUTES.criarPersonagem} />
        <HomeCard title="Aprovações" href={ROUTES.adminPersonagens} disabled={!ROUTES.adminPersonagens} />
        <HomeCard title="Fichas de Campanha" href={ROUTES.fichasCampanha} disabled={!ROUTES.fichasCampanha} />
      </HomeSection>

      <HomeSection title="SEÇÃO 3 — CAMPANHAS">
        <HomeCard title="Campanhas" href={ROUTES.campanhas} disabled={!ROUTES.campanhas} /> 
        <HomeCard title="Convites" href={ROUTES.convites} disabled={!ROUTES.convites} /> 
        <HomeCard title="Participantes" href={ROUTES.participantes} disabled={!ROUTES.participantes} />
      </HomeSection>

      <HomeSection title="SEÇÃO 4 — COMBATES">
        <HomeCard title="Combates" href={ROUTES.combates} disabled={!ROUTES.combates} /> 
        <HomeCard title="Iniciativas" href={ROUTES.iniciativas} disabled={!ROUTES.iniciativas} /> 
        <HomeCard title="Loot" href={ROUTES.loot} disabled={!ROUTES.loot} />
      </HomeSection>

      <HomeSection title="SEÇÃO 5 — RELATÓRIOS">
        <HomeCard title="Relatórios de Campanhas" href={ROUTES.relatoriosCampanhas} disabled={!ROUTES.relatoriosCampanhas} /> 
        <HomeCard title="Relatórios de Personagens" href={ROUTES.relatoriosPersonagens} disabled={!ROUTES.relatoriosPersonagens} /> 
        <HomeCard title="Relatórios de Inimigos" href={ROUTES.relatoriosInimigos} disabled={!ROUTES.relatoriosInimigos} />
      </HomeSection>
    </div>
  );
}
