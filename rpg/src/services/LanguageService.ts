import { LanguageRepository } from "@/repositories/LanguageRepository";
import { Language } from "@/types/library";

export class LanguageService {
  static async listLanguages(): Promise<Language[]> {
    return await LanguageRepository.getAll();
  }

  static async getLanguage(id: string): Promise<Language | null> {
    return await LanguageRepository.getById(id);
  }

  static async saveLanguage(data: Omit<Language, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Regra: Nome é obrigatório e único (simulado)
    if (!data.name) throw new Error("O nome do idioma é obrigatório.");
    
    const all = await this.listLanguages();
    if (all.some(i => i.name.toLowerCase() === data.name.toLowerCase())) {
      throw new Error("Já existe um idioma com este nome.");
    }

    return await LanguageRepository.create(data);
  }

  static async updateLanguage(id: string, data: Partial<Language>): Promise<void> {
    if (data.name) {
      const all = await this.listLanguages();
      if (all.some(i => i.id !== id && i.name.toLowerCase() === data.name?.toLowerCase())) {
        throw new Error("Já existe outro idioma com este nome.");
      }
    }
    
    await LanguageRepository.update(id, data);
  }

  static async deleteLanguage(id: string): Promise<void> {
    // Poderia haver regra para não excluir idiomas em uso por raças
    await LanguageRepository.delete(id);
  }
}
