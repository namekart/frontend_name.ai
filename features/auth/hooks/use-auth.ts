"use client";

import { useEffect, useState, useCallback } from "react";
import { useAuthStore } from "../store";
import { Session } from "next-auth";
import { signOut as authSignOut } from "next-auth/react";
import axios from "axios";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export function useAuth() {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const { openModal, closeModal, setTab } = useAuthStore();

  const getSession = useCallback(async () => {
    try {
      // Use the fetch API to get the session from the /api/auth/session endpoint
      const res = await axios.get("/api/auth/session");
      const data = await res.data;

      if (data && Object.keys(data).length > 0) {
        setSession(data);
        setStatus("authenticated");
      } else {
        setSession(null);
        setStatus("unauthenticated");
      }
    } catch (error) {
      console.error("Failed to get session:", error);
      setSession(null);
      setStatus("unauthenticated");
    }
  }, []);

  useEffect(() => {
    getSession();

    // Listen for storage events to sync auth state across tabs
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "signOut" || event.key === "next-auth.session-token") {
        getSession();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [getSession]);

  // Sign out the user
  const signOut = async () => {
    try {
      await authSignOut({ redirect: true, callbackUrl: "/" });
      setSession(null);
      setStatus("unauthenticated");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Open auth modal with specified tab
  const openAuthModal = (
    tab: "signin" | "signup" | "forgotten-password" = "signin"
  ) => {
    setTab(tab);
    openModal();
  };

  // User data extracted from session
  const user = session?.user || null;

  return {
    user,
    status,
    session,
    signOut,
    openAuthModal,
    closeAuthModal: closeModal,
    refreshSession: getSession,
  };
}
