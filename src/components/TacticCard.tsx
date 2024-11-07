import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Share2, Copy, User, Calendar, Trophy, Globe, Flag, Building2, MessageSquare } from 'lucide-react';
import { FormationDisplay } from './FormationDisplay';
import type { Tactic } from '../types/database';

interface TacticCardProps {
  tactic: Tactic;
  isExpanded: boolean;
  onToggle: () => void;
  onTagClick?: (tag: string) => void;
}

export const TacticCard = ({ tactic, isExpanded, onToggle, onTagClick }: TacticCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyShareCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(tactic.share_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    onTagClick?.(tag);
  };

  // Ensure tactic.position_id is an array before using reduce
  const roles = Array.isArray(tactic.position_id) 
    ? tactic.position_id.reduce((acc, pos) => {
        acc[pos] = tactic.position_id[pos]; // Adjust this if necessary
        return acc;
      }, {})
    : {}; // Fallback to empty object if not an array

  return (
    <div className="bg-white/5 hover:bg-white/10 transition-colors rounded-lg overflow-hidden">
      <div 
        onClick={onToggle}
        className="p-4 cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="w-12 h-12 bg-primary-500/20 rounded-md flex items-center justify-center">
            <Trophy className="text-primary-500" size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{tactic.tactic_name}</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {tactic.tags?.map((tag, index) => (
                <button
                  key={index}
                  onClick={(e) => handleTagClick(e, tag)}
                  className="px-2 py-1 bg-white/10 rounded-full text-xs hover:bg-white/20 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Formation Display */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Formation</h4>
              <div className="bg-green-900/20 rounded-lg p-4">
                <FormationDisplay
                  formation={tactic.formation_id}
                  positions={tactic.position_id}
                  roles={roles}
                  focuses={Array.isArray(tactic.position_id) ? tactic.position_id.reduce((acc, pos) => ({
                    ...acc,
                    [pos.id]: pos.focus
                  }), {}) : {}}
                />
              </div>
            </div>

            {/* Tactic Details */}
            <div className="space-y-6">
              {/* Share Code Section */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Share Code</h4>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tactic.share_code}
                    readOnly
                    className="flex-1 bg-black/20 rounded-md px-3 py-2 text-sm"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button
                    onClick={copyShareCode}
                    className="p-2 hover:bg-white/10 rounded-md transition-colors"
                    title="Copy share code"
                  >
                    {copied ? <Share2 size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>

              {/* Tactic Information */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Information</h4>
                <div className="space-y-3">
                  {tactic.manager && (
                    <div className="flex items-center gap-3 text-sm">
                      <User size={16} />
                      <span>{tactic.manager}</span>
                    </div>
                  )}
                  {tactic.year && (
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar size={16} />
                      <span>{tactic.year}</span>
                    </div>
                  )}
                  {tactic.clubcountry && (
                    <div className="flex items-center gap-3 text-sm">
                      <Globe size={16} />
                      <span>{tactic.clubcountry}</span>
                    </div>
                  )}
                  {tactic.league && (
                    <div className="flex items-center gap-3 text-sm">
                      <Trophy size={16} />
                      <span>{tactic.league}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tactical Setup */}
              <div>
                <h4 className="font-semibold mb-4 text-lg">Tactical Setup</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Flag size={16} />
                    <span>Build-up Style: {tactic.build_up_style}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Building2 size={16} />
                    <span>Defensive Approach: {tactic.defensive_approach}</span>
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              {tactic.notes && (
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center">
                      <MessageSquare size={20} className="text-primary-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold mb-1">Tactical Notes</div>
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">{tactic.notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
