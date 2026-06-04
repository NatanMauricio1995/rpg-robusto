import BaseRepository from '../../../../repositories/BaseRepository';

class ProficienciaRepository extends BaseRepository {
  constructor() {
    super('proficiencias');
  }
}

export default new ProficienciaRepository();
