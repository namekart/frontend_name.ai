"use client";

import { useAuth } from "../hooks/use-auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingScreen } from "@/components/loading-screen";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { status, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      openAuthModal("signin");
      router.push("/");
    }
  }, [status, openAuthModal, router]);

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    return fallback || null;
  }

  return <>{children}</>;
}
