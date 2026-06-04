import BaseRepository from '../../../../repositories/BaseRepository';

class EscolaMagiaRepository extends BaseRepository {
  constructor() {
    super('escolasMagia');
  }
}

export default new EscolaMagiaRepository();
