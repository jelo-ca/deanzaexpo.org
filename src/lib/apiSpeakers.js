// Data access layer to prevent raw databse calls

import { supabase } from "./supabaseClient";

export async function getSpeakers() {
  const { data, error } = await supabase
    .from("Speakers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createSpeaker(payload) {
  const { data, error } = await supabase
    .from("Speakers")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function updateSpeaker(id, payload) {
  const { data, error } = await supabase
    .from("Speakers")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function deleteSpeaker(id) {
  const { error } = await supabase.from("Speakers").delete().eq("id", id);
  if (error) throw error;
}
