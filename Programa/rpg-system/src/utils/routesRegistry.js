/**
 * Mapa centralizado de rotas validadas do sistema RPG Robusto.
 * Apenas rotas com arquivos page.jsx/tsx reais em src/app estão habilitadas.
 */
export const ROUTES = {
  home: '/',
  
  // Biblioteca RPG (Admin)
  idiomas: '/admin/idiomas',
  sentidos: '/admin/sentidos',
  pericias: '/admin/pericias',
  proficiencias: '/admin/proficiencias',
  escolasMagia: '/admin/escolasMagia',
  racas: '/admin/racas',
  subRacas: '/admin/subRacas',
  classes: '/admin/classes',
  subclasses: '/admin/subclasses',
  habilidades: '/admin/habilidades',
  magias: '/admin/magias',
  armas: '/admin/armas',
  armaduras: '/admin/armaduras',
  itens: '/admin/itens',
  encantamentos: '/admin/encantamentos',
  receitas: '/admin/receitas',
  npcs: '/admin/npcs',
  inimigos: '/admin/inimigos',

  // Personagens
  criarPersonagem: '/personagens/criar',
  adminPersonagens: null, // Inexistente (usar admin/campanhas/personagens se for o caso)
  fichasCampanha: '/admin/campanhas/personagens',

  // Campanhas
  campanhas: '/admin/campanhas',
  convites: null,
  participantes: null,
  // Combates
  combates: '/admin/combates',
  iniciativas: null,
  loot: '/admin/loot',
  progressao: '/admin/progressao',
  // Relatórios
  relatorios: '/admin/relatorios',
  relatoriosCampanhas: '/admin/relatorios/campanhas',
  relatoriosPersonagens: '/admin/relatorios/personagens',
  relatoriosInimigos: '/admin/relatorios/inimigos',
  relatoriosCombates: '/admin/relatorios/combates',
  relatoriosLoot: '/admin/relatorios/loot',
  relatoriosProgressao: '/admin/relatorios/progressao',
  // Mundos
  mundo: '/admin/mundo',
  // Auditoria
  auditoria: '/admin/auditoria',
  // Aprovações
  aprovacoes: '/admin/aprovacoes'
};
