export const MODULES = [
  { 
    name: 'Personagens', 
    description: 'Criação, aprovação e gerenciamento de personagens.', 
    route: '/personagens', 
    implemented: true 
  },
  { 
    name: 'Campanhas', 
    description: 'Gerenciamento de campanhas, sessões e missões.', 
    route: '/campanhas', 
    implemented: false 
  },
  { 
    name: 'Combates', 
    description: 'Controle de encontros e recursos.', 
    route: '/combates', 
    implemented: false 
  },
  { 
    name: 'Mundo', 
    description: 'Construção da geografia e lore do cenário.', 
    route: '/mundo', 
    implemented: false 
  },
  { 
    name: 'Biblioteca RPG', 
    description: 'Raças, classes, magias, habilidades e equipamentos.', 
    route: '/biblioteca', 
    implemented: false 
  },
  { 
    name: 'Relatórios', 
    description: 'Análises e métricas do sistema.', 
    route: '/relatorios', 
    implemented: false 
  },
];
