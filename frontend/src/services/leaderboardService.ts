import { Player, LeaderboardData, BackendPlayer } from "@/types/leaderboard";
import { apiService } from "./apiService";

// Real-time leaderboard service with backend integration
export class LeaderboardService {
  private players: Player[] = [];
  private subscribers: ((data: LeaderboardData) => void)[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;

  constructor() {
    this.startRealtimeUpdates();
  }

  // Subscribe to leaderboard updates
  subscribe(callback: (data: LeaderboardData) => void): () => void {
    this.subscribers.push(callback);

    // Send initial data if available
    if (this.players.length > 0) {
      callback({
        players: this.players,
        lastUpdated: new Date(),
      });
    }

    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  // Start real-time updates by polling backend
  private startRealtimeUpdates(): void {
    // Initial fetch
    this.fetchPlayersFromBackend();

    // Poll every 3 seconds
    this.updateInterval = setInterval(() => {
      this.fetchPlayersFromBackend();
    }, 3000);
  }

  // Fetch players from backend API
  private async fetchPlayersFromBackend(): Promise<void> {
    if (this.isPolling) return; // Prevent concurrent requests

    this.isPolling = true;

    try {
      const backendPlayers = await apiService.getPlayers();
      const newPlayers = this.convertBackendPlayersToFrontend(backendPlayers);

      // Detect changes and update animations
      this.processPlayerUpdates(newPlayers);

      // Update players list
      this.players = newPlayers;

      // Notify subscribers
      this.notifySubscribers();
    } catch (error) {
      console.error("Error fetching players from backend:", error);

      // If this is the first fetch and it fails, show empty state
      if (this.players.length === 0) {
        this.notifySubscribers();
      }
    } finally {
      this.isPolling = false;
    }
  }

  // Convert backend players to frontend format with ranks
  private convertBackendPlayersToFrontend(
    backendPlayers: BackendPlayer[]
  ): Player[] {
    // Sort by score descending and assign ranks
    const sortedPlayers = [...backendPlayers].sort((a, b) => b.score - a.score);

    return sortedPlayers.map((backendPlayer, index) => ({
      rank: index + 1,
      name: backendPlayer.name,
      score: backendPlayer.score,
      player_id: backendPlayer.player_id,
      id: `${backendPlayer.player_id}-${backendPlayer.name}`,
      previousRank: undefined,
      previousScore: undefined,
      isNew: false,
      rankChange: "same" as const,
    }));
  }

  // Process player updates and detect changes for animations
  private processPlayerUpdates(newPlayers: Player[]): void {
    const oldPlayerMap = new Map(this.players.map((p) => [p.player_id, p]));

    newPlayers.forEach((newPlayer) => {
      const oldPlayer = oldPlayerMap.get(newPlayer.player_id);

      if (oldPlayer) {
        // Player exists - check for changes
        if (oldPlayer.score !== newPlayer.score) {
          newPlayer.previousScore = oldPlayer.score;
        }

        if (oldPlayer.rank !== newPlayer.rank) {
          newPlayer.previousRank = oldPlayer.rank;
          newPlayer.rankChange =
            newPlayer.rank < oldPlayer.rank ? "up" : "down";
        } else {
          newPlayer.rankChange = "same";
        }
      } else {
        // New player
        newPlayer.isNew = true;
        newPlayer.rankChange = "same";
      }
    });
  }

  // Notify all subscribers of updates
  private notifySubscribers(): void {
    const data: LeaderboardData = {
      players: this.players,
      lastUpdated: new Date(),
    };

    this.subscribers.forEach((callback) => {
      callback(data);
    });
  }

  // Get current players (for external access)
  getCurrentPlayers(): Player[] {
    return [...this.players];
  }

  // Clean up when service is destroyed
  destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscribers = [];
  }
}

// Create a singleton instance
export const leaderboardService = new LeaderboardService();
