import { ProficiencyRepository } from "@/repositories/ProficiencyRepository";
import { Proficiency } from "@/types/library";

export class ProficiencyService {
  static async listProficiencies(): Promise<Proficiency[]> {
    return await ProficiencyRepository.getAll();
  }

  static async getProficiency(id: string): Promise<Proficiency | null> {
    return await ProficiencyRepository.getById(id);
  }

  static async saveProficiency(data: Omit<Proficiency, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome da proficiência é obrigatório.");
    
    const all = await this.listProficiencies();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe uma proficiência com este nome.");
    }

    return await ProficiencyRepository.create(data);
  }

  static async updateProficiency(id: string, data: Partial<Proficiency>): Promise<void> {
    if (data.name) {
      const all = await this.listProficiencies();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outra proficiência com este nome.");
      }
    }
    
    await ProficiencyRepository.update(id, data);
  }

  static async deleteProficiency(id: string): Promise<void> {
    await ProficiencyRepository.delete(id);
  }
}
