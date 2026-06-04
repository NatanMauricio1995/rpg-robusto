import BaseRepository from '../../../../repositories/BaseRepository';

class SubRacaRepository extends BaseRepository {
  constructor() {
    super('subRacas');
  }
}

export default new SubRacaRepository();
