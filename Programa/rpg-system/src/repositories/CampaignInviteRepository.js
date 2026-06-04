import BaseRepository from './BaseRepository';

/**
 * CampaignInviteRepository - Gerenciamento da coleção 'campanhaConvites'
 */
class CampaignInviteRepository extends BaseRepository {
  constructor() {
    super('campanhaConvites');
  }

  async findByCampaign(campanhaId) {
    return this.search({ campanhaId });
  }

  async findByUser(usuarioId) {
    return this.search({ usuarioId });
  }

  async findPending(campanhaId, usuarioId) {
    return this.search({ campanhaId, usuarioId, status: 'PENDENTE' });
  }
}

export default new CampaignInviteRepository();
