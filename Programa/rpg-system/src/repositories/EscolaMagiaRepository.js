import BaseRepository from './BaseRepository';

class EscolaMagiaRepository extends BaseRepository {
  constructor() {
    super('escolasMagia');
  }
}

export default new EscolaMagiaRepository();
