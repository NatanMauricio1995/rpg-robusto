import BaseRepository from './BaseRepository';

class ClasseRepository extends BaseRepository {
  constructor() {
    super('classes');
  }
}

export default new ClasseRepository();
