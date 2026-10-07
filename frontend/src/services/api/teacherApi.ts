import { apiClient } from './apiClient';
import type {
  ApiResponse,
  CourseSummaryResponse,
  CourseDetailResponse,
  UnitResponse,
  TopicResponse,
  RosterStudentResponse,
  FacultySubmissionResponse,
  AssignmentResponse,
  AssignmentCreateRequest,
  GradeSubmissionRequest,
  LiveClassResponse,
  LiveClassCreateRequest,
  BatchAttendanceRequest,
  AttendanceRecordResponse,
  CourseGradebookResponse,
  CourseCreateRequest,
  UnitCreateRequest,
  TopicCreateRequest,
} from '../../types/api';

export const teacherApi = {
  // Course Management
  getCourses: async (): Promise<CourseSummaryResponse[]> => {
    const res = await apiClient.get<ApiResponse<CourseSummaryResponse[]>>('/academic/courses');
    return res.data.data;
  },

  getCourseById: async (id: string): Promise<CourseDetailResponse> => {
    const res = await apiClient.get<ApiResponse<CourseDetailResponse>>(`/academic/courses/${id}`);
    return res.data.data;
  },

  createCourse: async (data: CourseCreateRequest): Promise<CourseSummaryResponse> => {
    const res = await apiClient.post<ApiResponse<CourseSummaryResponse>>('/academic/courses', data);
    return res.data.data;
  },

  updateCourse: async (id: string, data: Partial<CourseCreateRequest>): Promise<CourseSummaryResponse> => {
    const res = await apiClient.put<ApiResponse<CourseSummaryResponse>>(`/academic/courses/${id}`, data);
    return res.data.data;
  },

  createUnit: async (courseId: string, data: UnitCreateRequest): Promise<UnitResponse> => {
    const res = await apiClient.post<ApiResponse<UnitResponse>>(`/academic/courses/${courseId}/units`, data);
    return res.data.data;
  },

  createTopic: async (unitId: string, data: TopicCreateRequest): Promise<TopicResponse> => {
    const res = await apiClient.post<ApiResponse<TopicResponse>>(`/academic/units/${unitId}/topics`, data);
    return res.data.data;
  },

  getCourseRoster: async (courseId: string): Promise<RosterStudentResponse[]> => {
    const res = await apiClient.get<ApiResponse<RosterStudentResponse[]>>(`/academic/courses/${courseId}/roster`);
    return res.data.data;
  },

  // Homework & SpeedGrader
  getAssignments: async (courseId?: string): Promise<AssignmentResponse[]> => {
    const res = await apiClient.get<ApiResponse<AssignmentResponse[]>>('/homework', {
      params: courseId ? { courseId } : undefined,
    });
    return res.data.data;
  },

  createAssignment: async (data: AssignmentCreateRequest): Promise<AssignmentResponse> => {
    const res = await apiClient.post<ApiResponse<AssignmentResponse>>('/homework', data);
    return res.data.data;
  },

  getAssignmentSubmissions: async (assignmentId: string): Promise<FacultySubmissionResponse[]> => {
    const res = await apiClient.get<ApiResponse<FacultySubmissionResponse[]>>(`/homework/${assignmentId}/submissions`);
    return res.data.data;
  },

  getPendingSubmissions: async (): Promise<FacultySubmissionResponse[]> => {
    const res = await apiClient.get<ApiResponse<FacultySubmissionResponse[]>>('/homework/submissions/pending');
    return res.data.data;
  },

  getAllSubmissions: async (): Promise<FacultySubmissionResponse[]> => {
    const res = await apiClient.get<ApiResponse<FacultySubmissionResponse[]>>('/homework/submissions');
    return res.data.data;
  },

  gradeSubmission: async (id: string, data: GradeSubmissionRequest): Promise<FacultySubmissionResponse> => {
    const res = await apiClient.post<ApiResponse<FacultySubmissionResponse>>(`/homework/submissions/${id}/grade`, data);
    return res.data.data;
  },

  // Live Classes & Virtual Auditorium
  getClasses: async (): Promise<LiveClassResponse[]> => {
    const res = await apiClient.get<ApiResponse<LiveClassResponse[]>>('/classes');
    return res.data.data;
  },

  scheduleClass: async (data: LiveClassCreateRequest): Promise<LiveClassResponse> => {
    const res = await apiClient.post<ApiResponse<LiveClassResponse>>('/classes', data);
    return res.data.data;
  },

  updateClassStatus: async (id: string, status: string): Promise<LiveClassResponse> => {
    const res = await apiClient.put<ApiResponse<LiveClassResponse>>(`/classes/${id}/status`, null, {
      params: { status },
    });
    return res.data.data;
  },

  // Attendance Register
  getCourseAttendance: async (courseId: string, date?: string): Promise<AttendanceRecordResponse[]> => {
    const res = await apiClient.get<ApiResponse<AttendanceRecordResponse[]>>(`/attendance/courses/${courseId}`, {
      params: date ? { date } : undefined,
    });
    return res.data.data;
  },

  markBatchAttendance: async (data: BatchAttendanceRequest): Promise<AttendanceRecordResponse[]> => {
    const res = await apiClient.post<ApiResponse<AttendanceRecordResponse[]>>('/attendance/batch', data);
    return res.data.data;
  },

  // Gradebook Matrix
  getCourseGradebook: async (courseId: string): Promise<CourseGradebookResponse> => {
    const res = await apiClient.get<ApiResponse<CourseGradebookResponse>>(`/exams/courses/${courseId}/gradebook`);
    return res.data.data;
  },
};
