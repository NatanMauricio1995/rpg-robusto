import BaseRepository from './BaseRepository';

class SubRacaRepository extends BaseRepository {
  constructor() {
    super('subRacas');
  }
}

export default new SubRacaRepository();
