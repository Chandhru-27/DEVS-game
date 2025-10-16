const API_BASE_URL = "/api/players";

export interface BackendPlayer {
  player_id: number;
  name: string;
  score: number;
}

export interface PlayersResponse {
  players: BackendPlayer[];
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async getPlayers(): Promise<BackendPlayer[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PlayersResponse = await response.json();
      return data.players;
    } catch (error) {
      console.error("Error fetching players:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
