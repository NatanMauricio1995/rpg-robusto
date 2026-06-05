import CampaignSheetRepository from '../repositories/CampaignSheetRepository';
import { CampaignSheet, ApprovalStatus } from '../models/Character';

export default class CampaignSheetService {
  private repo: CampaignSheetRepository;

  constructor() {
    this.repo = new CampaignSheetRepository();
  }

  /**
   * Links a character to a campaign (RN-025).
   */
  async linkCharacterToCampaign(campanhaId: string, personagemId: string, userId: string): Promise<string> {
    const existing = await this.repo.findByCampaignAndCharacter(campanhaId, personagemId);
    if (existing) throw new Error('Personagem já está vinculado a esta campanha');

    const newSheet: CampaignSheet = {
      campanhaId,
      personagemId,
      userId,
      status: ApprovalStatus.PENDENTE,
    };

    return this.repo.create(newSheet);
  }

  async updateSheet(id: string, data: Partial<CampaignSheet>): Promise<string> {
    return this.repo.update(id, data);
  }

  async getSheetByCampaignAndCharacter(campanhaId: string, personagemId: string): Promise<CampaignSheet | null> {
    return this.repo.findByCampaignAndCharacter(campanhaId, personagemId);
  }

  async listCampaignSheets(campanhaId: string): Promise<CampaignSheet[]> {
    return this.repo.findByCampaign(campanhaId);
  }

  /**
   * Only Master can approve a character in a campaign (RN-031).
   */
  async approveCharacterInCampaign(id: string, userRole: string): Promise<string> {
    if (userRole !== 'MESTRE') throw new Error('Apenas o Mestre pode aprovar o personagem na campanha');
    return this.repo.update(id, { status: ApprovalStatus.APROVADO });
  }
}
