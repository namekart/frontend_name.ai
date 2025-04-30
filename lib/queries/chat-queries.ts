"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSessions,
  createSession,
  deleteSession,
} from "@/services/name-ai/methods";
import { Session } from "@/services/name-ai/types";
import { useRouter } from "next/navigation";
import { USER_ID } from "@/data/constants";

const CHAT_KEYS = {
  all: ["chat"] as const,
  sessions: () => [...CHAT_KEYS.all, "sessions"] as const,
  session: (id: string) => [...CHAT_KEYS.all, "session", id] as const,
};

export function useSessions(searchQuery: string = "") {
  return useQuery({
    queryKey: [...CHAT_KEYS.sessions(), searchQuery],
    queryFn: async () => {
      // TODO: Replace with actual user ID
      const response = await getAllSessions(USER_ID, searchQuery);
      return response.sessions;
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      // TODO: Replace with actual user ID
      const response = await createSession({
        user_id: USER_ID,
        query: message,
      });
      return {
        session_id: response.chat_session_id,
        started_at: new Date().toISOString(),
        first_message: message,
      };
    },
    onSuccess: (newSession) => {
      // Optimistically update the sessions list
      queryClient.setQueryData<Session[]>(
        CHAT_KEYS.sessions(),
        (oldSessions = []) => {
          return [newSession, ...oldSessions];
        }
      );

      // Refetch the sessions list after a delay to ensure we have the latest data
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: CHAT_KEYS.sessions() });
      }, 1000); // 1 second delay
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (sessionId: string) => {
      await deleteSession(sessionId);
    },
    onSuccess: (_, sessionId) => {
      // Invalidate the sessions query to refetch the list
      queryClient.invalidateQueries({ queryKey: CHAT_KEYS.sessions() });

      // If we're on the deleted session's page, redirect to home
      if (window.location.pathname === `/chat/${sessionId}`) {
        router.push("/");
      }
    },
  });
}
