import { useState, useEffect, useRef, useCallback } from "react";
import { Player, LeaderboardData } from "@/types/leaderboard";

interface AnimationState {
  isAnimating: boolean;
  animationType?: "rank-change" | "score-change" | "new-player" | "player-exit";
}

interface PlayerAnimationState {
  [playerId: string]: {
    isAnimating: boolean;
    animationType?: string;
    previousRank?: number;
    previousScore?: number;
  };
}

export const useLeaderboardAnimations = () => {
  const [animationState, setAnimationState] = useState<AnimationState>({
    isAnimating: false,
  });

  const [playerAnimations, setPlayerAnimations] =
    useState<PlayerAnimationState>({});
  const previousDataRef = useRef<Player[]>([]);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Generate unique ID for players
  const generatePlayerId = useCallback((player: Player): string => {
    return `${player.player_id}-${player.name}-${player.rank}`;
  }, []);

  // Compare players and detect changes
  const detectChanges = useCallback(
    (oldPlayers: Player[], newPlayers: Player[]) => {
      const changes: {
        rankChanges: Player[];
        scoreChanges: Player[];
        newPlayers: Player[];
        removedPlayers: Player[];
      } = {
        rankChanges: [],
        scoreChanges: [],
        newPlayers: [],
        removedPlayers: [],
      };

      // Create maps for easier comparison using player_id
      const oldPlayerMap = new Map(oldPlayers.map((p) => [p.player_id, p]));
      const newPlayerMap = new Map(newPlayers.map((p) => [p.player_id, p]));

      // Detect new players
      newPlayers.forEach((newPlayer) => {
        if (!oldPlayerMap.has(newPlayer.player_id)) {
          changes.newPlayers.push(newPlayer);
        }
      });

      // Detect removed players
      oldPlayers.forEach((oldPlayer) => {
        if (!newPlayerMap.has(oldPlayer.player_id)) {
          changes.removedPlayers.push(oldPlayer);
        }
      });

      // Detect rank and score changes
      newPlayers.forEach((newPlayer) => {
        const oldPlayer = oldPlayerMap.get(newPlayer.player_id);
        if (oldPlayer) {
          if (oldPlayer.rank !== newPlayer.rank) {
            changes.rankChanges.push({
              ...newPlayer,
              previousRank: oldPlayer.rank,
              rankChange: newPlayer.rank < oldPlayer.rank ? "up" : "down",
            });
          }
          if (oldPlayer.score !== newPlayer.score) {
            changes.scoreChanges.push({
              ...newPlayer,
              previousScore: oldPlayer.score,
            });
          }
        }
      });

      return changes;
    },
    []
  );

  // Start animation for a specific player
  const startPlayerAnimation = useCallback(
    (playerId: string, animationType: string, duration: number = 800) => {
      setPlayerAnimations((prev) => ({
        ...prev,
        [playerId]: {
          isAnimating: true,
          animationType,
        },
      }));

      // Clear animation after duration
      setTimeout(() => {
        setPlayerAnimations((prev) => ({
          ...prev,
          [playerId]: {
            isAnimating: false,
            animationType: undefined,
          },
        }));
      }, duration);
    },
    []
  );

  // Process leaderboard updates with animations
  const processUpdate = useCallback(
    (newData: LeaderboardData) => {
      const changes = detectChanges(previousDataRef.current, newData.players);

      // Set global animation state
      setAnimationState({
        isAnimating: true,
        animationType: "rank-change",
      });

      // Clear any existing timeout
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      // Process different types of changes
      changes.newPlayers.forEach((player) => {
        const playerId = generatePlayerId(player);
        startPlayerAnimation(playerId, "new-player", 800);
      });

      changes.rankChanges.forEach((player) => {
        const playerId = generatePlayerId(player);
        startPlayerAnimation(playerId, "rank-change", 600);
      });

      changes.scoreChanges.forEach((player) => {
        const playerId = generatePlayerId(player);
        startPlayerAnimation(playerId, "score-change", 800);
      });

      // Clear global animation state after all animations complete
      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState({
          isAnimating: false,
          animationType: undefined,
        });
      }, 1000);

      // Update previous data
      previousDataRef.current = newData.players;
    },
    [detectChanges, generatePlayerId, startPlayerAnimation]
  );

  // Get animation class for a player
  const getPlayerAnimationClass = useCallback(
    (player: Player): string => {
      const playerId = generatePlayerId(player);
      const playerAnimation = playerAnimations[playerId];

      if (!playerAnimation?.isAnimating) return "";

      switch (playerAnimation.animationType) {
        case "new-player":
          return "animate-new-player";
        case "rank-change":
          return player.rankChange === "up"
            ? "animate-rank-up"
            : "animate-rank-down";
        case "score-change":
          return "animate-score-increase";
        default:
          return "";
      }
    },
    [playerAnimations, generatePlayerId]
  );

  // Get score animation class
  const getScoreAnimationClass = useCallback(
    (player: Player): string => {
      const playerId = generatePlayerId(player);
      const playerAnimation = playerAnimations[playerId];

      if (
        playerAnimation?.isAnimating &&
        playerAnimation.animationType === "score-change"
      ) {
        return "animate-score-increase";
      }
      return "";
    },
    [playerAnimations, generatePlayerId]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  return {
    animationState,
    playerAnimations,
    processUpdate,
    getPlayerAnimationClass,
    getScoreAnimationClass,
  };
};
