"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Player, LeaderboardData } from "@/types/leaderboard";
import { leaderboardService } from "@/services/leaderboardService";
import { useLeaderboardAnimations } from "@/hooks/useLeaderboardAnimations";
import LeaderboardRow from "./LeaderboardRow";

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<LeaderboardData>({
    players: [],
    lastUpdated: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [visiblePlayers, setVisiblePlayers] = useState<Set<string>>(new Set());

  const {
    animationState,
    processUpdate,
    getPlayerAnimationClass,
    getScoreAnimationClass,
  } = useLeaderboardAnimations();

  // Memoize top 10 players to prevent unnecessary re-renders
  const topPlayers = useMemo(() => {
    return data.players.slice(0, 10).map((player, index) => ({
      ...player,
      id: `${player.player_id}-${player.name}-${player.rank}-${index}`,
    }));
  }, [data.players]);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = leaderboardService.subscribe((newData) => {
      // Process the update with animations
      processUpdate(newData);

      // Update data
      setData(newData);
      setIsLoading(false);

      // Update visible players with staggered animation
      const newVisiblePlayers = new Set<string>();
      newData.players.slice(0, 10).forEach((player, index) => {
        const playerId = `${player.player_id}-${player.name}-${player.rank}-${index}`;
        setTimeout(() => {
          setVisiblePlayers((prev) => new Set([...prev, playerId]));
        }, index * 50); // Stagger the visibility
        newVisiblePlayers.add(playerId);
      });
    });

    return () => {
      unsubscribe();
    };
  }, [processUpdate]);

  // Enhanced loading animation
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-400/20 border-t-purple-400 cyberpunk-glow"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="neon-cyan text-sm font-medium cyberpunk-text">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4 h-screen flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="text-center flex-shrink-0 mb-6">
        <h1 className="text-4xl md:text-5xl font-black neon-purple mb-1 tracking-wider animate-pulse">
          LEADERBOARD
        </h1>
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto cyberpunk-glow"></div>
      </div>

      {/* Table-style Leaderboard */}
      <div className="flex-1 overflow-hidden">
        <div className="cyberpunk-bg rounded-lg cyberpunk-border overflow-hidden transition-all duration-300">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-6 p-4 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border-b border-purple-400/30">
            <div className="neon-cyan font-bold text-base uppercase tracking-wider text-center cyberpunk-text">
              RANK
            </div>
            <div className="neon-cyan font-bold text-base uppercase tracking-wider text-center cyberpunk-text">
              NAME
            </div>
            <div className="neon-cyan font-bold text-base uppercase tracking-wider text-center cyberpunk-text">
              SCORE
            </div>
          </div>

          {/* Table Body with Smooth Animations */}
          <div className="h-full relative">
            {topPlayers.map((player, index) => (
              <LeaderboardRow
                key={player.id}
                player={player}
                index={index}
                animationClass={getPlayerAnimationClass(player)}
                scoreAnimationClass={getScoreAnimationClass(player)}
                isVisible={visiblePlayers.has(player.id)}
              />
            ))}

            {/* Empty state for when there are no players */}
            {topPlayers.length === 0 && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="neon-purple text-lg mb-2 cyberpunk-text">
                    No players yet
                  </div>
                  <div className="neon-cyan text-sm cyberpunk-text">
                    Waiting for game data...
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="text-center flex-shrink-0">
        <div className="inline-flex items-center gap-2 cyberpunk-bg rounded-full px-3 py-1 cyberpunk-border">
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse cyberpunk-glow"></div>
          <span className="neon-cyan text-xs cyberpunk-text">
            Live • Last updated: {data.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
