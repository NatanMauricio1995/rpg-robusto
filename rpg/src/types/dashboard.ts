export interface DashboardStats {
  activeCampaigns: number;
  totalCharacters: number;
  nextSessionDate: string | null;
  libraryItems: number;
}

export interface ActivityItem {
  id: string;
  type: 'character' | 'campaign' | 'session' | 'system';
  description: string;
  timestamp: string;
  user: string;
}

export interface DashboardData {
  stats: DashboardStats;
  recentActivities: ActivityItem[];
}
