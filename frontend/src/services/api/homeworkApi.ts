import { apiClient } from './apiClient';
import type { ApiResponse, AssignmentResponse, SubmissionRequest, SubmissionResponse } from '../../types/api';

export const homeworkApi = {
  getStudentHomework: async (): Promise<AssignmentResponse[]> => {
    const res = await apiClient.get<ApiResponse<AssignmentResponse[]>>('/students/me/homework');
    return res.data.data;
  },

  getAssignmentById: async (id: string): Promise<AssignmentResponse> => {
    const res = await apiClient.get<ApiResponse<AssignmentResponse>>(`/homework/${id}`);
    return res.data.data;
  },

  submitHomework: async (id: string, request: SubmissionRequest): Promise<SubmissionResponse> => {
    const res = await apiClient.post<ApiResponse<SubmissionResponse>>(`/homework/${id}/submission`, request);
    return res.data.data;
  },
};
