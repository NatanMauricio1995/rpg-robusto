import { WorldRepository } from "@/repositories/WorldRepository";
import { World } from "@/types/world";

export class WorldService {
  static async listWorlds(): Promise<World[]> {
    return await WorldRepository.getAll();
  }

  static async getWorld(id: string): Promise<World | null> {
    return await WorldRepository.getById(id);
  }

  static async saveWorld(data: Omit<World, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome do mundo é obrigatório.");
    if (!data.system) throw new Error("O sistema de jogo é obrigatório.");
    
    const all = await this.listWorlds();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe um mundo com este nome.");
    }

    return await WorldRepository.create(data);
  }

  static async updateWorld(id: string, data: Partial<World>): Promise<void> {
    if (data.name) {
      const all = await this.listWorlds();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outro mundo com este nome.");
      }
    }
    
    await WorldRepository.update(id, data);
  }

  static async deleteWorld(id: string): Promise<void> {
    await WorldRepository.delete(id);
  }
}
