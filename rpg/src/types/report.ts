export interface CampaignMetrics {
  totalSessions: number;
  totalHours: number;
  combatsWon: number;
  goldEarned: number;
}

export interface PlayerStats {
  id: string;
  name: string;
  level: number;
  exp: {
    current: number;
    next: number;
  };
  kills: number;
  assists: number;
}

export interface ReportData {
  metrics: CampaignMetrics;
  playerStats: PlayerStats[];
}
