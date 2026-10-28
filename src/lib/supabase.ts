import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface BookDemandPayload {
  email: string;
  category: string;
  book_title?: string;
  demand_text: string;
}

export async function submitToSupabase(payload: BookDemandPayload) {
  if (!supabase) {
    throw new Error("Supabase is not configured yet.");
  }

  const { data, error } = await supabase.from("book_demands").insert([
    {
      email: payload.email,
      category: payload.category || "other",
      book_title: payload.book_title || "",
      demand_text: payload.demand_text,
      status: "new",
    },
  ]);

  if (error) {
    throw error;
  }

  return data;
}
