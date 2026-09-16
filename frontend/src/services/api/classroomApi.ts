import { apiClient } from './apiClient';
import type { ApiResponse, LiveClassResponse, RecordedLectureResponse } from '../../types/api';

export const classroomApi = {
  getMyClasses: async (): Promise<LiveClassResponse[]> => {
    const res = await apiClient.get<ApiResponse<LiveClassResponse[]>>('/students/me/classes');
    return res.data.data;
  },

  getClassById: async (id: string): Promise<LiveClassResponse> => {
    const res = await apiClient.get<ApiResponse<LiveClassResponse>>(`/classes/${id}`);
    return res.data.data;
  },

  getClassRecording: async (id: string): Promise<RecordedLectureResponse> => {
    const res = await apiClient.get<ApiResponse<RecordedLectureResponse>>(`/classes/${id}/recording`);
    return res.data.data;
  },

  getRecordings: async (courseId?: string): Promise<RecordedLectureResponse[]> => {
    const res = await apiClient.get<ApiResponse<RecordedLectureResponse[]>>('/students/me/recordings', {
      params: courseId ? { courseId } : undefined,
    });
    return res.data.data;
  },
};
