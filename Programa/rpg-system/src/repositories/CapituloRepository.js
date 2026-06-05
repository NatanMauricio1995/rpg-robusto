import BaseRepository from './BaseRepository';

/**
 * CapituloRepository - Repositório para gerenciamento da coleção 'capitulos'
 * Conforme Capítulo 6 dos Modelos de Dados
 */
class CapituloRepository extends BaseRepository {
  constructor() {
    super('capitulos');
  }

  async findByCampaignId(campanhaId) {
    return this.search({ campanhaId }, 'ordem');
  }

  async findByOrder(campanhaId, ordem) {
    return this.search({ campanhaId, ordem });
  }
}

export default new CapituloRepository();
