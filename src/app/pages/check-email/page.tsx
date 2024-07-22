"use client";

import Link from "next/link";

export default function CheckEmail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-4xl mb-4">Check Your Email</h1>
      <p className="text-lg mb-6">
        We've sent a login link to your email address. Please check your email
        and click the link to log in.
      </p>
      <Link href="/" className="text-blue-500 underline">
        Go back to Home
      </Link>
    </div>
  );
}
