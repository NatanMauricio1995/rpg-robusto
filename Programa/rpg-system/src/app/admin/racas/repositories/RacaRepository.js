import BaseRepository from '../../../../repositories/BaseRepository';

class RacaRepository extends BaseRepository {
  constructor() {
    super('racas');
  }
}

export default new RacaRepository();
