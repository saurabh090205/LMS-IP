export interface StatMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  helperText?: string;
  icon: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  term: string;
  progress: number;
  grade?: string;
  nextSession?: string;
  colorTheme?: string;
  category?: string;
  enrolledStudents?: number;
  thumbnail?: string;
}

export interface TaskDeadline {
  id: string;
  title: string;
  courseCode: string;
  dueDate: string;
  dueTime?: string;
  type: 'assignment' | 'quiz' | 'exam' | 'grading' | 'meeting';
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  points?: number;
  priority?: 'high' | 'medium' | 'low';
}

export interface ActivityEvent {
  id: string;
  actor: string;
  actorAvatar?: string;
  action: string;
  target: string;
  timestamp: string;
  icon?: string;
  type: 'course' | 'grade' | 'submission' | 'announcement' | 'system';
}

export interface ClassScheduleItem {
  id: string;
  courseCode: string;
  courseTitle: string;
  time: string;
  roomOrLink: string;
  isVirtual: boolean;
  instructorOrClass: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface ChildProfile {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatarUrl?: string;
  studentId: string;
  attendanceRate: number;
  currentGpa: number;
  coursesCount: number;
}
