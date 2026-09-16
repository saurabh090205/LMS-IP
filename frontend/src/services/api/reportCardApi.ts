import { apiClient } from './apiClient';
import type { ApiResponse, ReportCardResponse } from '../../types/api';

export const reportCardApi = {
  getMyReportCard: async (): Promise<ReportCardResponse> => {
    const res = await apiClient.get<ApiResponse<ReportCardResponse>>('/students/me/report-card');
    return res.data.data;
  },
};
