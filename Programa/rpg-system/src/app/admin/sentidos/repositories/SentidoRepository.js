import BaseRepository from '../../../../repositories/BaseRepository';

class SentidoRepository extends BaseRepository {
  constructor() {
    super('sentidos');
  }
}

export default new SentidoRepository();
