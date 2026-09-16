import { apiClient } from './apiClient';
import type {
  ApiResponse,
  StudentProfileResponse,
  StudentProgressResponse,
  DashboardResponse,
  TimetableSlotResponse,
} from '../../types/api';

export const studentApi = {
  getProfile: async (): Promise<StudentProfileResponse> => {
    const res = await apiClient.get<ApiResponse<StudentProfileResponse>>('/students/me');
    return res.data.data;
  },

  getProgress: async (): Promise<StudentProgressResponse> => {
    const res = await apiClient.get<ApiResponse<StudentProgressResponse>>('/students/me/progress');
    return res.data.data;
  },

  getDashboard: async (): Promise<DashboardResponse> => {
    const res = await apiClient.get<ApiResponse<DashboardResponse>>('/students/me/dashboard');
    return res.data.data;
  },

  getTimetable: async (): Promise<TimetableSlotResponse[]> => {
    const res = await apiClient.get<ApiResponse<TimetableSlotResponse[]>>('/students/me/timetable');
    return res.data.data;
  },
};
