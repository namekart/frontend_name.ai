import { create } from 'zustand'
import { Session } from '@/services/name-ai/types'

interface ChatStore {
  sessions: Session[]
  addSession: (session: Session) => void
  setSessions: (sessions: Session[]) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  sessions: [],
  addSession: (session) => set((state) => ({
    sessions: [session, ...state.sessions]
  })),
  setSessions: (sessions) => set({ sessions })
})) 