export const ENDPOINTS = {
  CHAT: {
    BASE: "/chat",
  },
  SESSION: {
    BASE: "/session",
    MESSAGES: (sessionId: string) => `/session/${sessionId}/messages`,
    ALL: (userId: string) => `/session/all/${userId}`,
    DELETE: (sessionId: string) => `/session/${sessionId}`,
  },
} as const;
