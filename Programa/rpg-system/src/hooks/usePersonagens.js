import { useState } from 'react';
import { useRouter } from 'next/navigation';
import personagemService from '../services/PersonagemService';
import { useAuth } from '../contexts/AuthContext';

/**
 * Hook para gerenciamento de ações de personagens
 * Conforme Fluxo FP-001 (Criar Personagem)
 */
export function usePersonagens() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const router = useRouter();

  const criarPersonagem = async (dados) => {
    setLoading(true);
    setError(null);
    try {
      if (!user) throw new Error('Usuário não autenticado.');
      
      const result = await personagemService.createCharacter(dados, user.uid);
      
      // Redirecionamento após sucesso conforme fluxo do sistema
      router.push('/personagens?success=created');
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Erro ao criar personagem.';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { criarPersonagem, loading, error };
}
