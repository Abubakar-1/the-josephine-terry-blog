"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import type React from "react";

export function AdminProtection({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin");
    }
  }, [user, loading, router]);

  if (!user) {
    router.push("/admin");
    return null;
  }

  return <>{children}</>;
}
