import BaseRepository from './BaseRepository';

class ProficienciaRepository extends BaseRepository {
  constructor() {
    super('proficiencias');
  }
}

export default new ProficienciaRepository();
