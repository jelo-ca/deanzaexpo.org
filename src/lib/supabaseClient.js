import { createClient } from "@supabase/supabase-js";

const supabaseUrl = window.__ENV__?.SUPABASE_URL;
const supabaseAnonKey = window.__ENV__?.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env. Check public/env.js");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
