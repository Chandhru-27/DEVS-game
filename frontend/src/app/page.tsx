import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-midnight to-[#1a1a1a] relative px-6 md:px-8">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse-slow"></div>
      </div>

      <div className="text-center relative h-full max-h-100vh  z-10 max-w-4xl mx-auto flex flex-col justify-center items-center gap-10">
        {/* Main Title */}
        <div className="mb-16">
          <h1 className="text-8xl md:text-9xl font-black text-white mb-8 tracking-wider drop-shadow-2xl animate-glow">
            DEVS
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 mx-auto"></div>
        </div>

        {/* Subtitle */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl text-white font-light tracking-wide">
            Real-time Gaming Leaderboard
          </h2>
        </div>

        {/* Modern Button */}
        <div className="flex justify-center">
          <Link
            href="/leaderboard"
            className="group relative inline-flex items-center justify-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300"
          >
            <span>View Leaderboard</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
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
      </div>
    </div>
  );
};

export default Home;
