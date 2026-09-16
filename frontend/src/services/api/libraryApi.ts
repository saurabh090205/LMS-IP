import { apiClient } from './apiClient';
import type { ApiResponse, LibraryItemResponse } from '../../types/api';

export const libraryApi = {
  getItems: async (params?: { query?: string; category?: string; itemType?: string }): Promise<LibraryItemResponse[]> => {
    const res = await apiClient.get<ApiResponse<LibraryItemResponse[]>>('/library/items', { params });
    return res.data.data;
  },

  getItemById: async (id: string): Promise<LibraryItemResponse> => {
    const res = await apiClient.get<ApiResponse<LibraryItemResponse>>(`/library/items/${id}`);
    return res.data.data;
  },
};
