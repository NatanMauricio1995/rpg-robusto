import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import app from '../firebase/firebaseConfig';

const auth = getAuth(app);

/**
 * AuthService - Responsável por autenticação e gestão de usuários
 * Conforme Capítulo 6 da Arquitetura BackEnd e Capítulos 1-4 de Segurança
 */
class AuthService {
  /**
   * Realiza o login do usuário
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        data: userCredential.user,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: this._handleError(error.code)
        }
      };
    }
  }

  /**
   * Encerra a sessão do usuário
   */
  async logout() {
    try {
      await signOut(auth);
      return {
        success: true,
        data: null,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: 'Erro ao realizar logout.'
        }
      };
    }
  }

  /**
   * Registra um novo usuário
   * @param {Object} data - { email, password, ... }
   */
  async register(data) {
    try {
      const { email, password } = data;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Nota: A atribuição de papéis (Mestre/Jogador) deve ser feita via Firestore
      // conforme Capítulo 2 de Segurança, mas o Firebase Auth lida com a credencial base.
      
      return {
        success: true,
        data: userCredential.user,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: this._handleError(error.code)
        }
      };
    }
  }

  /**
   * Envia e-mail de recuperação de senha
   * @param {string} email 
   */
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        data: 'E-mail de recuperação enviado.',
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: {
          code: error.code,
          message: this._handleError(error.code)
        }
      };
    }
  }

  /**
   * Traduz códigos de erro do Firebase para mensagens amigáveis
   * @private
   */
  _handleError(code) {
    switch (code) {
      case 'auth/invalid-email':
        return 'E-mail inválido.';
      case 'auth/user-disabled':
        return 'Usuário desativado.';
      case 'auth/user-not-found':
        return 'Usuário não encontrado.';
      case 'auth/wrong-password':
        return 'Senha incorreta.';
      case 'auth/email-already-in-use':
        return 'Este e-mail já está em uso.';
      case 'auth/weak-password':
        return 'A senha é muito fraca (mínimo 6 caracteres).';
      case 'auth/network-request-failed':
        return 'Erro de conexão com a rede.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Tente novamente mais tarde.';
      default:
        return 'Ocorreu um erro inesperado na autenticação.';
    }
  }
}

export default new AuthService();
