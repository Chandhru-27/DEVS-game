// Demo utility to showcase leaderboard animations
// This can be used for testing and demonstration purposes

import { Player } from "@/types/leaderboard";

export const createDemoUpdate = (currentPlayers: Player[]): Player[] => {
  const players = [...currentPlayers];

  // Simulate different types of updates
  const updateType = Math.floor(Math.random() * 4);

  switch (updateType) {
    case 0:
      // Score increase with rank change
      return simulateScoreIncrease(players);
    case 1:
      // New player entry
      return simulateNewPlayer(players);
    case 2:
      // Multiple score updates
      return simulateMultipleUpdates(players);
    case 3:
      // Rank shuffle
      return simulateRankShuffle(players);
    default:
      return players;
  }
};

const simulateScoreIncrease = (players: Player[]): Player[] => {
  const randomIndex = Math.floor(Math.random() * Math.min(players.length, 5));
  const player = players[randomIndex];

  return players
    .map((p) => {
      if (p.name === player.name) {
        return {
          ...p,
          previousScore: p.score,
          previousRank: p.rank,
          score: p.score + Math.floor(Math.random() * 200) + 50,
        };
      }
      return p;
    })
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
      rankChange: p.previousRank
        ? index + 1 < p.previousRank
          ? "up"
          : index + 1 > p.previousRank
          ? "down"
          : "same"
        : "same",
    }));
};

const simulateNewPlayer = (players: Player[]): Player[] => {
  const newNames = [
    "Demo Player",
    "Test User",
    "Animation Demo",
    "Live Update",
  ];

  const availableNames = newNames.filter(
    (name) => !players.some((p) => p.name === name)
  );

  if (availableNames.length === 0) return players;

  const newPlayer: Player = {
    rank: players.length + 1,
    name: availableNames[0],
    score: Math.floor(Math.random() * 3000) + 10000,
    id: availableNames[0].toLowerCase().replace(" ", "-"),
    isNew: true,
    rankChange: "same",
  };

  const updatedPlayers = [...players, newPlayer]
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
      rankChange: p.isNew
        ? "same"
        : index + 1 < (p.previousRank || p.rank)
        ? "up"
        : index + 1 > (p.previousRank || p.rank)
        ? "down"
        : "same",
    }));

  return updatedPlayers;
};

const simulateMultipleUpdates = (players: Player[]): Player[] => {
  const numUpdates = Math.floor(Math.random() * 3) + 1;
  let updatedPlayers = [...players];

  for (let i = 0; i < numUpdates; i++) {
    const randomIndex = Math.floor(Math.random() * updatedPlayers.length);
    const player = updatedPlayers[randomIndex];

    updatedPlayers = updatedPlayers.map((p) => {
      if (p.name === player.name) {
        return {
          ...p,
          previousScore: p.score,
          previousRank: p.rank,
          score: p.score + Math.floor(Math.random() * 100) + 25,
        };
      }
      return p;
    });
  }

  return updatedPlayers
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({
      ...p,
      rank: index + 1,
      rankChange: p.previousRank
        ? index + 1 < p.previousRank
          ? "up"
          : index + 1 > p.previousRank
          ? "down"
          : "same"
        : "same",
    }));
};

const simulateRankShuffle = (players: Player[]): Player[] => {
  // Create a more dramatic rank change scenario
  const topPlayers = players.slice(0, 3);
  const shuffledTop = [...topPlayers].sort(() => Math.random() - 0.5);

  return players.map((player, index) => {
    const topIndex = topPlayers.findIndex((p) => p.name === player.name);
    if (topIndex !== -1) {
      const newPlayer = shuffledTop[topIndex];
      return {
        ...newPlayer,
        previousScore: player.score,
        previousRank: player.rank,
        rank: index + 1,
        rankChange:
          index + 1 < player.rank
            ? "up"
            : index + 1 > player.rank
            ? "down"
            : "same",
      };
    }
    return player;
  });
};

// Export demo data for testing
export const demoPlayers: Player[] = [
  { rank: 1, name: "Alex Chen", score: 15420, id: "alex-chen" },
  { rank: 2, name: "Sarah Johnson", score: 14890, id: "sarah-johnson" },
  { rank: 3, name: "Mike Rodriguez", score: 14230, id: "mike-rodriguez" },
  { rank: 4, name: "Emma Wilson", score: 13850, id: "emma-wilson" },
  { rank: 5, name: "David Kim", score: 13520, id: "david-kim" },
  { rank: 6, name: "Lisa Zhang", score: 13180, id: "lisa-zhang" },
  { rank: 7, name: "Tom Anderson", score: 12890, id: "tom-anderson" },
  { rank: 8, name: "Nina Patel", score: 12540, id: "nina-patel" },
  { rank: 9, name: "Chris Taylor", score: 12200, id: "chris-taylor" },
  { rank: 10, name: "Maya Singh", score: 11850, id: "maya-singh" },
];
