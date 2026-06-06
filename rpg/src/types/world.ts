export type WorldCategory = 'Geografia' | 'História' | 'Divindades' | 'Organizações' | 'Lendas' | 'Outros';

export interface WorldEntry {
  id: string;
  title: string;
  category: WorldCategory;
  summary: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  lastUpdated: string;
}

export interface WorldState {
  entries: WorldEntry[];
  selectedCategory: WorldCategory | 'Todas';
  searchQuery: string;
}
