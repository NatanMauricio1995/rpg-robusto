/**
 * Registro central de rotas da aplicação.
 * Utiliza 'as const' para garantir que os valores sejam tratados como literais e não strings genéricas.
 */
export const ROUTES = {
  home: '/',
  dashboard: '/admin',
  personagens: '/personagens',
  emConstrucao: '/em-construcao',
  campanhas: '/campanhas',
  combate: '/combate',
  biblioteca: '/biblioteca',
} as const;

export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];

/**
 * Helper para validar se uma string é uma rota válida
 */
export const isValidRoute = (route: string): route is AppRoutes => {
  return Object.values(ROUTES).includes(route as AppRoutes);
};
