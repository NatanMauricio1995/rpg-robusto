import BaseRepository from '../../../../repositories/BaseRepository';

class ClasseRepository extends BaseRepository {
  constructor() {
    super('classes');
  }
}

export default new ClasseRepository();
