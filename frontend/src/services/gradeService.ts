import { CourseStudentRosterItem, StudentCourseGradeRecord, Submission } from '../types/lms';
import {
  mockPendingSubmissions,
  mockCourseRoster,
  mockGradebookMatrix,
  mockStudentGradeRecords,
} from '../features/grading/mockData';

class GradeService {
  private pendingSubmissions = [...mockPendingSubmissions];
  private rosters = { ...mockCourseRoster };
  private gradebooks = { ...mockGradebookMatrix };
  private studentRecords = [...mockStudentGradeRecords];

  async getPendingSubmissions(courseId?: string) {
    if (courseId) {
      return this.pendingSubmissions.filter((s) => s.assignmentId.includes(courseId));
    }
    return this.pendingSubmissions;
  }

  async gradeSubmission(submissionId: string, marks: number, feedback: string, graderName: string): Promise<Submission> {
    const idx = this.pendingSubmissions.findIndex((s) => s.id === submissionId);
    if (idx === -1) throw new Error(`Submission ${submissionId} not found`);

    const sub = this.pendingSubmissions[idx];
    sub.marksAwarded = marks;
    sub.feedback = feedback;
    sub.status = 'GRADED';
    sub.gradedAt = new Date().toLocaleDateString();
    sub.gradedBy = graderName;

    // Remove from pending list
    this.pendingSubmissions.splice(idx, 1);
    return sub;
  }

  async getCourseRoster(courseId: string): Promise<CourseStudentRosterItem[]> {
    return this.rosters[courseId] || this.rosters.cs301 || [];
  }

  async getGradebookMatrix(courseId: string) {
    return this.gradebooks[courseId] || this.gradebooks.cs301;
  }

  async getStudentGradeRecords(): Promise<StudentCourseGradeRecord[]> {
    return this.studentRecords;
  }
}

export const gradeService = new GradeService();
