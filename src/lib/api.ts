import { supabase } from './supabase';
import type { TacticsPlaylist, Tactic } from '../types/database';

export async function fetchTacticsPlaylists(): Promise<TacticsPlaylist[]> {
  const { data, error } = await supabase
    .from('tacticsPlaylists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics playlists:', error);
    return [];
  }

  return data?.map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  })) || [];
}

export async function fetchTacticsByCategory(category: string): Promise<TacticsPlaylist[]> {
  const { data, error } = await supabase
    .from('tacticsPlaylists') // Correct table
    .select('*')
    .eq('category', category) // Correct field
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics by category:', error);
    return [];
  }

  return data?.map(playlist => ({
    ...playlist,
    tags: Array.isArray(playlist.tags) ? playlist.tags : []
  })) || [];
}


export async function fetchTacticsByTag(tag: string): Promise<Tactic[]> {
  const { data, error } = await supabase
    .from('tacticsTable')
    .select('*')
    .textSearch('tags', tag)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics by tag:', error);
    return [];
  }

  return data?.map(tactic => ({
    ...tactic,
    tags: Array.isArray(tactic.tags) ? tactic.tags : [],
    matchScore: 1
  })) || [];
}

export async function fetchTacticsByPlaylistId(playlistId: string): Promise<Tactic[]> {
  const { data: playlist, error: playlistError } = await supabase
    .from('tacticsPlaylists')
    .select('tags')
    .eq('id', playlistId)
    .single();

  if (playlistError || !playlist) {
    console.error('Error fetching playlist:', playlistError);
    return [];
  }

  const playlistTags = Array.isArray(playlist.tags) ? playlist.tags : [];
  
  if (playlistTags.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('tacticsTable')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching tactics:', error);
    return [];
  }

  const processedTactics = (data || [])
    .map(tactic => {
      const tacticTags = Array.isArray(tactic.tags) ? tactic.tags : [];
      const matchingTags = playlistTags.filter(tag => tacticTags.includes(tag));
      return {
        ...tactic,
        tags: tacticTags,
        matchScore: matchingTags.length
      };
    })
    .filter(tactic => tactic.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  return processedTactics;
}