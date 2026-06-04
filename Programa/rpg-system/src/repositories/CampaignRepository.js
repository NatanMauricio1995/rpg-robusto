import BaseRepository from './BaseRepository';

/**
 * CampaignRepository - Repositório para gerenciamento da coleção 'campanhas'
 * Conforme Capítulo 4 da Arquitetura BackEnd
 */
class CampaignRepository extends BaseRepository {
  constructor() {
    super('campanhas');
  }
}

export default new CampaignRepository();
