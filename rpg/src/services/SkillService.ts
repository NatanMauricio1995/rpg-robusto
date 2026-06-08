import { SkillRepository } from "@/repositories/SkillRepository";
import { Skill } from "@/types/library";

export class SkillService {
  static async listSkills(): Promise<Skill[]> {
    return await SkillRepository.getAll();
  }

  static async getSkill(id: string): Promise<Skill | null> {
    return await SkillRepository.getById(id);
  }

  static async saveSkill(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome da perícia é obrigatório.");
    if (!data.attribute) throw new Error("O atributo associado é obrigatório.");
    
    const all = await this.listSkills();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe uma perícia com este nome.");
    }

    return await SkillRepository.create(data);
  }

  static async updateSkill(id: string, data: Partial<Skill>): Promise<void> {
    if (data.name) {
      const all = await this.listSkills();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outra perícia com este nome.");
      }
    }
    
    await SkillRepository.update(id, data);
  }

  static async deleteSkill(id: string): Promise<void> {
    await SkillRepository.delete(id);
  }
}
