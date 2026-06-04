import BaseRepository from './BaseRepository';

/**
 * LootRepository - Repositório para gerenciamento da coleção 'combatLoots'
 * Centraliza o armazenamento de recompensas geradas em combates.
 */
class LootRepository extends BaseRepository {
  constructor() {
    super('combatLoots');
  }

  async findByCombat(combatId) {
    return this.search({ combatId });
  }

  async findPendingLoot(campanhaId) {
    return this.search({ campanhaId, status: 'PENDENTE' });
  }

  async findByCampaign(campanhaId) {
    return this.search({ campanhaId });
  }
}

export default new LootRepository();
