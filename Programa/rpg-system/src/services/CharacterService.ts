import CharacterRepository from '../repositories/CharacterRepository';
import { Character, ApprovalStatus } from '../models/Character';
import AttributeService from './AttributeService';
import ProgressionService from './ProgressionService';

export default class CharacterService {
  private repo: CharacterRepository;

  constructor() {
    this.repo = new CharacterRepository();
  }

  async createCharacter(characterData: Character): Promise<string> {
    this.validateCharacter(characterData);
    
    // Initial setup
    const newCharacter: Character = {
      ...characterData,
      status: ApprovalStatus.PENDENTE,
      nivel: ProgressionService.calculateLevel(characterData.xp || 0),
      atributos: AttributeService.calculateAllAttributes(characterData.atributos)
    };

    return this.repo.create(newCharacter);
  }

  async updateCharacter(id: string, characterData: Partial<Character>, currentUserId: string): Promise<string> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new Error('Personagem não encontrado');
    if (existing.userId !== currentUserId) throw new Error('Permissão negada');

    // If attributes changed, recalculate
    if (characterData.atributos) {
      characterData.atributos = AttributeService.calculateAllAttributes(characterData.atributos);
    }

    // If XP changed, check level up
    if (characterData.xp !== undefined) {
      const updatedWithLevel = ProgressionService.applyLevelUp({ ...existing, ...characterData } as Character);
      characterData.nivel = updatedWithLevel.nivel;
      characterData.vidaAtual = updatedWithLevel.vidaAtual;
      characterData.manaAtual = updatedWithLevel.manaAtual;
    }

    return this.repo.update(id, characterData);
  }

  /**
   * Only Master can approve characters (RN-031).
   */
  async approveCharacter(id: string, userRole: string): Promise<string> {
    if (userRole !== 'MESTRE') throw new Error('Apenas o Mestre pode aprovar personagens');
    return this.repo.update(id, { status: ApprovalStatus.APROVADO });
  }

  /**
   * Only Master can reject characters (RN-031).
   */
  async rejectCharacter(id: string, userRole: string): Promise<string> {
    if (userRole !== 'MESTRE') throw new Error('Apenas o Mestre pode reprovar personagens');
    return this.repo.update(id, { status: ApprovalStatus.REPROVADO });
  }

  validateCharacter(character: Character): void {
    if (!character.nome || character.nome.length < 3) {
      throw new Error('Nome do personagem é inválido');
    }
    if (!character.userId) {
      throw new Error('ID do usuário é obrigatório');
    }
  }

  async getCharacter(id: string): Promise<Character | null> {
    return this.repo.findById(id);
  }

  async listUserCharacters(userId: string): Promise<Character[]> {
    return this.repo.findByUserId(userId);
  }
}
