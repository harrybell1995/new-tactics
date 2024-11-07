import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTactics } from '../context/TacticsContext';
import { TacticCard } from '../components/TacticCard';
import { LoadingSpinner } from '../components/LoadingSpinner';

export const TacticsStyle = () => {
  const { tag } = useParams<{ tag: string }>();
  const { tacticDetails, loading, error, loadTacticsByTag } = useTactics();

  useEffect(() => {
    if (tag) {
      loadTacticsByTag(tag);
    }
  }, [tag]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500">Error loading tactics: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black overflow-auto pt-16 md:pt-0">
      <div className="sticky top-0 z-10 bg-gradient-to-b from-gray-900 to-transparent p-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 capitalize">
          {tag?.replace(/-/g, ' ')} Tactics
        </h1>
      </div>

      <div className="p-4 md:p-8">
        <div className="space-y-4 max-w-4xl mx-auto">
          {tacticDetails.map((tactic) => (
            <TacticCard
              key={tactic.id}
              tactic={tactic}
              isExpanded={false}
              onToggle={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};