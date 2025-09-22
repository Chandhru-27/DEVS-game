import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative px-6 md:px-8">
      {/* Cyberpunk animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-cyberpunkFloat cyberpunk-glow"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-cyberpunkFloat cyberpunk-glow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-pink-500/12 rounded-full blur-2xl animate-neonPulse cyberpunk-glow"></div>
      </div>

      <div className="text-center relative h-full max-h-100vh z-10 max-w-4xl mx-auto flex flex-col justify-center items-center gap-10">
        {/* Main Title */}
        <div className="mb-16">
          <h1 className="text-8xl md:text-9xl font-black mb-8 tracking-wider neon-purple cyberpunk-text animate-pulse">
            DEVS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto cyberpunk-glow"></div>
        </div>

        {/* Subtitle */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-wide neon-cyan cyberpunk-text">
            Real-time Gaming Leaderboard
          </h2>
        </div>

        {/* Cyberpunk Button */}
        <div className="flex justify-center">
          <Link
            href="/leaderboard"
            className="group relative inline-flex items-center justify-center gap-3 cyberpunk-bg cyberpunk-border rounded-lg px-8 py-4 font-bold text-lg text-white hover:from-purple-600/20 hover:to-cyan-600/20 transition-all duration-300 cyberpunk-glow"
          >
            <span className="neon-purple cyberpunk-text group-hover:neon-cyan transition-colors duration-300">
              View Leaderboard
            </span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300 neon-cyan"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
        </div>

        {/* Additional Cyberpunk Elements */}
        <div className="mt-16 flex items-center gap-4 neon-cyan cyberpunk-text">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse cyberpunk-glow"></div>
          <span className="text-sm font-medium tracking-wider">
            LIVE DATA STREAM
          </span>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse cyberpunk-glow"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
