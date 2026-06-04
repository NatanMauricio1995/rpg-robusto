import BaseRepository from './BaseRepository';

class ReceitaRepository extends BaseRepository {
  constructor() {
    super('receitas');
  }
}

export default new ReceitaRepository();
