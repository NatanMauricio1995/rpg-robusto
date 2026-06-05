import BaseRepository from './BaseRepository';
import { CampaignSheet } from '../models/Character';
import { query, where, getDocs } from 'firebase/firestore';

export default class CampaignSheetRepository extends BaseRepository<CampaignSheet> {
  constructor() {
    super('fichasCampanha');
  }

  async findByCampaignAndCharacter(campanhaId: string, personagemId: string): Promise<CampaignSheet | null> {
    const q = query(this.collectionRef, 
      where('campanhaId', '==', campanhaId), 
      where('personagemId', '==', personagemId)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return null;
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as CampaignSheet;
  }

  async findByCampaign(campanhaId: string): Promise<CampaignSheet[]> {
    return this.findByField('campanhaId', campanhaId);
  }
}
