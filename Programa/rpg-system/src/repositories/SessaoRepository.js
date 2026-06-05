import BaseRepository from './BaseRepository';
import { query, where, getDocs } from 'firebase/firestore';

/**
 * SessaoRepository - Gerencia a persistência de sessões de RPG
 */
class SessaoRepository extends BaseRepository {
  constructor() {
    super('sessoes');
  }

  async findByCampaignId(campanhaId) {
    return await this.search({ campanhaId }, 'numeroSessao');
  }

  async findByCapituloId(capituloId) {
    return await this.search({ capituloId }, 'numeroSessao');
  }

  async findByNumeroSessao(campanhaId, numeroSessao) {
    try {
      const q = query(
        this.collectionRef,
        where('campanhaId', '==', campanhaId),
        where('numeroSessao', '==', Number(numeroSessao))
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error(`Error finding session by number in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

export default new SessaoRepository();
