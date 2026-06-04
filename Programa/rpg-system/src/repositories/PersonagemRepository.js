import BaseRepository from './BaseRepository';

/**
 * PersonagemRepository - Repositório para gerenciamento da coleção 'personagens' no Firestore.
 * Conforme Capítulo 4 da Arquitetura BackEnd.
 * Herda métodos CRUD padrão (create, update, delete, findById, findAll) de BaseRepository.
 */
class PersonagemRepository extends BaseRepository {
  constructor() {
    super('personagens');
  }

  /**
   * Busca personagens por usuário (Dono)
   * @param {string} userId 
   */
  async findByUserId(userId) {
    return await this.search({ userId });
  }

  /**
   * Busca personagens pendentes de aprovação (RN-031)
   */
  async findPendingApproval() {
    return await this.search({ status: 'Pendente' });
  }
}

export default new PersonagemRepository();
