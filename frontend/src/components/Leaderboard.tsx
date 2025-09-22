"use client";

import React, { useState, useEffect } from "react";
import { Player, LeaderboardData } from "@/types/leaderboard";
import { leaderboardService } from "@/services/leaderboardService";

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<LeaderboardData>({
    players: [],
    lastUpdated: new Date(),
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = leaderboardService.subscribe((newData) => {
      setData(newData);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const getTrophyEmoji = (rank: number): string => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  };

  const getRankColor = (rank: number): string => {
    switch (rank) {
      case 1:
        return "from-white to-gray-200";
      case 2:
        return "from-gray-300 to-gray-500";
      case 3:
        return "from-gray-400 to-gray-600";
      default:
        return "from-white/20 to-white/40";
    }
  };

  const getRankGlow = (rank: number): string => {
    switch (rank) {
      case 1:
        return "shadow-white/50";
      case 2:
        return "shadow-gray-300/50";
      case 3:
        return "shadow-gray-400/50";
      default:
        return "shadow-white/20";
    }
  };

  const formatScore = (score: number): string => {
    return score.toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-white/60 animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-4 h-screen flex flex-col gap-2 overflow-hidden">
      {/* Header */}
      <div className="text-center flex-shrink-0 mb-6">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-1 tracking-wider drop-shadow-2xl">
          LEADERBOARD
        </h1>
        <div className="w-12 h-0.5 bg-gradient-to-r from-white/0 via-white to-white/0 mx-auto"></div>
      </div>

      {/* Table-style Leaderboard */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-6 p-4 bg-white/5 border-b border-white/10">
            <div className="text-white font-bold text-base uppercase tracking-wider text-center">
              RANK
            </div>
            <div className="text-white font-bold text-base uppercase tracking-wider text-center">
              NAME
            </div>
            <div className="text-white font-bold text-base uppercase tracking-wider text-center">
              SCORE
            </div>
          </div>

          {/* Table Body */}
          <div className="h-full">
            {data.players.slice(0, 10).map((player, index) => (
              <div
                key={`${player.name}-${player.rank}`}
                className="group grid grid-cols-3 gap-6 p-6 border-b border-white/5 hover:bg-white/5 transition-all duration-200 min-h-[8vh]"
              >
                {/* Rank Column */}
                <div className="flex items-center justify-center gap-6">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getRankColor(
                        player.rank
                      )} flex items-center justify-center shadow-lg`}
                    >
                      <span className="text-xl font-black text-black">
                        {player.rank}
                      </span>
                    </div>
                    {player.rank <= 3 && (
                      <div className="absolute -top-1 -right-1 text-2xl">
                        {getTrophyEmoji(player.rank)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Name Column */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-xl truncate">
                    {player.name}
                  </span>
                </div>

                {/* Score Column */}
                <div className="flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {formatScore(player.score)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center flex-shrink-0">
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-3 py-1 border border-white/10">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-xs">
            Live • Last updated: {data.lastUpdated.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
