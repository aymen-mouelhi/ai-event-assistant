"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-4xl mb-4">Invalid or Expired Link</h1>
      <p className="text-lg mb-6">
        The login link is invalid or has expired. Please request a new link.
      </p>
      <Link href="/">
        <a className="text-blue-500 underline">Go back to Home</a>
      </Link>
    </div>
  );
}
