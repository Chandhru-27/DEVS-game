import { Player, LeaderboardData, BackendPlayer } from "@/types/leaderboard";
import { apiService } from "./apiService";

export class LeaderboardService {
  private players: Player[] = [];
  private subscribers: ((data: LeaderboardData) => void)[] = [];
  private updateInterval: NodeJS.Timeout | null = null;
  private isPolling: boolean = false;

  constructor() {
    this.startRealtimeUpdates();
  }

  subscribe(callback: (data: LeaderboardData) => void): () => void {
    this.subscribers.push(callback);

    if (this.players.length > 0) {
      callback({
        players: this.players,
        lastUpdated: new Date(),
      });
    }

    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  private startRealtimeUpdates(): void {
    this.fetchPlayersFromBackend();

    this.updateInterval = setInterval(() => {
      this.fetchPlayersFromBackend();
    }, 3000);
  }

  private async fetchPlayersFromBackend(): Promise<void> {
    if (this.isPolling) return; // Prevent concurrent requests

    this.isPolling = true;

    try {
      const backendPlayers = await apiService.getPlayers();
      const newPlayers = this.convertBackendPlayersToFrontend(backendPlayers);

      this.processPlayerUpdates(newPlayers);

      this.players = newPlayers;

      this.notifySubscribers();
    } catch (error) {
      console.error("Error fetching players from backend:", error);

      if (this.players.length === 0) {
        this.notifySubscribers();
      }
    } finally {
      this.isPolling = false;
    }
  }

  private convertBackendPlayersToFrontend(
    backendPlayers: BackendPlayer[]
  ): Player[] {
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

  private processPlayerUpdates(newPlayers: Player[]): void {
    const oldPlayerMap = new Map(this.players.map((p) => [p.player_id, p]));

    newPlayers.forEach((newPlayer) => {
      const oldPlayer = oldPlayerMap.get(newPlayer.player_id);

      if (oldPlayer) {
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
        newPlayer.isNew = true;
        newPlayer.rankChange = "same";
      }
    });
  }

  private notifySubscribers(): void {
    const data: LeaderboardData = {
      players: this.players,
      lastUpdated: new Date(),
    };

    this.subscribers.forEach((callback) => {
      callback(data);
    });
  }

  getCurrentPlayers(): Player[] {
    return [...this.players];
  }

  destroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
    this.subscribers = [];
  }
}

export const leaderboardService = new LeaderboardService();
