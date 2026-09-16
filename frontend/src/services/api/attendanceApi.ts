import { apiClient } from './apiClient';
import type { ApiResponse, AttendanceSummaryResponse } from '../../types/api';

export const attendanceApi = {
  getMyAttendance: async (): Promise<AttendanceSummaryResponse> => {
    const res = await apiClient.get<ApiResponse<AttendanceSummaryResponse>>('/students/me/attendance');
    return res.data.data;
  },
};
