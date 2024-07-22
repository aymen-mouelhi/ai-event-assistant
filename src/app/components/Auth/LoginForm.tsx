"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, type: "login" }),
    });

    if (res.ok) {
      setMessage("Check your email for the login link!");
      router.push("/pages/check-email");
    } else {
      const data = await res.json();
      setMessage(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome back</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-1 border border-gray-700 rounded-md bg-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Continue
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${message.includes("Check your email") ? "text-green-500" : "text-red-500"}`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
