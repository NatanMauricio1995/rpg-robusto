import BaseRepository from './BaseRepository';

class NpcRepository extends BaseRepository {
  constructor() {
    super('npcs');
  }

  /**
   * Specific search for NPCs
   */
  async search(filters = {}) {
    // We can add specific filters here if needed
    // For now, use the base search
    return super.search(filters);
  }
}

export default new NpcRepository();
