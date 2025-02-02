import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const response = await supabase.auth.getSession();

      if (response && response.data) {
        const { session } = response.data;
        setUser(session?.user ?? null);

        // Save user to the database if not exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("email", session?.user?.email)
          .single();

        if (!existingUser && session?.user) {
          await supabase.from("users").insert([
            {
              email: session.user.email,
              id: session.user.id,
            },
          ]);
        }
      } else {
        setUser(null);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return user;
}
