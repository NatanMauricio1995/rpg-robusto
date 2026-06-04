import BaseRepository from './BaseRepository';

class InimigoRepository extends BaseRepository {
  constructor() {
    super('inimigos');
  }

  async search(filters = {}) {
    return super.search(filters);
  }
}

export default new InimigoRepository();
