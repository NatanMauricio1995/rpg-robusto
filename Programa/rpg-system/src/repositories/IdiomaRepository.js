import BaseRepository from './BaseRepository';

class IdiomaRepository extends BaseRepository {
  constructor() {
    super('idiomas');
  }

  // Specific method remains
  async checkNameExists(nome, excludeId = null) {
    return await this.exists('nome', nome, excludeId);
  }
}

export default new IdiomaRepository();
