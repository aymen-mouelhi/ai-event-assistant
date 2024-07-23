/* eslint-disable @next/next/no-img-element */

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

export default function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-800 text-white z-50">
      <div>AI Event Assistant</div>
      {user && (
        <div className="relative z-50">
          <div
            onClick={toggleMenu}
            className="flex items-center space-x-4 cursor-pointer"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${user.email}`}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span>{user.email}</span>
          </div>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-md shadow-lg py-2 z-50">
              <Link href="/insights" legacyBehavior>
                <a className="block px-4 py-2 text-sm text-white hover:bg-gray-600">
                  Insights
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
