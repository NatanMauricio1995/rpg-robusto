import BaseRepository from './BaseRepository';

class RacaRepository extends BaseRepository {
  constructor() {
    super('racas');
  }
}

export default new RacaRepository();
