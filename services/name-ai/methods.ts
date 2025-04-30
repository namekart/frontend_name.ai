import nameAiService from './service'
import { ENDPOINTS } from './endpoints'
import { ChatRequest, ChatResponse, CreateSessionRequest, CreateSessionResponse, GetMessagesResponse, GetAllSessionsResponse } from './types'


export const chat = async (params: ChatRequest): Promise<ChatResponse> => {
  const response = await nameAiService.post<ChatResponse>(
    ENDPOINTS.CHAT.BASE,
    params
  );
  return response.data;
};

export const createSession = async (params: CreateSessionRequest): Promise<CreateSessionResponse> => {
  const response = await nameAiService.post<CreateSessionResponse>(
    ENDPOINTS.SESSION.BASE,
    params
  );
  return response.data;
};

export const getMessages = async (sessionId: string): Promise<GetMessagesResponse> => {
  const response = await nameAiService.get<GetMessagesResponse>(
    ENDPOINTS.SESSION.MESSAGES(sessionId)
  );
  return response.data;
};

export const getAllSessions = async (
  userId: string,
  searchQuery?: string
): Promise<GetAllSessionsResponse> => {
  const response = await nameAiService.get<GetAllSessionsResponse>(
    ENDPOINTS.SESSION.ALL(userId),
    {
      params: {
        search_query: searchQuery,
        limit: 10
      }
    }
  )
  return response.data
}

export const deleteSession = async (sessionId: string): Promise<void> => {
  await nameAiService.delete(ENDPOINTS.SESSION.DELETE(sessionId))
}


