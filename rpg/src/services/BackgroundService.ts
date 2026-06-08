import { BackgroundRepository } from "@/repositories/BackgroundRepository";
import { Background } from "@/types/library";

export class BackgroundService {
  static async listBackgrounds(): Promise<Background[]> {
    return await BackgroundRepository.getAll();
  }

  static async getBackground(id: string): Promise<Background | null> {
    return await BackgroundRepository.getById(id);
  }

  static async saveBackground(data: Omit<Background, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome do antecedente é obrigatório.");
    
    const all = await this.listBackgrounds();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe um antecedente com este nome.");
    }

    return await BackgroundRepository.create(data);
  }

  static async updateBackground(id: string, data: Partial<Background>): Promise<void> {
    if (data.name) {
      const all = await this.listBackgrounds();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outro antecedente com este nome.");
      }
    }
    
    await BackgroundRepository.update(id, data);
  }

  static async deleteBackground(id: string): Promise<void> {
    await BackgroundRepository.delete(id);
  }
}
