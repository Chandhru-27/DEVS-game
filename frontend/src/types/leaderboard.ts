export interface Player {
  rank: number;
  name: string;
  score: number;
  player_id: number; // Backend player ID
  id?: string; // Unique identifier for tracking changes
  previousRank?: number; // For animation purposes
  previousScore?: number; // For animation purposes
  isNew?: boolean; // For new player animations
  rankChange?: "up" | "down" | "same"; // For rank change animations
}

// Backend player interface (matches backend model)
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
