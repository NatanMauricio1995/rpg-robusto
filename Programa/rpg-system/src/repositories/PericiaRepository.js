import BaseRepository from './BaseRepository';

class PericiaRepository extends BaseRepository {
  constructor() {
    super('pericias');
  }
}

export default new PericiaRepository();
