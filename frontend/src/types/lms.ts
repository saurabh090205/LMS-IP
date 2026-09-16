export type CourseStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type CourseDifficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseVisibility = 'PUBLIC' | 'RESTRICTED' | 'PRIVATE';

export type LessonContentType = 'TEXT' | 'VIDEO' | 'DOCUMENT' | 'LINK' | 'MIXED';
export type ResourceType = 'PDF' | 'PPT' | 'DOC' | 'IMAGE' | 'VIDEO' | 'LINK';

export type AssignmentStatus = 'UPCOMING' | 'SUBMITTED' | 'OVERDUE' | 'GRADED';
export type SubmissionStatus = 'PENDING' | 'GRADED' | 'RESUBMITTED';

export type QuestionType = 'MCQ' | 'TRUE_FALSE' | 'SHORT_ANSWER';

export interface LessonResource {
  id: string;
  lessonId?: string;
  title: string;
  type: ResourceType;
  fileUrl: string;
  fileSize?: string;
  isExternal?: boolean;
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description?: string;
  contentType: LessonContentType;
  contentText?: string;
  videoUrl?: string;
  documentUrl?: string;
  durationMinutes: number;
  isPublished: boolean;
  isCompleted?: boolean;
  orderIndex: number;
  resources?: LessonResource[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  lessonsCount: number;
  durationMinutes: number;
  progress?: number;
  lessons?: Lesson[];
  quizzes?: QuizSummary[];
  assignments?: AssignmentSummary[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  difficulty: CourseDifficulty;
  instructorId: string;
  instructorName: string;
  instructorTitle?: string;
  instructorAvatar?: string;
  thumbnail?: string;
  status: CourseStatus;
  visibility: CourseVisibility;
  startDate: string;
  endDate: string;
  enrolledStudentsCount: number;
  durationHours: number;
  modulesCount: number;
  prerequisites?: string[];
  learningOutcomes?: string[];
  progress?: number;
  rating?: number;
  lastUpdated: string;
  isEnrolled?: boolean;
}

export interface RubricCriterion {
  id: string;
  title: string;
  description: string;
  maxPoints: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  moduleId?: string;
  courseTitle?: string;
  courseCode?: string;
  title: string;
  description: string;
  instructions: string;
  dueDate: string;
  dueTime?: string;
  totalMarks: number;
  weightagePercent?: number;
  status: AssignmentStatus;
  rubric?: RubricCriterion[];
  resources?: LessonResource[];
  userSubmission?: Submission;
}

export interface AssignmentSummary {
  id: string;
  title: string;
  dueDate: string;
  totalMarks: number;
  status?: AssignmentStatus;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  submittedAt: string;
  status: SubmissionStatus;
  textResponse?: string;
  attachments?: string[];
  marksAwarded?: number;
  maxMarks: number;
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
}

export interface QuizQuestion {
  id: string;
  quizId?: string;
  type: QuestionType;
  prompt: string;
  options?: string[]; // For MCQ / True-False
  correctOptionIndex?: number; // Backend only conceptually, or for review
  marks: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  moduleId?: string;
  courseTitle?: string;
  courseCode?: string;
  title: string;
  description: string;
  instructions: string;
  timeLimitMinutes: number;
  maxAttempts: number;
  passingScorePercent: number;
  questionsCount: number;
  totalMarks: number;
  questions?: QuizQuestion[];
  userAttemptsCount?: number;
  bestScore?: number;
}

export interface QuizSummary {
  id: string;
  title: string;
  questionsCount: number;
  timeLimitMinutes: number;
  totalMarks: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  startedAt: string;
  submittedAt: string;
  timeSpentSeconds: number;
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  answers: Record<string, string>; // questionId -> answer string / option index
}

export interface CourseStudentRosterItem {
  id: string;
  courseId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar?: string;
  enrollmentDate: string;
  progressPercent: number;
  lastActive: string;
  currentGrade: string;
  status: 'ACTIVE' | 'COMPLETED' | 'INACTIVE';
}

export interface GradeAssessmentItem {
  id: string;
  title: string;
  type: 'assignment' | 'quiz' | 'midterm' | 'final';
  score: number;
  maxScore: number;
  weightagePercent?: number;
  submittedAt?: string;
  feedback?: string;
}

export interface StudentCourseGradeRecord {
  courseId: string;
  courseCode: string;
  courseTitle: string;
  instructorName: string;
  term: string;
  currentPercentage: number;
  letterGrade: string;
  credits: number;
  assessments: GradeAssessmentItem[];
}

export interface CourseAnnouncement {
  id: string;
  courseId: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  title: string;
  content: string;
  publishedAt: string;
  isPinned: boolean;
  repliesCount?: number;
}
