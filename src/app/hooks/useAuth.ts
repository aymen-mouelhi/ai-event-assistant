import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const response = await supabase.auth.getSession();
      console.log("getSession response:", response);

      if (response && response.data) {
        const { session } = response.data;
        console.log(`in getSession ${JSON.stringify(session)}`);
        setUser(session?.user ?? null);
      } else {
        setUser(null);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log(`in onAuthStateChange ${JSON.stringify(session)}`);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return user;
}
