import BaseRepository from './BaseRepository';

class EfeitosCombateRepository extends BaseRepository {
  constructor() {
    super('efeitosCombate');
  }
}

export default new EfeitosCombateRepository();
