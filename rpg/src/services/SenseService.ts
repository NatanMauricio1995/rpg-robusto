import { SenseRepository } from "@/repositories/SenseRepository";
import { Sense } from "@/types/library";

export class SenseService {
  static async listSenses(): Promise<Sense[]> {
    return await SenseRepository.getAll();
  }

  static async getSense(id: string): Promise<Sense | null> {
    return await SenseRepository.getById(id);
  }

  static async saveSense(data: Omit<Sense, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome do sentido é obrigatório.");
    
    const all = await this.listSenses();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe um sentido com este nome.");
    }

    return await SenseRepository.create(data);
  }

  static async updateSense(id: string, data: Partial<Sense>): Promise<void> {
    if (data.name) {
      const all = await this.listSenses();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outro sentido com este nome.");
      }
    }
    
    await SenseRepository.update(id, data);
  }

  static async deleteSense(id: string): Promise<void> {
    await SenseRepository.delete(id);
  }
}
