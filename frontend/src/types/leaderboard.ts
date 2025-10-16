export interface Player {
  rank: number;
  name: string;
  score: number;
  player_id: number;
  id?: string;
  previousRank?: number;
  previousScore?: number;
  isNew?: boolean;
  rankChange?: "up" | "down" | "same";
}

export interface BackendPlayer {
  player_id: number;
  name: string;
  score: number;
}

export interface LeaderboardData {
  players: Player[];
  lastUpdated: Date;
}

export interface AnimationState {
  isAnimating: boolean;
  animationType?: "rank-change" | "score-change" | "new-player" | "player-exit";
}
