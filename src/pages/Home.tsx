import React from 'react';
import { ClipboardList, TrendingUp, Clock, Star } from 'lucide-react';
import { useTactics } from '../context/TacticsContext';
import { PlaylistCard } from '../components/PlaylistCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const Home = () => {
  const { tactics, loading, error } = useTactics();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Error: {error.message}</div>;

  // Filter tactics by different categories
  const featuredTactics = tactics.filter(t => t.verified).slice(0, 4);
  const recentTactics = [...tactics].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, 4);
  const popularTactics = tactics.slice(0, 4); // TODO: Add popularity metric

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pt-16 md:pt-0">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-primary-600 text-transparent bg-clip-text">
              Football Tactics Library
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the most comprehensive collection of football tactics, 
              formations, and strategies from legendary managers and teams.
            </p>
          </div>
        </div>
      </div>

      {/* Featured Collections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Featured Tactics */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-primary-500" size={24} />
              <h2 className="text-2xl font-bold">Featured Tactics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTactics.map((tactic) => (
                <PlaylistCard key={tactic.id} playlist={tactic} />
              ))}
            </div>
          </section>

          {/* Recent Additions */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Clock className="text-primary-500" size={24} />
              <h2 className="text-2xl font-bold">Recent Additions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentTactics.map((tactic) => (
                <PlaylistCard key={tactic.id} playlist={tactic} />
              ))}
            </div>
          </section>

          {/* Popular Tactics */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-primary-500" size={24} />
              <h2 className="text-2xl font-bold">Popular Tactics</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularTactics.map((tactic) => (
                <PlaylistCard key={tactic.id} playlist={tactic} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};