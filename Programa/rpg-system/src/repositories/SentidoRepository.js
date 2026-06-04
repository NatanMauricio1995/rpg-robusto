import BaseRepository from './BaseRepository';

class SentidoRepository extends BaseRepository {
  constructor() {
    super('sentidos');
  }
}

export default new SentidoRepository();
