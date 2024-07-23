import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseRedirectTo = process.env.NEXT_PUBLIC_REDIRECT_URL;

if (!supabaseUrl || !supabaseKey || !supabaseRedirectTo) {
  throw new Error("Missing Supabase URL or Key or RedirectTo");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
