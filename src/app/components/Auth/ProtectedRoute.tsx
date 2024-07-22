"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/pages/login");
    }
  }, [user, router]);

  return user ? <>{children}</> : null;
}
