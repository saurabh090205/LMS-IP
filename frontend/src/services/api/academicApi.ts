import { apiClient } from './apiClient';
import type {
  ApiResponse,
  ProgramResponse,
  CourseSummaryResponse,
  CourseDetailResponse,
  UnitResponse,
  TopicResponse,
} from '../../types/api';

export const academicApi = {
  getPrograms: async (): Promise<ProgramResponse[]> => {
    const res = await apiClient.get<ApiResponse<ProgramResponse[]>>('/academic/programs');
    return res.data.data;
  },

  getCourses: async (programId?: string): Promise<CourseSummaryResponse[]> => {
    const res = await apiClient.get<ApiResponse<CourseSummaryResponse[]>>('/academic/courses', {
      params: programId ? { programId } : undefined,
    });
    return res.data.data;
  },

  getCourseById: async (id: string): Promise<CourseDetailResponse> => {
    const res = await apiClient.get<ApiResponse<CourseDetailResponse>>(`/academic/courses/${id}`);
    return res.data.data;
  },

  getCourseUnits: async (courseId: string): Promise<UnitResponse[]> => {
    const res = await apiClient.get<ApiResponse<UnitResponse[]>>(`/academic/courses/${courseId}/units`);
    return res.data.data;
  },

  getUnitTopics: async (unitId: string): Promise<TopicResponse[]> => {
    const res = await apiClient.get<ApiResponse<TopicResponse[]>>(`/academic/units/${unitId}/topics`);
    return res.data.data;
  },
};
