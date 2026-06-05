import BaseRepository from './BaseRepository';

class FichaInventarioRepository extends BaseRepository {
  constructor() {
    super('fichaInventario');
  }

  async findByFichaId(fichaId) {
    return await this.search({ fichaCampanhaId: fichaId });
  }
}

export default new FichaInventarioRepository();
