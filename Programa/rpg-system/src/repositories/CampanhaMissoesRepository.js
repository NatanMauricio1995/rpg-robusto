import BaseRepository from './BaseRepository';

/**
 * CampanhaMissoesRepository - Gerencia a persistência das instâncias de missões em campanhas
 */
class CampanhaMissoesRepository extends BaseRepository {
  constructor() {
    super('campanhaMissoes');
  }

  /**
   * Busca todas as missões vinculadas a uma campanha específica
   * @param {string} campanhaId 
   */
  async findByCampanha(campanhaId) {
    return await this.search({ campanhaId }, 'status');
  }
}

export default new CampanhaMissoesRepository();
