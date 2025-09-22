import React from 'react';
import Leaderboard from '@/components/Leaderboard';

const LeaderboardPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Leaderboard />
    </div>
  );
};

export default LeaderboardPage;
