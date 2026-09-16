import { apiClient } from './apiClient';
import type { ApiResponse, UserResponse, NavigationItemResponse } from '../../types/api';

export const userApi = {
  getCurrentUser: async (): Promise<UserResponse> => {
    const res = await apiClient.get<ApiResponse<UserResponse>>('/users/me');
    return res.data.data;
  },

  getNavigation: async (): Promise<NavigationItemResponse[]> => {
    const res = await apiClient.get<ApiResponse<NavigationItemResponse[]>>('/users/me/navigation');
    return res.data.data;
  },
};
