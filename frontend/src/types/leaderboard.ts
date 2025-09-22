export interface Player {
  rank: number;
  name: string;
  score: number;
}

export interface LeaderboardData {
  players: Player[];
  lastUpdated: Date;
}
