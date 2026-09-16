export interface ApiResponse<T> {
  success: boolean;
  message: string;
  errorCode?: string;
  data: T;
  path?: string;
  timestamp: string;
}

export interface UserResponse {
  id: string;
  tenantId: string;
  keycloakId: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  status: string;
  roles: string[];
  currentRole: string;
}

export interface NavigationItemResponse {
  id: string;
  label: string;
  path: string;
  icon: string;
  section: string;
  isComingSoon: boolean;
  badgeCount?: number;
  children?: NavigationItemResponse[];
}

export interface ProgramResponse {
  id: string;
  institutionName: string;
  institutionCode: string;
  name: string;
  code: string;
  degree: string;
  department: string;
  durationYears: number;
}

export interface CourseSummaryResponse {
  id: string;
  courseCode: string;
  courseStructureCode?: string;
  syllabusCode?: string;
  title: string;
  credits: number;
  theoryHours: number;
  labHours: number;
  tutorialHours: number;
  department: string;
  badgeColor?: string;
  totalUnits: number;
  totalTopics: number;
  studentProgressPercent: number;
  semester: string;
  moduleCode: string;
}

export interface LearningResourceResponse {
  id: string;
  title: string;
  resourceType: 'VIDEO' | 'READING' | 'DEMO_RESOURCE' | 'NOTES';
  resourceUrl?: string;
  contentText?: string;
  durationMinutes?: number;
  isOfficialSyllabus: boolean;
  attributionLabel?: string;
}

export interface TopicResponse {
  id: string;
  unitId: string;
  topicNumber: number;
  title: string;
  description?: string;
  estimatedMinutes: number;
  resources: LearningResourceResponse[];
  hasResources: boolean;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';
}

export interface UnitResponse {
  id: string;
  courseId: string;
  unitNumber: number;
  title: string;
  theoryHours: number;
  coMapping?: string;
  topicsCount: number;
  topics: TopicResponse[];
}

export interface PracticalResponse {
  id: string;
  experimentNumber: number;
  title: string;
  description?: string;
  mappedUnits?: string;
}

export interface CourseOutcomeResponse {
  id: string;
  coNumber: number;
  coCode: string;
  description: string;
  bloomsLevel?: string;
}

export interface CourseDetailResponse {
  id: string;
  courseCode: string;
  courseStructureCode?: string;
  syllabusCode?: string;
  title: string;
  credits: number;
  theoryHours: number;
  labHours: number;
  tutorialHours: number;
  department: string;
  badgeColor?: string;
  prerequisites?: string;
  objectives?: string;
  courseRelevance?: string;
  assessmentScheme?: string;
  textbooks?: string;
  referenceBooks?: string;
  moocsResources?: string;
  units: UnitResponse[];
  practicals: PracticalResponse[];
  courseOutcomes: CourseOutcomeResponse[];
  studentProgressPercent: number;
}

export interface SkillProgressResponse {
  id: string;
  skillName: string;
  category: string;
  proficiencyScore: number;
  verifiedByCourse?: string;
}

export interface AchievementResponse {
  id: string;
  title: string;
  category: string;
  description?: string;
  dateEarned: string;
  badge?: string;
}

export interface WeeklyActivityResponse {
  day: string;
  hoursSpent: number;
  lessonsCompleted: number;
}

export interface StudentProfileResponse {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  enrollmentNumber: string;
  programName: string;
  programCode: string;
  institutionName: string;
  currentSemester: number;
  currentAcademicYear: string;
  section?: string;
  cumulativeGpa: number;
  attendancePercentage: number;
  learningStreakDays: number;
  avatarUrl?: string;
  bioSummary?: string;
  skills: SkillProgressResponse[];
  interests: string[];
  achievements: AchievementResponse[];
}

export interface StudentProgressResponse {
  studentId: string;
  cumulativeGpa: number;
  attendancePercentage: number;
  learningStreakDays: number;
  totalEnrolledCourses: number;
  completedCourses: number;
  totalAssignmentsSubmitted: number;
  pendingAssignments: number;
  enrolledCourses: CourseSummaryResponse[];
  skillProficiencies: SkillProgressResponse[];
}

export interface LiveClassResponse {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  teacherName: string;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  jitsiRoomName: string;
  status: 'SCHEDULED' | 'LIVE' | 'COMPLETED' | 'CANCELLED';
}

export interface RecordedLectureResponse {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  unitId?: string;
  unitTitle?: string;
  title: string;
  videoUrl: string;
  durationMinutes: number;
  recordedDate: string;
  instructorName: string;
  summaryNotes?: string;
}

export interface TimetableSlotResponse {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  formattedTime: string;
  roomOrLink: string;
  faculty: string;
  slotType: 'THEORY' | 'LAB' | 'TUTORIAL';
  badgeColor?: string;
}

export interface AssignmentResponse {
  id: string;
  courseId: string;
  courseCode: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  maxMarks: number;
  submissionType: string;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'OVERDUE';
  mySubmission?: SubmissionResponse;
}

export interface SubmissionResponse {
  id: string;
  assignmentId: string;
  studentProfileId: string;
  submissionDate: string;
  contentText?: string;
  fileUrl?: string;
  fileName?: string;
  status: string;
  marksObtained?: number;
  feedbackComments?: string;
  gradedAt?: string;
}

export interface SubmissionRequest {
  contentText?: string;
  fileUrl?: string;
  fileName?: string;
}

export interface AttendanceRecordResponse {
  id: string;
  courseId?: string;
  courseCode: string;
  courseTitle: string;
  date: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  remarks?: string;
}

export interface AttendanceSummaryResponse {
  overallPercentage: number;
  totalClasses: number;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
  courseWisePercentage: Record<string, number>;
  records: AttendanceRecordResponse[];
}

export interface GradeRecordResponse {
  id: string;
  courseId?: string;
  courseCode: string;
  courseTitle: string;
  assessmentName: string;
  marksObtained: number;
  maxMarks: number;
  percentage: number;
  letterGrade?: string;
  gradePoints?: number;
  semesterNumber: number;
  teacherRemarks?: string;
}

export interface ReportCardResponse {
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  programName: string;
  semesterNumber: number;
  academicYear: string;
  semesterGpa: number;
  cumulativeGpa: number;
  totalCreditsEarned: number;
  courseGrades: GradeRecordResponse[];
  detailedAssessments: GradeRecordResponse[];
}

export interface LibraryItemResponse {
  id: string;
  title: string;
  author: string;
  itemType: 'BOOK' | 'JOURNAL' | 'VIDEO' | 'REFERENCE' | 'PAPER';
  category: string;
  coverImageUrl?: string;
  resourceUrl?: string;
  description?: string;
  isAvailable: boolean;
  publishedYear?: number;
}

export interface AiChatRequest {
  message: string;
  courseId?: string;
  courseCode?: string;
  unitId?: string;
  topicId?: string;
  context?: string;
  metadata?: Record<string, unknown>;
}

export interface AiChatResponse {
  message: string;
  context?: string;
  suggestedActions: string[];
  referenceTopics: string[];
  modelProvider: string;
}

export interface DashboardResponse {
  studentId: string;
  studentName: string;
  enrollmentNumber: string;
  programName: string;
  programCode: string;
  institutionName: string;
  currentSemester: number;
  currentAcademicYear: string;
  section?: string;
  cumulativeGpa: number;
  attendancePercentage: number;
  studyStreak: number;
  aiInsight: string;
  todayClasses: LiveClassResponse[];
  pendingHomework: AssignmentResponse[];
  latestGrades: GradeRecordResponse[];
  weeklyActivity: WeeklyActivityResponse[];
  skillProgress: SkillProgressResponse[];
  interestData: string[];
  enrolledCourses: CourseSummaryResponse[];
  achievements: AchievementResponse[];
}
