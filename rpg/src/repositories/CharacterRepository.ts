import { Character, CharacterStatus } from "@/types/character";

// Repository: Responsável estrito por chamadas ao banco de dados (simulado)
export class CharacterRepository {
  private static collection = 'characters';

  static async getAll(): Promise<Character[]> {
    console.log(`[Repository] Buscando todos em ${this.collection}`);
    // Simulação de retorno do Firestore
    return []; 
  }

  static async getById(id: string): Promise<Character | null> {
    console.log(`[Repository] Buscando ${id} em ${this.collection}`);
    return null;
  }

  static async updateStatus(id: string, status: CharacterStatus): Promise<void> {
    console.log(`[Repository] Atualizando status de ${id} para ${status}`);
    // await updateDoc(doc(db, this.collection, id), { status });
  }

  static async create(data: Partial<Character>): Promise<string> {
    console.log(`[Repository] Persistindo novo personagem`);
    return "new-id-123";
  }
}
