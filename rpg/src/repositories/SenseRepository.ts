import { Sense } from "@/types/library";

export class SenseRepository {
  private static collection = 'sentidos';

  static async getAll(): Promise<Sense[]> {
    console.log(`[Repository] Buscando todos em ${this.collection}`);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.collection);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  }

  static async getById(id: string): Promise<Sense | null> {
    const all = await this.getAll();
    return all.find(i => i.id === id) || null;
  }

  static async create(data: Omit<Sense, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const id = `SEN${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
    const now = new Date().toISOString();
    const newSense: Sense = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now
    };

    const all = await this.getAll();
    all.push(newSense);
    localStorage.setItem(this.collection, JSON.stringify(all));
    return id;
  }

  static async update(id: string, data: Partial<Sense>): Promise<void> {
    const all = await this.getAll();
    const index = all.findIndex(i => i.id === id);
    if (index !== -1) {
      all[index] = { 
        ...all[index], 
        ...data, 
        updatedAt: new Date().toISOString() 
      };
      localStorage.setItem(this.collection, JSON.stringify(all));
    }
  }

  static async delete(id: string): Promise<void> {
    const all = await this.getAll();
    const filtered = all.filter(i => i.id !== id);
    localStorage.setItem(this.collection, JSON.stringify(filtered));
  }
}
