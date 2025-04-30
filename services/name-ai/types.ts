export type Session = {
  session_id: string
  started_at: string
  first_message?: string
  first_message_time?: string
}

export type Message = {
  message_id: string
  content: string
  sender: 'user' | 'assistant'
  sent_at: string
}

export type ChatRequest = {
  query: string
  debug?: boolean
  chat_session_id: string
}

export type ChatResponse = {
  content: string
  debug_info?: {
    thought: string
    function_call: {
      name: string
      params: {
        user_query: string
      }
    }
    function_result: string[]
  }
}

export type CreateSessionRequest = {
  user_id: string
  query?: string
}

export type CreateSessionResponse = {
  chat_session_id: string
}

export type GetMessagesResponse = {
  messages: Message[]
  session_id: string
}

export type GetAllSessionsResponse = {
  sessions: Session[]
  user_id: string
  total_count: number
  has_more: boolean
} 