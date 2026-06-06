import { Character, CharacterStatus } from "@/types/character";
import { CharacterRepository } from "@/repositories/CharacterRepository";

// Service: Camada de Regras de Negócio e Orquestração
export class CharacterService {
  
  static async listForAdmin(): Promise<Character[]> {
    // Regra: Somente personagens ativos ou pendentes são relevantes para a lista rápida
    const data = await CharacterRepository.getAll();
    return data.filter(c => c.status !== 'Arquivado');
  }

  static async approve(id: string): Promise<void> {
    // Regra: Ao aprovar, o personagem ganha HP base se estiver zerado (exemplo de regra)
    const char = await CharacterRepository.getById(id);
    if (!char) throw new Error("Personagem não encontrado");
    
    await CharacterRepository.updateStatus(id, 'Aprovado');
    console.log(`[Service] Personagem ${id} aprovado com sucesso.`);
  }

  static async submitNew(data: Partial<Character>): Promise<void> {
    // Regra: Todo personagem novo entra como 'Pendente'
    const payload = {
      ...data,
      status: 'Pendente' as CharacterStatus,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await CharacterRepository.create(payload);
  }
}
