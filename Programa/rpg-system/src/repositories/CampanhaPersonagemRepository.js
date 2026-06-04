import BaseRepository from './BaseRepository';

/**
 * CampanhaPersonagemRepository - Repositório para fichas de personagem em campanhas
 * Conforme Capítulo 4 da Arq. BackEnd
 */
class CampanhaPersonagemRepository extends BaseRepository {
  constructor() {
    super('campanhaPersonagens');
  }

  async findByCampanha(campanhaId) {
    return this.search({ campanhaId });
  }

  async findByPersonagem(personagemId) {
    return this.search({ personagemId });
  }

  async findByUsuario(userId) {
    return this.search({ userId });
  }

  async findByCampanhaAndPersonagem(campanhaId, personagemId) {
    const res = await this.search({ campanhaId, personagemId });
    return res[0] || null;
  }
}

export default new CampanhaPersonagemRepository();
