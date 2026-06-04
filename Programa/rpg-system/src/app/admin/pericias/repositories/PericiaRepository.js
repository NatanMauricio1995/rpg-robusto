import BaseRepository from '../../../../repositories/BaseRepository';

class PericiaRepository extends BaseRepository {
  constructor() {
    super('pericias');
  }
}

export default new PericiaRepository();
