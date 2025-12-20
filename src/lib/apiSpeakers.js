// Data access layer to prevent raw databse calls

import { supabase } from "./supabaseClient";

export async function getSpeakers() {
  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Data creation, update, and delete
export async function createSpeaker(payload) {
  const { data, error } = await supabase
    .from("speakers")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function updateSpeaker(id, payload) {
  const { data, error } = await supabase
    .from("speakers")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function deleteSpeaker(id) {
  const { error } = await supabase.from("speakers").delete().eq("id", id);
  if (error) throw error;
}
