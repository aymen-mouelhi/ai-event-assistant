"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <div>AI Event Assistant</div>
      {user && (
        <div className="flex items-center space-x-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user.email}`}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span>{user.email}</span>
        </div>
      )}
    </header>
  );
}
