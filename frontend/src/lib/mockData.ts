import { UserProfile } from '../types/auth';
import { Course, StatMetric, TaskDeadline, ActivityEvent, ClassScheduleItem, ChildProfile } from '../types/dashboard';

export const mockUsers: Record<string, UserProfile> = {
  student: {
    id: 'usr_std_101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@shreenil.edu',
    phone: '+91 98765 43210',
    role: 'student',
    institution: 'Vishwakarma Institute of Technology',
    department: 'Computer Science and Engineering (Artificial Intelligence)',
    studentId: 'VIT-2026-AI88',
    title: 'T.Y. B.Tech Scholar (Module V)',
    bio: 'Pursuing B.Tech in CSE (Artificial Intelligence). Research interests in Deep Learning, MLOps, and Federated Optimization.',
    joinedDate: 'Aug 2024',
  },
  teacher: {
    id: 'usr_tch_202',
    name: 'Dr. Elena Rostova',
    email: 'elena.rostova@vit.edu',
    phone: '+91 98765 12345',
    role: 'teacher',
    institution: 'Vishwakarma Institute of Technology',
    department: 'Department of CSE (Artificial Intelligence)',
    facultyId: 'FAC-VIT-AI04',
    title: 'Professor & Head of AI Board of Studies',
    bio: 'Lead instructor for CI3001 (Deep Learning) and CI4001 (Generative AI) with extensive experience in neural architectures.',
    joinedDate: 'Jan 2022',
  },
  parent: {
    id: 'usr_par_303',
    name: 'Vikram Sharma',
    email: 'vikram.sharma@gmail.com',
    phone: '+91 98765 99887',
    role: 'parent',
    institution: 'VIT Parent-Teacher Forum',
    title: 'Parent / Guardian',
    bio: 'Parent of Aarav Sharma (T.Y. B.Tech CSE-AI, AY 2026-27).',
    joinedDate: 'Sep 2024',
  },
  admin: {
    id: 'usr_adm_404',
    name: 'Dean Arthur Pendelton',
    email: 'dean.pendelton@vit.edu',
    phone: '+91 98765 55443',
    role: 'admin',
    institution: 'Vishwakarma Institute of Technology',
    department: 'Academic Board & Directorate of Examinations',
    facultyId: 'ADM-VIT-001',
    title: 'Chairman – Academic Board',
    bio: 'Overseeing autonomous curriculum execution, BOS approvals, and AY 2026-27 assessment guidelines.',
    joinedDate: 'Jun 2021',
  },
};

// ======================= STUDENT MOCK DATA =======================
export const studentStats: StatMetric[] = [
  { id: '1', label: 'Module V Courses', value: 6, change: 'AY 2026-27', changeType: 'positive', icon: 'BookOpen', helperText: '24 Academic Credits' },
  { id: '2', label: 'Cumulative CGPA', value: '9.42', change: '+0.18 vs Sem 4', changeType: 'positive', icon: 'Award', helperText: 'Dean’s Honor Roll' },
  { id: '3', label: 'Attendance Rate', value: '96.8%', change: 'Normal', changeType: 'neutral', icon: 'CheckCircle2', helperText: '48/50 theory & lab sessions' },
  { id: '4', label: 'Pending Practicals', value: 2, change: 'Due this week', changeType: 'negative', icon: 'Clock', helperText: 'Next: CI3001 Practical 2' },
];

export const studentCourses: Course[] = [
  {
    id: 'ci3001',
    code: 'CI3001',
    title: 'Deep Learning',
    instructor: 'Dr. Elena Rostova',
    term: 'AY 2026-27 • Module V',
    progress: 68,
    grade: 'A+',
    nextSession: 'Tomorrow, 10:00 AM • Auditorium Hall A',
    category: 'Computer Science & AI',
  },
  {
    id: 'ci3202',
    code: 'CI3202',
    title: 'Operating System',
    instructor: 'Prof. Marcus Vance',
    term: 'AY 2026-27 • Module V',
    progress: 54,
    grade: 'A',
    nextSession: 'Thursday, 02:00 PM • Systems Lab',
    category: 'Systems & Infrastructure',
  },
  {
    id: 'ci3003d',
    code: 'CI3003D',
    title: 'MLOPS',
    instructor: 'Dr. Sarah Lin',
    term: 'AY 2026-27 • Module V',
    progress: 42,
    grade: 'A-',
    nextSession: 'Friday, 11:30 AM • Cloud Studio',
    category: 'Computer Science & AI',
  },
  {
    id: 'ci3203b',
    code: 'CI3203B',
    title: 'Distributed and Federated Learning',
    instructor: 'Prof. Kenji Takahashi',
    term: 'AY 2026-27 • Module V',
    progress: 30,
    grade: 'A',
    nextSession: 'Monday, 09:00 AM • AI Research Wing',
    category: 'Computer Science & AI',
  },
  {
    id: 'ci3203a',
    code: 'CI3203A',
    title: 'Ethical and Responsible AI',
    instructor: 'Dr. Aris Thorne',
    term: 'AY 2026-27 • Module V',
    progress: 60,
    grade: 'A',
    nextSession: 'Tuesday, 01:30 PM • Seminar Hall 2',
    category: 'Computer Science & AI',
  },
];

export const studentDeadlines: TaskDeadline[] = [
  {
    id: 'tsk-1',
    title: 'CI3001 Practical 2: MLP on Iris/Wine Dataset',
    courseCode: 'CI3001',
    dueDate: 'Tomorrow, 11:59 PM',
    type: 'assignment',
    status: 'pending',
    points: 100,
    priority: 'high',
  },
  {
    id: 'tsk-2',
    title: 'CI3202 Practical 1: Shell & Awk Database Program',
    courseCode: 'CI3202',
    dueDate: 'Sep 16, 5:00 PM',
    type: 'assignment',
    status: 'pending',
    points: 50,
    priority: 'medium',
  },
  {
    id: 'tsk-3',
    title: 'CI3001 Quiz 2: CNN Architectures & Hyperparameters',
    courseCode: 'CI3001',
    dueDate: 'Sep 20, 11:59 PM',
    type: 'quiz',
    status: 'pending',
    points: 20,
    priority: 'medium',
  },
];

export const studentActivities: ActivityEvent[] = [
  {
    id: 'act-1',
    actor: 'Dr. Elena Rostova',
    action: 'graded your laboratory submission for',
    target: 'CI3001 Practical 1: TensorFlow Setup & Preprocessing (96/100)',
    timestamp: '2 hours ago',
    type: 'grade',
  },
  {
    id: 'act-2',
    actor: 'Prof. Marcus Vance',
    action: 'posted lecture notes for',
    target: 'CI3202 Unit 2: CPU Scheduling & Process Control Block in Linux',
    timestamp: '5 hours ago',
    type: 'course',
  },
  {
    id: 'act-3',
    actor: 'Academic Board (VIT)',
    action: 'published assessment guidelines for',
    target: 'AY 2026-27 End Semester Examination (ESE) Schedule',
    timestamp: '1 day ago',
    type: 'announcement',
  },
];

// ======================= TEACHER MOCK DATA =======================
export const teacherStats: StatMetric[] = [
  { id: '1', label: 'Module V Courses', value: 3, change: 'AY 2026-27', changeType: 'positive', icon: 'BookOpen', helperText: 'Teaching load: 10 hrs/wk' },
  { id: '2', label: 'Enrolled Scholars', value: 168, change: '+14 new', changeType: 'positive', icon: 'Users', helperText: 'Across T.Y. B.Tech cohorts' },
  { id: '3', label: 'Pending SpeedGrader', value: 12, change: '4 high priority', changeType: 'negative', icon: 'FileText', helperText: 'Submissions awaiting review' },
  { id: '4', label: 'Classes Today', value: 2, change: '10:00 AM & 2:00 PM', changeType: 'neutral', icon: 'Calendar', helperText: 'Next starts in 35 min' },
];

export const teacherCourses: Course[] = [
  {
    id: 'ci3001',
    code: 'CI3001',
    title: 'Deep Learning',
    instructor: 'Dr. Elena Rostova',
    term: 'AY 2026-27 • Module V',
    progress: 68,
    enrolledStudents: 68,
    nextSession: 'Today, 10:00 AM',
    category: 'Computer Science & AI',
  },
  {
    id: 'ci4001',
    code: 'CI4001',
    title: 'Generative AI',
    instructor: 'Dr. Elena Rostova',
    term: 'AY 2026-27 • Module VII',
    progress: 25,
    enrolledStudents: 42,
    nextSession: 'Today, 02:00 PM',
    category: 'Computer Science & AI',
  },
  {
    id: 'ci4005',
    code: 'CI4005',
    title: 'Natural Language Processing',
    instructor: 'Dr. Elena Rostova',
    term: 'AY 2026-27 • Module VIII',
    progress: 15,
    enrolledStudents: 38,
    nextSession: 'Thursday, 09:30 AM',
    category: 'Computer Science & AI',
  },
];

export const teacherPendingTasks: TaskDeadline[] = [
  {
    id: 'tp-1',
    title: 'CI3001 Practical 2: MLP on Wine Dataset (68 Submissions)',
    courseCode: 'CI3001',
    dueDate: 'Due Sep 14',
    type: 'grading',
    status: 'pending',
    points: 100,
    priority: 'high',
  },
  {
    id: 'tp-2',
    title: 'Review Capstone Project Area Choices (18 Approved Topics)',
    courseCode: 'CI3001',
    dueDate: 'Due Sep 18',
    type: 'grading',
    status: 'pending',
    priority: 'medium',
  },
];

export const teacherScheduleToday: ClassScheduleItem[] = [
  {
    id: 'sch-1',
    courseCode: 'CI3001',
    courseTitle: 'Deep Learning: Unit I Fundamentals',
    time: '10:00 AM - 11:30 AM',
    roomOrLink: 'Auditorium Hall A (VIT)',
    isVirtual: true,
    instructorOrClass: 'T.Y. B.Tech CSE-AI (68 Scholars)',
    status: 'upcoming',
  },
  {
    id: 'sch-2',
    courseCode: 'CI4001',
    courseTitle: 'Generative AI: Unit I Processing Text',
    time: '02:00 PM - 03:45 PM',
    roomOrLink: 'AI Lab 304',
    isVirtual: false,
    instructorOrClass: 'Final Year B.Tech CSE-AI (42 Scholars)',
    status: 'upcoming',
  },
];

export const teacherActivities: ActivityEvent[] = [
  {
    id: 'ta-1',
    actor: 'Rohan Verma',
    action: 'submitted laboratory report for',
    target: 'CI3001 Practical 2: Multilayer Perceptron',
    timestamp: '15 mins ago',
    type: 'submission',
  },
  {
    id: 'ta-2',
    actor: 'Priya Patel',
    action: 'submitted laboratory report for',
    target: 'CI3001 Practical 2: Multilayer Perceptron',
    timestamp: '1 hour ago',
    type: 'submission',
  },
];

// ======================= PARENT MOCK DATA =======================
export const parentChildren: ChildProfile[] = [
  {
    id: 'child-1',
    name: 'Aarav Sharma',
    grade: 'T.Y. B.Tech CSE (AI)',
    section: 'Module V (AY 2026-27)',
    studentId: 'VIT-2026-AI88',
    attendanceRate: 96.8,
    currentGpa: 9.42,
    coursesCount: 6,
  },
];

export const parentStats: StatMetric[] = [
  { id: '1', label: 'Children Enrolled', value: 1, change: 'Active', changeType: 'neutral', icon: 'Users', helperText: 'T.Y. B.Tech in good standing' },
  { id: '2', label: 'Avg Attendance', value: '96.8%', change: '+1.2%', changeType: 'positive', icon: 'CheckCircle2', helperText: 'High academic attendance' },
  { id: '3', label: 'Next Parent-Faculty Meet', value: 1, change: 'Sep 22, 4:00 PM', changeType: 'neutral', icon: 'Calendar', helperText: 'With Dr. Elena Rostova' },
  { id: '4', label: 'Academic Dues / Fees', value: 'Cleared', change: 'All Clear', changeType: 'positive', icon: 'ShieldCheck', helperText: 'AY 2026-27 Term fees settled' },
];

export const parentRecentUpdates: ActivityEvent[] = [
  {
    id: 'pu-1',
    actor: 'Dr. Elena Rostova (Faculty Mentor)',
    action: 'shared academic milestone for Aarav:',
    target: 'Outstanding grade (96/100) in Deep Learning Practical 1',
    timestamp: 'Yesterday at 3:30 PM',
    type: 'grade',
  },
  {
    id: 'pu-2',
    actor: 'Dean Arthur Pendelton',
    action: 'issued academic circular for',
    target: 'Module V Continuous Assessment (CA) and Project Timelines',
    timestamp: '2 days ago',
    type: 'announcement',
  },
];

// ======================= ADMIN MOCK DATA =======================
export const adminStats: StatMetric[] = [
  { id: '1', label: 'Enrolled AI Scholars', value: '240', change: 'T.Y. & Final Year', changeType: 'positive', icon: 'GraduationCap', helperText: 'B.Tech CSE (AI) Program' },
  { id: '2', label: 'BOS Faculty Members', value: '28', change: 'CSE (AI) Board', changeType: 'positive', icon: 'Users', helperText: 'Approved by Academic Board' },
  { id: '3', label: 'Module V Active Subjects', value: '8', change: 'AY 2026-27', changeType: 'neutral', icon: 'BookOpen', helperText: '24 Total Credits per Scholar' },
  { id: '4', label: 'Academic SLA & Health', value: '99.98%', change: 'All Nodes Operational', changeType: 'positive', icon: 'Activity', helperText: '0 system outages' },
];

export const adminRecentRegistrations = [
  { id: 'reg-1', name: 'Zoya Khan', role: 'Student', email: 'zoya.k@vit.edu', department: 'CSE (AI) Module V', date: '10 mins ago', status: 'Active' },
  { id: 'reg-2', name: 'Prof. Marcus Vance', role: 'Faculty', email: 'm.vance@vit.edu', department: 'Operating Systems', date: '45 mins ago', status: 'Active' },
  { id: 'reg-3', name: 'Dr. Sarah Lin', role: 'Faculty', email: 's.lin@vit.edu', department: 'MLOPS & DevOps', date: '2 hours ago', status: 'Active' },
  { id: 'reg-4', name: 'Aarav Sharma', role: 'Student', email: 'aarav.sharma@vit.edu', department: 'CSE (AI) Module V', date: '3 hours ago', status: 'Active' },
];

export const adminSystemLogs: ActivityEvent[] = [
  {
    id: 'adm-1',
    actor: 'Board of Studies in CSE (AI)',
    action: 'synced curriculum registry for',
    target: 'B.Tech CSE (Artificial Intelligence) AY 2026-27',
    timestamp: '12 mins ago',
    type: 'system',
  },
  {
    id: 'adm-2',
    actor: 'Dean Arthur Pendelton',
    action: 'approved examination assessment schemes for',
    target: 'Module V: CI3001, CI3202, CI3003D, CI3203B, CI3203A, CI3203C',
    timestamp: '1 hour ago',
    type: 'course',
  },
];
