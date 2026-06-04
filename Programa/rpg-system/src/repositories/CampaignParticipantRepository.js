import BaseRepository from './BaseRepository';

/**
 * CampaignParticipantRepository - Gerenciamento da coleção 'campanhaParticipantes'
 */
class CampaignParticipantRepository extends BaseRepository {
  constructor() {
    super('campanhaParticipantes');
  }

  async findByCampaign(campanhaId) {
    return this.search({ campanhaId });
  }

  async findByUser(usuarioId) {
    return this.search({ usuarioId });
  }

  async findActiveParticipants(campanhaId) {
    return this.search({ campanhaId, status: 'ATIVO' });
  }

  async findSpecific(campanhaId, personagemId) {
    return this.search({ campanhaId, personagemId });
  }
}

export default new CampaignParticipantRepository();
