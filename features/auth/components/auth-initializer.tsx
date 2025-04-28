"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store";
import { useAuth } from "../hooks/use-auth";

export function AuthInitializer() {
  const { openModal, forceModal } = useAuthStore();
  const { status } = useAuth();

  useEffect(() => {
    // Only open the modal if explicitly forced and user is not authenticated
    if (forceModal && status === "unauthenticated") {
      openModal("signin");
    }
  }, [openModal, status, forceModal]);

  // This component doesn't render anything
  return null;
}
