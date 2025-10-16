"use client";

import React from "react";
import { Player } from "@/types/leaderboard";
import ScoreCounter from "./ScoreCounter";

interface LeaderboardRowProps {
  player: Player;
  index: number;
  animationClass?: string;
  scoreAnimationClass?: string;
  isVisible: boolean;
}

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  player,
  index,
  animationClass = "",
  scoreAnimationClass = "",
  isVisible,
}) => {
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
        return "from-purple-400 to-purple-600";
      case 2:
        return "from-cyan-400 to-cyan-600";
      case 3:
        return "from-pink-400 to-pink-600";
      default:
        return "from-gray-600 to-gray-800";
    }
  };

  const getRankGlow = (rank: number): string => {
    switch (rank) {
      case 1:
        return "shadow-purple-400/50";
      case 2:
        return "shadow-cyan-400/50";
      case 3:
        return "shadow-pink-400/50";
      default:
        return "shadow-gray-400/30";
    }
  };

  const getRankChangeIndicator = (): string => {
    if (!player.rankChange || player.rankChange === "same") return "";

    switch (player.rankChange) {
      case "up":
        return "↗️";
      case "down":
        return "↘️";
      default:
        return "";
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`group grid grid-cols-3 gap-6 p-6 border-b border-purple-400/20 hover:bg-gradient-to-r hover:from-purple-900/10 hover:to-cyan-900/10 transition-all duration-300 min-h-[8vh] ${animationClass}`}
      style={{
        transform: "translateZ(0)",
        willChange: "transform, opacity",
      }}
      data-player-id={player.player_id}
    >
      <div className="flex items-center justify-center gap-6">
        <div className="relative">
          <div
            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getRankColor(
              player.rank
            )} flex items-center justify-center shadow-lg transition-all duration-300 ${getRankGlow(
              player.rank
            )} cyberpunk-glow`}
          >
            <span className="text-xl font-black text-white cyberpunk-text">
              {player.rank}
            </span>
          </div>
          {player.rank <= 3 && (
            <div className="absolute -top-1 -right-1 text-2xl animate-pulse-slow">
              {getTrophyEmoji(player.rank)}
            </div>
          )}
          {player.rankChange && player.rankChange !== "same" && (
            <div className="absolute -top-1 -left-1 text-lg">
              {getRankChangeIndicator()}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-600/20 to-cyan-600/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:from-purple-600/30 group-hover:to-cyan-600/30 cyberpunk-border">
          <svg
            className="w-7 h-7 text-cyan-400 transition-all duration-300 group-hover:scale-110 cyberpunk-text"
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
        <div className="flex flex-col items-center">
          <span className="text-white font-medium text-xl truncate cyberpunk-text">
            {player.name}
          </span>
          {player.isNew && (
            <span className="neon-pink text-xs font-semibold animate-pulse">
              NEW
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ScoreCounter
          score={player.score}
          previousScore={player.previousScore}
          className="text-white font-bold text-2xl cyberpunk-text"
          animationClass={scoreAnimationClass}
        />
      </div>
    </div>
  );
};

export default LeaderboardRow;
