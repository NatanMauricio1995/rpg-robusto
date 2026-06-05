import BaseRepository from './BaseRepository';

/**
 * FichaRecursoRepository - Gerencia os recursos individuais de cada ficha de campanha
 */
class FichaRecursoRepository extends BaseRepository {
  constructor() {
    super('fichaRecursos');
  }

  async findByFicha(fichaCampanhaId) {
    return this.search({ fichaCampanhaId });
  }

  async findByFichaAndName(fichaCampanhaId, nome) {
    const res = await this.search({ fichaCampanhaId, nome });
    return res[0] || null;
  }
}

export default new FichaRecursoRepository();
