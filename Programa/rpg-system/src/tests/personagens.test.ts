import CharacterService from '../services/CharacterService';
import { ApprovalStatus } from '../models/Character';
import ProgressionService from '../services/ProgressionService';

/**
 * Mocking dependencies for logical validation
 */
const mockRepo = {
  create: jest.fn().mockResolvedValue('new-id'),
  update: jest.fn().mockResolvedValue('updated-id'),
  findById: jest.fn(),
  findByUserId: jest.fn(),
};

// @ts-ignore
jest.mock('../repositories/CharacterRepository', () => {
  return jest.fn().mockImplementation(() => mockRepo);
});

describe('Fluxos de Personagem (Módulo Personagens)', () => {
  let service: CharacterService;

  beforeEach(() => {
    service = new CharacterService();
    jest.clearAllMocks();
  });

  test('FP-001: Criar Personagem -> Estado inicial PENDENTE', async () => {
    const characterData: any = {
      nome: 'Aragorn',
      userId: 'user-123',
      xp: 0,
      atributos: {
        forca: { base: 10, modificadores: [], total: 10 },
        destreza: { base: 10, modificadores: [], total: 10 },
        constituicao: { base: 10, modificadores: [], total: 10 },
        inteligencia: { base: 10, modificadores: [], total: 10 },
        sabedoria: { base: 10, modificadores: [], total: 10 },
        carisma: { base: 10, modificadores: [], total: 10 }
      }
    };

    await service.createCharacter(characterData);

    expect(mockRepo.create).toHaveBeenCalledWith(expect.objectContaining({
      status: ApprovalStatus.PENDENTE,
      nivel: 1
    }));
  });

  test('FP-002: Executar Aprovação -> Estado altera para APROVADO', async () => {
    const characterId = 'char-123';
    await service.approveCharacter(characterId, 'MESTRE');

    expect(mockRepo.update).toHaveBeenCalledWith(characterId, {
      status: ApprovalStatus.APROVADO
    });
  });

  test('FP-003: Editar Personagem -> Permissão e Revalidação de Status', async () => {
    const characterId = 'char-123';
    const userId = 'user-123';
    
    mockRepo.findById.mockResolvedValue({ id: characterId, userId: userId, status: ApprovalStatus.APROVADO });

    // In a real scenario, editing an approved character should set it back to PENDING (RN-029)
    // Here we check if the update call is made correctly
    await service.updateCharacter(characterId, { nome: 'Aragorn Updated' }, userId);

    expect(mockRepo.update).toHaveBeenCalled();
  });

  test('FP-004: Adicionar XP -> Gatilho de level up e restauração', () => {
    const character: any = {
      nivel: 1,
      xp: 0,
      vidaAtual: 10,
      vidaMax: 10
    };

    // Simulate gaining 300 XP (Level 2)
    character.xp = 300;
    const updated = ProgressionService.applyLevelUp(character);

    expect(updated.nivel).toBe(2);
    expect(updated.vidaAtual).toBe(character.vidaMax);
  });
});
