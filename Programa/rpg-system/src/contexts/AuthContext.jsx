import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import authService from '../services/AuthService';
import userRepository from '../repositories/UserRepository';

const auth = getAuth(app);
const AuthContext = createContext(null);

/**
 * AuthProvider - Provedor de estado de autenticação
 * Conforme Capítulo 3 da Arq. BackEnd e Capítulos 1-4 de Segurança
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // MESTRE / JOGADOR
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        
        /**
         * RN-072 / RN-073: Recupera o papel (MESTRE/JOGADOR) da coleção 'usuarios'
         */
        try {
          const userData = await userRepository.findById(firebaseUser.uid);
          if (userData && userData.tipo) {
            setUserType(userData.tipo);
          } else {
            setUserType('JOGADOR'); // Default seguro conforme DENY ALL
          }
        } catch (error) {
          console.error("Erro ao recuperar tipo de usuário:", error);
          setUserType('JOGADOR');
        }
      } else {
        setUser(null);
        setUserType(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    isMestre: userType === 'MESTRE',
    isJogador: userType === 'JOGADOR',
    
    /**
     * Consome o AuthService para ações de login
     */
    login: async (email, pass) => {
      return await authService.login(email, pass);
    },

    /**
     * Consome o AuthService para encerrar sessão
     */
    logout: async () => {
      return await authService.logout();
    },

    /**
     * Consome o AuthService para registro de novos usuários
     */
    register: async (data) => {
      return await authService.register(data);
    },

    /**
     * Consome o AuthService para recuperação de senha
     */
    resetPassword: async (email) => {
      return await authService.resetPassword(email);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook personalizado para acessar o contexto de autenticação
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
