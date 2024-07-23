"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function RedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    if (accessToken) {
      router.replace("/pages/chat");
    }
  }, [router, searchParams]);

  return null;
}

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen">
      <Suspense fallback={null}>
        <RedirectHandler />
      </Suspense>
      <div className="w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-5xl font-bold p-10">
        Plan your perfect event effortlessly with our assistance.
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center bg-black">
        <h1 className="text-3xl text-white mb-4">Get started</h1>
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-full text-xl"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
