import { createClient } from "@supabase/supabase-js";

const DEFAULT_SUPABASE_URL = "https://kcfryetymsocmxznvbgt.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtjZnJ5ZXR5bXNvY214em52Ymd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTMyMjQ3NDQsImV4cCI6MjEwODgwMDc0NH0.oObAlnG3X8ssA2wjM94saUzUUjnuf80hz9ct2tqUnaA";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  DEFAULT_SUPABASE_ANON_KEY;

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

  const { error } = await supabase.from("book_demands").insert([
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

  return { success: true };
}
