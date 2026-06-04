'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { Loading } from '../index';

/**
 * Componente de proteção de rotas por autenticação e perfil (Role).
 * Adaptado para Next.js conforme estrutura do projeto.
 * 
 * @param {React.ReactNode} children - O componente da página protegida.
 * @param {string[]} allowedRoles - Lista de perfis permitidos (Ex: ['MESTRE', 'JOGADOR']).
 */
export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, userType, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Só age após terminar o carregamento inicial da sessão
    if (!loading) {
      if (!isAuthenticated) {
        // Redireciona para login salvando a rota pretendida para retorno
        router.push(`/login?redirect=${pathname}`);
      } else if (allowedRoles && !allowedRoles.includes(userType)) {
        // Se autenticado mas sem permissão, redireciona para dashboard (RN de Segurança Cap. 5-6)
        router.push('/dashboard?error=unauthorized');
      }
    }
  }, [loading, isAuthenticated, userType, allowedRoles, router, pathname]);

  // Exibe loader enquanto verifica a sessão
  if (loading) {
    return <Loading type="full" label="Verificando permissões..." />;
  }

  // Se não estiver autenticado ou não tiver a role necessária, 
  // não renderiza o conteúdo enquanto o useEffect processa o redirecionamento.
  if (!isAuthenticated || (allowedRoles && !allowedRoles.includes(userType))) {
    return null;
  }

  return children;
}
