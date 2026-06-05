import BaseRepository from './BaseRepository';

/**
 * CombateEfeitosAtivosRepository - Gerencia os efeitos/condições ativos em um combate
 */
class CombateEfeitosAtivosRepository extends BaseRepository {
  constructor() {
    super('combateEfeitosAtivos');
  }

  async findByTarget(targetId) {
    return await this.search({ targetId });
  }

  async findByCombat(combatId) {
    return await this.search({ combatId });
  }
}

export default new CombateEfeitosAtivosRepository();
