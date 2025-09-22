"use client";

import React, { useState, useEffect, useRef } from "react";

interface ScoreCounterProps {
  score: number;
  previousScore?: number;
  className?: string;
  animationClass?: string;
}

const ScoreCounter: React.FC<ScoreCounterProps> = ({
  score,
  previousScore,
  className = "",
  animationClass = "",
}) => {
  const [displayScore, setDisplayScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (previousScore !== undefined && previousScore !== score) {
      setIsAnimating(true);
      startTimeRef.current = Date.now();

      const animateScore = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const duration = 800; // Animation duration in ms
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);

        const currentScore = Math.round(
          previousScore + (score - previousScore) * easeOutCubic
        );

        setDisplayScore(currentScore);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animateScore);
        } else {
          setDisplayScore(score);
          setIsAnimating(false);
        }
      };

      animationRef.current = requestAnimationFrame(animateScore);
    } else {
      setDisplayScore(score);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score, previousScore]);

  const formatScore = (num: number): string => {
    return num.toLocaleString();
  };

  return (
    <span
      className={`${className} ${animationClass} ${
        isAnimating ? "animate-score-increase" : ""
      } transition-all duration-200`}
    >
      {formatScore(displayScore)}
    </span>
  );
};

export default ScoreCounter;
