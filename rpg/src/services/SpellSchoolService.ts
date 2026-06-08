import { SpellSchoolRepository } from "@/repositories/SpellSchoolRepository";
import { SpellSchool } from "@/types/library";

export class SpellSchoolService {
  static async listSchools(): Promise<SpellSchool[]> {
    return await SpellSchoolRepository.getAll();
  }

  static async getSchool(id: string): Promise<SpellSchool | null> {
    return await SpellSchoolRepository.getById(id);
  }

  static async saveSchool(data: Omit<SpellSchool, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    if (!data.name) throw new Error("O nome da escola de magia é obrigatório.");
    
    const all = await this.listSchools();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe uma escola de magia com este nome.");
    }

    return await SpellSchoolRepository.create(data);
  }

  static async updateSchool(id: string, data: Partial<SpellSchool>): Promise<void> {
    if (data.name) {
      const all = await this.listSchools();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outra escola de magia com este nome.");
      }
    }
    
    await SpellSchoolRepository.update(id, data);
  }

  static async deleteSchool(id: string): Promise<void> {
    await SpellSchoolRepository.delete(id);
  }
}
