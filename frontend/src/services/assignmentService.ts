import { Assignment, Submission } from '../types/lms';
import { mockAssignments } from '../features/assignments/mockData';

class AssignmentService {
  private assignments: Assignment[] = [...mockAssignments];

  async getAssignments(courseId?: string): Promise<Assignment[]> {
    if (courseId) {
      return this.assignments.filter((a) => a.courseId === courseId);
    }
    return this.assignments;
  }

  async getAssignmentById(id: string): Promise<Assignment | undefined> {
    return this.assignments.find((a) => a.id === id);
  }

  async submitAssignment(assignmentId: string, submissionData: { studentId: string; studentName: string; studentEmail: string; textResponse?: string; attachments?: string[] }): Promise<Submission> {
    const asg = await this.getAssignmentById(assignmentId);
    if (!asg) throw new Error(`Assignment ${assignmentId} not found`);

    const newSub: Submission = {
      id: `sub-${Date.now()}`,
      assignmentId,
      studentId: submissionData.studentId,
      studentName: submissionData.studentName,
      studentEmail: submissionData.studentEmail,
      submittedAt: 'Just now',
      status: 'PENDING',
      textResponse: submissionData.textResponse,
      attachments: submissionData.attachments,
      maxMarks: asg.totalMarks,
    };

    asg.userSubmission = newSub;
    asg.status = 'SUBMITTED';
    return newSub;
  }

  async createAssignment(courseId: string, data: Omit<Assignment, 'id' | 'courseId' | 'status'>): Promise<Assignment> {
    const newAsg: Assignment = {
      ...data,
      id: `asg-${Date.now()}`,
      courseId,
      status: 'UPCOMING',
    };
    this.assignments.unshift(newAsg);
    return newAsg;
  }
}

export const assignmentService = new AssignmentService();
