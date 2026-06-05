import BaseRepository from './BaseRepository';
import { query, where, getDocs } from 'firebase/firestore';

/**
 * CampanhaMissoesRepository - Gerencia a persistência das instâncias de missões em campanhas
 */
class CampanhaMissoesRepository extends BaseRepository {
  constructor() {
    super('campanhaMissoes');
  }

  async findByCampaignId(campanhaId) {
    return await this.search({ campanhaId }, 'status');
  }

  async findByMissionId(missaoId) {
    return await this.search({ missaoId });
  }

  async findByCapituloId(capituloId) {
    return await this.search({ capituloId });
  }

  async findAssociation(campanhaId, missaoId) {
    try {
      const q = query(
        this.collectionRef,
        where('campanhaId', '==', campanhaId),
        where('missaoId', '==', missaoId)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error(`Error finding association in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

export default new CampanhaMissoesRepository();
