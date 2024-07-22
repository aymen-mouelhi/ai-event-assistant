"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white text-5xl font-bold">
        Recommend a dish to impress a date who's a picky eater.
      </div>
      <div className="w-1/2 flex flex-col items-center justify-center bg-black">
        <h1 className="text-3xl text-white mb-4">Get started</h1>
        <button
          onClick={handleLoginClick}
          className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
