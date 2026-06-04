import React from 'react';
import HomeSection from './HomeSection';
import HomeCard from './HomeCard';
import styles from './HomeScreen.module.css';

/**
 * HomeScreen - Tela principal de navegação (Portal)
 */
export default function HomeScreen() {
  // Array otimizado de rotas da Biblioteca RPG (Seção 1)
  const bibliotecaCards = [
    { title: 'Idiomas', path: 'idiomas' }, 
    { title: 'Sentidos', path: 'sentidos' },
    { title: 'Perícias', path: 'pericias' }, 
    { title: 'Proficiências', path: 'proficiencias' },
    { title: 'Escolas de Magia', path: 'escolasMagia' }, 
    { title: 'Raças', path: 'racas' },
    { title: 'Sub-Raças', path: 'subRacas' }, 
    { title: 'Classes', path: 'classes' },
    { title: 'Subclasses', path: 'subclasses' }, 
    { title: 'Habilidades', path: 'habilidades' },
    { title: 'Magias', path: 'magias' }, 
    { title: 'Armas', path: 'armas' },
    { title: 'Armaduras', path: 'armaduras' }, 
    { title: 'Itens', path: 'itens' },
    { title: 'Encantamentos', path: 'encantamentos' }, 
    { title: 'Receitas', path: 'receitas' },
    { title: 'NPCs', path: 'npcs' }, 
    { title: 'Inimigos', path: 'inimigos' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1>Bem-vindo ao RPG Robusto</h1>
        <p>O Portal Definitivo para sua Jornada Heróica.</p>
        <div className={styles.quickAccess}>
          <HomeCard title="Dashboard" href="/dashboard" />
          <HomeCard title="Meus Personagens" href="/personagens" />
          <HomeCard title="Minhas Campanhas" href="/campanhas" />
        </div>
      </header>

      <HomeSection title="SEÇÃO 1 — BIBLIOTECA RPG">
        {bibliotecaCards.map(c => (
          <HomeCard key={c.path} title={c.title} href={`/admin/${c.path}`} />
        ))}
      </HomeSection>

      <HomeSection title="SEÇÃO 2 — PERSONAGENS">
        <HomeCard title="Criar Personagem" href="/personagens/criar" />
        <HomeCard title="Aprovações" href="/admin/personagens" />
        <HomeCard title="Fichas de Campanha" href="/admin/campanhas/personagens" />
      </HomeSection>

      <HomeSection title="SEÇÃO 3 — CAMPANHAS">
        <HomeCard title="Campanhas" disabled /> 
        <HomeCard title="Convites" disabled /> 
        <HomeCard title="Participantes" disabled />
      </HomeSection>

      <HomeSection title="SEÇÃO 4 — COMBATES">
        <HomeCard title="Combates" disabled /> 
        <HomeCard title="Iniciativas" disabled /> 
        <HomeCard title="Loot" disabled />
      </HomeSection>

      <HomeSection title="SEÇÃO 5 — RELATÓRIOS">
        <HomeCard title="Relatórios de Campanhas" disabled /> 
        <HomeCard title="Relatórios de Personagens" disabled /> 
        <HomeCard title="Relatórios de Inimigos" disabled />
      </HomeSection>
    </div>
  );
}
