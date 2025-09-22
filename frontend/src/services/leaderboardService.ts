import { Player, LeaderboardData } from "@/types/leaderboard";

// Mock data for initial leaderboard
const initialPlayers: Player[] = [
  { rank: 1, name: "Alex Chen", score: 15420 },
  { rank: 2, name: "Sarah Johnson", score: 14890 },
  { rank: 3, name: "Mike Rodriguez", score: 14230 },
  { rank: 4, name: "Emma Wilson", score: 13850 },
  { rank: 5, name: "David Kim", score: 13520 },
  { rank: 6, name: "Lisa Zhang", score: 13180 },
  { rank: 7, name: "Tom Anderson", score: 12890 },
  { rank: 8, name: "Nina Patel", score: 12540 },
  { rank: 9, name: "Chris Taylor", score: 12200 },
  { rank: 10, name: "Maya Singh", score: 11850 },
];

// Simulate realtime updates
export class LeaderboardService {
  private players: Player[] = [...initialPlayers];
  private subscribers: ((data: LeaderboardData) => void)[] = [];
  private updateInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.startRealtimeUpdates();
  }

  // Subscribe to leaderboard updates
  subscribe(callback: (data: LeaderboardData) => void): () => void {
    this.subscribers.push(callback);

    // Send initial data
    callback({
      players: this.players,
      lastUpdated: new Date(),
    });

    // Return unsubscribe function
    return () => {
      this.subscribers = this.subscribers.filter((sub) => sub !== callback);
    };
  }

  // Start simulating realtime updates
  private startRealtimeUpdates(): void {
    this.updateInterval = setInterval(() => {
      this.simulateUpdate();
    }, 3000 + Math.random() * 2000); // Update every 3-5 seconds
  }

  // Simulate a player score update
  private simulateUpdate(): void {
    const playerIndex = Math.floor(Math.random() * this.players.length);
    const currentPlayer = this.players[playerIndex];

    // Randomly increase score (10-100 points)
    const scoreIncrease = Math.floor(Math.random() * 90) + 10;
    const newScore = currentPlayer.score + scoreIncrease;

    // Update the player's score
    this.players[playerIndex] = {
      ...currentPlayer,
      score: newScore,
    };

    // Re-sort players by score
    this.players.sort((a, b) => b.score - a.score);

    // Update ranks
    this.players.forEach((player, index) => {
      player.rank = index + 1;
    });

    // Notify subscribers
    this.notifySubscribers();
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
