import { supabase } from "./supabaseClient";

export async function getData(table, fields = "*") {
  const { data, error } = await supabase
    .from(table)
    .select(fields)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// Data creation, update, and delete functions

// Input:
// payload = { name: "Speaker Name", bio: "Speaker Bio", ... },
// table = "speakers"
export async function createData(payload, table) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateData(id, payload, table) {
  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function deleteData(id, table) {
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}
