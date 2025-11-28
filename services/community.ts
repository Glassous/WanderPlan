import { supabase } from './supabaseClient'
import { Itinerary } from '../types'

export async function shareItinerary(itinerary: Itinerary): Promise<string> {
  const payload = {
    trip_title: itinerary.tripTitle,
    created_at: new Date(itinerary.createdAt).toISOString(),
    itinerary,
  }
  const { data, error } = await supabase
    .from('community_itineraries')
    .insert(payload)
    .select('id')
    .single()
  if (error) throw error
  return data.id as string
}

export async function fetchSharedItinerary(id: string): Promise<Itinerary | null> {
  const { data, error } = await supabase
    .from('community_itineraries')
    .select('itinerary')
    .eq('id', id)
    .maybeSingle()
  if (error) throw error
  return (data?.itinerary as Itinerary) || null
}

export interface CommunityItem {
  id: string
  trip_title: string
  created_at: string
}

export async function listCommunityItems(limit = 50): Promise<CommunityItem[]> {
  const { data, error } = await supabase
    .from('community_itineraries')
    .select('id, trip_title, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data || []) as CommunityItem[]
}

