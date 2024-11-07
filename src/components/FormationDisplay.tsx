import React, { useState } from 'react';
import { Tooltip } from './Tooltip';

interface Position {
  id: string;
  x: number;
  y: number;
  role: string;
  focus: string;
}

interface FormationDisplayProps {
  formation: string;
  positions: Position[];
  roles: { [key: string]: string };
  focuses: { [key: string]: string };
}

export const FormationDisplay = ({ formation, positions, roles, focuses }: FormationDisplayProps) => {
  const [hoveredPosition, setHoveredPosition] = useState<string | null>(null);

  // Default positions for common formations
  const getDefaultPositions = () => {
    const defaultPositions = [
      // Goalkeeper
      { id: "Goalkeeper (GK)", x: 50, y: 10 },
      // Defenders
      { id: "Left Center Back (LCB)", x: 35, y: 30 },
      { id: "Right Center Back (RCB)", x: 65, y: 30 },
      // Midfielders
      { id: "Left Central Midfielder (LCM)", x: 35, y: 60 },
      { id: "Central Midfielder (CM)", x: 50, y: 50 },
      { id: "Right Central Midfielder (RCM)", x: 65, y: 60 },
      // Forwards
      { id: "Left Winger (LW)", x: 20, y: 80 },
      { id: "Striker (ST)", x: 50, y: 85 },
      { id: "Right Winger (RW)", x: 80, y: 80 },
    ];

    return defaultPositions;
  };

  const displayPositions = positions.length > 0 ? positions : getDefaultPositions();

  return (
    <div className="relative w-full aspect-[3/4] bg-green-800 rounded-lg overflow-hidden">
      {/* Pitch markings */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 border-2 border-white/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-white/30 rounded-full" />
        <div className="absolute top-1/2 w-full border border-white/30" />
      </div>

      {/* Player positions */}
      {displayPositions.map((pos) => {
        const role = roles[pos.id] || "Unknown";
        const focus = focuses[pos.id] || "Balanced";
        
        return (
          <div
            key={pos.id}
            className="absolute w-8 h-8 rounded-full bg-white/90 shadow-lg transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer hover:bg-primary-500 transition-colors group"
            style={{ 
              left: `${pos.x}%`, 
              top: `${pos.y}%`,
            }}
            onMouseEnter={() => setHoveredPosition(pos.id)}
            onMouseLeave={() => setHoveredPosition(null)}
          >
            <div className="text-xs font-bold group-hover:text-white">
              {pos.id.split(' ')[0][0]}{pos.id.split(' ')[0][1]}
            </div>
            {hoveredPosition === pos.id && (
              <Tooltip>
                <div className="text-sm">
                  <div className="font-semibold">{role}</div>
                  <div className="text-xs opacity-75">{focus}</div>
                </div>
              </Tooltip>
            )}
          </div>
        );
      })}
    </div>
  );
};