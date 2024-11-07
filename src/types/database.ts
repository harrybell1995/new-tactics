export interface TacticsPlaylist {
  id: string;
  title: string;
  description: string;
  tacticalpreset: string;
  decade: number;
  image?: {
    url: string;
    alt?: string;
  };
  formations?: string[];
  tags: string[];
  created_at: string;
}

export interface Tactic {
  id: string;
  created_at: string;
  tactic_name: string;
  description: string;
  formation_id: string;
  position_id: Array<{
    id: string;
    x: number;
    y: number;
    role: string; // Consider changing role to an ID if you have a predefined role set
    focus: string; // Consider changing focus to an ID if predefined
  }>;
  focuses_id: string[];
  role_id: string[];
  build_up_style: string;
  defensive_approach: string;
  share_code: string;
  tags: string[];
  club: string;
  season: string;
  verified: boolean;
  manager?: string;
  year?: string;
  clubcountry?: string;
  league?: string;
  tacticalpreset?: string;
  notes?: string;
}
