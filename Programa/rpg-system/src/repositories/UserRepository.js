import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository {
  constructor() {
    super('usuarios');
  }
}

export default new UserRepository();
