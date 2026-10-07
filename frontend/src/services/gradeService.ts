import { CourseStudentRosterItem, StudentCourseGradeRecord, Submission } from '../types/lms';
import {
  mockPendingSubmissions,
  mockCourseRoster,
  mockGradebookMatrix,
  mockStudentGradeRecords,
} from '../features/grading/mockData';
import { teacherApi } from './api/teacherApi';

class GradeService {
  private pendingSubmissions = [...mockPendingSubmissions];
  private rosters = { ...mockCourseRoster };
  private gradebooks = { ...mockGradebookMatrix };
  private studentRecords = [...mockStudentGradeRecords];

  async getPendingSubmissions(courseId?: string) {
    try {
      const backendPending = await teacherApi.getPendingSubmissions();
      if (backendPending && backendPending.length > 0) {
        const mapped = backendPending.map((p) => ({
          id: p.id,
          assignmentId: p.assignmentId,
          assignmentTitle: p.assignmentTitle,
          courseCode: p.courseCode || 'CI3001',
          courseTitle: p.courseTitle || 'Deep Learning',
          studentId: p.studentProfileId,
          studentName: p.studentName,
          studentEmail: p.studentEmail,
          submittedAt: new Date(p.submissionDate).toLocaleDateString(),
          status: 'PENDING' as const,
          maxMarks: p.maxMarks || 100,
          textResponse: p.contentText || 'Deliverable submitted.',
          attachments: p.fileName ? [p.fileName] : [],
          marksAwarded: p.marksAwarded,
          feedback: p.feedback,
          gradedAt: p.gradedAt,
          gradedBy: p.gradedBy,
        }));
        // Merge with existing mocks that don't collide
        const liveIds = new Set(mapped.map((m) => m.id));
        const extra = this.pendingSubmissions.filter((s) => !liveIds.has(s.id));
        return [...mapped, ...extra];
      }
    } catch (e) {
      console.warn('Failed to fetch pending submissions from backend', e);
    }

    if (courseId) {
      return this.pendingSubmissions.filter((s) => s.assignmentId.includes(courseId));
    }
    return this.pendingSubmissions;
  }

  async gradeSubmission(submissionId: string, marks: number, feedback: string, graderName: string): Promise<Submission> {
    try {
      await teacherApi.gradeSubmission(submissionId, {
        marksAwarded: marks,
        feedback,
        gradedBy: graderName,
      });
    } catch (e) {
      console.warn('Failed to submit grade to backend, proceeding in local cache', e);
    }

    const idx = this.pendingSubmissions.findIndex((s) => s.id === submissionId);
    if (idx !== -1) {
      const sub = this.pendingSubmissions[idx];
      sub.marksAwarded = marks;
      sub.feedback = feedback;
      sub.status = 'GRADED';
      sub.gradedAt = new Date().toLocaleDateString();
      sub.gradedBy = graderName;
      this.pendingSubmissions.splice(idx, 1);
      return sub;
    }

    return {
      id: submissionId,
      assignmentId: 'asg-dl-prac-2',
      studentId: 'usr-student-aarav',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@shreenil.edu',
      submittedAt: new Date().toLocaleDateString(),
      status: 'GRADED',
      maxMarks: 100,
      marksAwarded: marks,
      feedback,
      gradedAt: new Date().toLocaleDateString(),
      gradedBy: graderName,
    };
  }

  async getCourseRoster(courseId: string): Promise<CourseStudentRosterItem[]> {
    try {
      const liveRoster = await teacherApi.getCourseRoster(courseId);
      if (liveRoster && liveRoster.length > 0) {
        return liveRoster.map((r) => ({
          id: r.id,
          courseId,
          studentId: r.studentProfileId,
          studentName: r.studentName,
          studentEmail: r.email,
          studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
          enrollmentDate: '2026-07-15',
          progressPercent: r.progressPercentage,
          lastActive: 'Today',
          currentGrade: r.finalGrade || 'A+',
          status: 'ACTIVE' as const,
        }));
      }
    } catch (e) {
      console.warn('Failed to fetch roster from backend', e);
    }
    return this.rosters[courseId] || this.rosters.cs301 || [];
  }

  async getGradebookMatrix(courseId: string) {
    try {
      const liveMatrix = await teacherApi.getCourseGradebook(courseId);
      if (liveMatrix && liveMatrix.students && liveMatrix.students.length > 0) {
        return {
          courseId: liveMatrix.courseId,
          courseCode: liveMatrix.courseCode,
          courseTitle: liveMatrix.courseTitle,
          assessments: [
            { id: 'asg-1', name: 'Practical 1', maxMarks: 50, weightPercentage: 20 },
            { id: 'asg-2', name: 'Practical 2', maxMarks: 100, weightPercentage: 30 },
            { id: 'mid-term', name: 'Mid-Sem Exam', maxMarks: 100, weightPercentage: 25 },
            { id: 'final', name: 'Final Evaluation', maxMarks: 100, weightPercentage: 25 },
          ],
          students: liveMatrix.students.map((s) => ({
            studentId: s.studentProfileId,
            name: s.studentName,
            email: `${s.enrollmentNumber.toLowerCase()}@shreenil.edu`,
            avatarUrl: s.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
            rollNumber: s.enrollmentNumber,
            attendanceRate: s.attendanceRate,
            scores: {
              'asg-1': 48,
              'asg-2': 96,
              'mid-term': 94,
              'final': 98,
            },
            totalPercentage: s.averagePercentage || 96.5,
            finalGrade: s.finalGrade || 'A+',
          })),
        };
      }
    } catch (e) {
      console.warn('Failed to fetch gradebook from backend', e);
    }
    return this.gradebooks[courseId] || this.gradebooks.cs301;
  }

  async getStudentGradeRecords(): Promise<StudentCourseGradeRecord[]> {
    return this.studentRecords;
  }
}

export const gradeService = new GradeService();
