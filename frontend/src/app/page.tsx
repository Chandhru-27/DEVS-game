"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import QRCodeSection from "@/components/QRCodeSection";

const AnimatedTagline = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const fullText = "CODE.COFFEE.REPEAT..";

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentIndex < fullText.length) {
            setDisplayText(fullText.slice(0, currentIndex + 1));
            setCurrentIndex(currentIndex + 1);
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentIndex > 0) {
            setDisplayText(fullText.slice(0, currentIndex - 1));
            setCurrentIndex(currentIndex - 1);
          } else {
            setIsDeleting(false);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, fullText]);

  return (
    <div className="text-white font-mono text-2xl md:text-3xl tracking-wider">
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }>
  >([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 37 }, (_, i) => ({
      id: i,
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1920),
      y:
        Math.random() *
        (typeof window !== "undefined" ? window.innerHeight : 1080),
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(initialParticles);

    const animate = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          const screenWidth =
            typeof window !== "undefined" ? window.innerWidth : 1920;
          const screenHeight =
            typeof window !== "undefined" ? window.innerHeight : 1080;

          if (newX > screenWidth) newX = 0;
          if (newX < 0) newX = screenWidth;
          if (newY > screenHeight) newY = 0;
          if (newY < 0) newY = screenHeight;

          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const interval = setInterval(animate, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative px-6 md:px-8"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0f 0%, #0f0a15 25%, #150a1a 50%, #0f0a15 75%, #0a0a0f 100%)",
      }}
    >
      <ParticleBackground />
      <QRCodeSection position="top-right" size="xxlarge" />
      <div className="text-center relative h-full max-h-100vh z-10 max-w-4xl mx-auto flex flex-col justify-center items-center gap-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <Image
            src="/DEVS_White.png"
            alt="DEVS"
            width={400}
            height={120}
            className="mb-8"
            priority
          />
          <AnimatedTagline />
        </div>

        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide cyberpunk-text">
            Real-time Gaming Leaderboard
          </h2>
        </div>

        <div className="flex justify-center ">
          <Link
            href="/leaderboard"
            className="group relative inline-flex items-center justify-center gap-6 bg-none border-none border-0 underline  border-black rounded-lg px-16 py-8 font-bold text-lg   transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-2xl hover:shadow-black/20 active:scale-95"
          >
            <span className="relative z-10  font-mono tracking-wider text-white transition-colors duration-200">
              View Leaderboard
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 28 28"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={6}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        <div className="mt-16 flex items-center gap-4 neon-cyan cyberpunk-text">
          <div className="w-2 h-2 bg-[#ffff] rounded-full animate-pulse cyberpunk-glow"></div>
          <span className="text-sm font-medium tracking-wider">
            LIVE DATA STREAM
          </span>
          <div className="w-2 h-2 bg-[#ffff] rounded-full animate-pulse cyberpunk-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
