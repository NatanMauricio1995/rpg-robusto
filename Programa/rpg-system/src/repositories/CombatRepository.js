import BaseRepository from './BaseRepository';

/**
 * CombatRepository - Repositório para gerenciamento da coleção 'combates'
 * Conforme Capítulo 4 da Arq. BackEnd
 */
class CombatRepository extends BaseRepository {
  constructor() {
    super('combates');
  }

  async findByCampaign(campanhaId) {
    return this.search({ campanhaId });
  }

  async findActiveCombat(campanhaId) {
    const res = await this.search({ campanhaId, status: 'ATIVO' });
    return res[0] || null;
  }

  async findClosedCombats(campanhaId) {
    return this.search({ campanhaId, status: 'ENCERRADO' });
  }
}

export default new CombatRepository();
