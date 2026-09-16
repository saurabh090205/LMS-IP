import { apiClient } from './apiClient';
import type { ApiResponse, AiChatRequest, AiChatResponse } from '../../types/api';

export const aiApi = {
  chat: async (request: AiChatRequest): Promise<AiChatResponse> => {
    const res = await apiClient.post<ApiResponse<AiChatResponse>>('/ai/chat', request);
    return res.data.data;
  },
};
