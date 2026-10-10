// Central Student Portal Service with LocalStorage persistence & Mock API adapter

export interface StudentProfileData {
  id: string;
  admissionNumber: string;
  rollNumber: string;
  fullName: string;
  displayName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  classDivision: string;
  degreeProgram: string;
  department: string;
  institution: string;
  academicYear: string;
  semester: string;
  cgpa: number;
  creditsEarned: number;
  totalCredits: number;
  attendancePercent: number;
  studyStreakDays: number;
  points: number;
  badgeTitle: string;
  bio: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  skills: string[];
  interests: string[];
}

export interface TimetableSlot {
  id: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  room: string;
  type: 'Theory' | 'Lab' | 'Tutorial' | 'Seminar';
  color: string;
}

export interface AssignmentItem {
  id: string;
  code: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  description: string;
  dueAt: string;
  assignedAt: string;
  maxMarks: number;
  status: 'Not Started' | 'In Progress' | 'Submitted' | 'Under Review' | 'Graded' | 'Overdue';
  priority: 'High' | 'Medium' | 'Low';
  submittedAt?: string;
  submissionText?: string;
  submissionFile?: string;
  marksObtained?: number;
  feedback?: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  subjectCode: string;
  subjectName: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  sessionType: 'Theory' | 'Lab';
}

export interface LeaveRequest {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  category: 'Medical' | 'Personal' | 'Academic Event' | 'Other';
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedAt: string;
}

export interface ExamRecord {
  id: string;
  courseCode: string;
  courseName: string;
  examType: 'Mid-Sem Examination' | 'In-Sem Assessment' | 'End-Sem Evaluation' | 'Lab Practical Viva';
  date: string;
  time: string;
  venue: string;
  maxMarks: number;
  marksObtained?: number;
  grade?: string;
  status: 'Upcoming' | 'Published' | 'Evaluation In Progress';
  facultyRemarks?: string;
}

export interface LibraryItem {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: 'Artificial Intelligence' | 'Computer Systems' | 'Mathematics' | 'Security & Ethics' | 'Software Engineering';
  availableCopies: number;
  totalCopies: number;
  isReserved: boolean;
  coverImage?: string;
  description: string;
  publishedYear: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  startDate: string;
  endDate?: string;
  status: 'Completed' | 'In Progress' | 'Planning';
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Hackathon' | 'Technical Workshop' | 'Guest Lecture' | 'Cultural' | 'Sports';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  registered: boolean;
  capacity: number;
  spotsLeft: number;
  description: string;
}

export interface FeeItem {
  id: string;
  title: string;
  academicYear: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  status: 'Paid' | 'Partially Paid' | 'Due';
  receiptNo?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'academic' | 'assignment' | 'exam' | 'event' | 'fees';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// Initial Mock Seed Data
const initialProfile: StudentProfileData = {
  id: 'std-2026-vit-001',
  admissionNumber: 'ADM-2024-VIT-9801',
  rollNumber: '26BCE1042',
  fullName: 'Aarav Sharma',
  displayName: 'Aarav Sharma',
  email: 'aarav.sharma@shreenil.edu',
  phone: '+91 98234 56789',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  dateOfBirth: '2005-02-14',
  gender: 'Male',
  bloodGroup: 'B+',
  classDivision: 'Module V • Div A',
  degreeProgram: 'B.Tech Computer Science & Engineering (Artificial Intelligence)',
  department: 'Department of Computer Engineering',
  institution: 'Vishwakarma Institute of Technology, Pune',
  academicYear: 'AY 2026-27 (Year 3)',
  semester: 'Semester V (Module V)',
  cgpa: 8.92,
  creditsEarned: 96,
  totalCredits: 160,
  attendancePercent: 92.4,
  studyStreakDays: 18,
  points: 78.5,
  badgeTitle: 'Best AI Systems Developer Badge',
  bio: 'Junior B.Tech CSE (AI) student passionate about Deep Learning architectures, MLOps automation, and edge neural inference.',
  address: 'Flat 402, Green Meadows Residency, Bibwewadi Campus Road',
  city: 'Pune',
  state: 'Maharashtra',
  pincode: '411037',
  parentName: 'Mr. Vikram Sharma',
  parentRelation: 'Father',
  parentPhone: '+91 98220 11223',
  parentEmail: 'vikram.sharma@gmail.com',
  emergencyContact: '+91 98220 11223',
  skills: ['Python', 'PyTorch', 'TensorFlow', 'Docker', 'FastAPI', 'MLOps', 'React', 'Linux'],
  interests: ['Computer Vision', 'Deep Generative Models', 'Autonomous Systems', 'Competitive Coding'],
};

const initialAssignments: AssignmentItem[] = [
  {
    id: 'asg-01',
    code: 'CI3001-PRAC-02',
    title: 'Multi-Layer Perceptron (MLP) Implementation from Scratch',
    subjectCode: 'CI3001',
    subjectName: 'Deep Learning',
    facultyName: 'Dr. Elena Rostova',
    description: 'Implement backpropagation and gradient descent optimization on MNIST dataset using pure NumPy without PyTorch/TensorFlow.',
    assignedAt: '2026-09-08',
    dueAt: '2026-10-14T23:59:00',
    maxMarks: 25,
    status: 'In Progress',
    priority: 'High',
  },
  {
    id: 'asg-02',
    code: 'CI3003D-MLOPS-01',
    title: 'Containerized Model Serving Pipeline with Docker & FastAPI',
    subjectCode: 'CI3003D',
    subjectName: 'MLOPS',
    facultyName: 'Prof. Rajesh Kulkarni',
    description: 'Build an automated inference service with input validation, batching, and Docker Compose orchestration.',
    assignedAt: '2026-09-12',
    dueAt: '2026-10-18T18:00:00',
    maxMarks: 20,
    status: 'Not Started',
    priority: 'Medium',
  },
  {
    id: 'asg-03',
    code: 'CI3202-OS-03',
    title: 'Multi-threaded Process Scheduling Simulation in C++',
    subjectCode: 'CI3202',
    subjectName: 'Operating System',
    facultyName: 'Dr. Anita Deshmukh',
    description: 'Simulate Round-Robin and Priority Scheduling algorithms with context switching latency measurements.',
    assignedAt: '2026-09-01',
    dueAt: '2026-09-20T23:59:00',
    maxMarks: 30,
    status: 'Graded',
    priority: 'Medium',
    submittedAt: '2026-09-18T14:32:00',
    submissionText: 'GitHub repo: github.com/aarav-sharma/os-scheduler-sim with comprehensive benchmarks.',
    marksObtained: 28,
    feedback: 'Excellent timing simulation and clear visualization of preemptive scheduling.',
  },
  {
    id: 'asg-04',
    code: 'CI3203B-DFL-01',
    title: 'Federated Averaging (FedAvg) Protocol Implementation',
    subjectCode: 'CI3203B',
    subjectName: 'Distributed & Federated Learning',
    facultyName: 'Dr. Sameer Joshi',
    description: 'Implement privacy-preserving Federated Learning across 5 non-IID client partitions.',
    assignedAt: '2026-09-15',
    dueAt: '2026-10-22T23:59:00',
    maxMarks: 25,
    status: 'Not Started',
    priority: 'Low',
  },
];

const initialTimetable: TimetableSlot[] = [
  { id: 'tt-1', dayOfWeek: 'Monday', startTime: '09:00 AM', endTime: '10:30 AM', subjectCode: 'CI3001', subjectName: 'Deep Learning', facultyName: 'Dr. Elena Rostova', room: 'Hall 302', type: 'Theory', color: '#36B875' },
  { id: 'tt-2', dayOfWeek: 'Monday', startTime: '11:00 AM', endTime: '01:00 PM', subjectCode: 'CI3001', subjectName: 'Deep Learning Lab', facultyName: 'Dr. Elena Rostova', room: 'AI Lab 1', type: 'Lab', color: '#18794E' },
  { id: 'tt-3', dayOfWeek: 'Monday', startTime: '02:00 PM', endTime: '03:30 PM', subjectCode: 'CI3202', subjectName: 'Operating System', facultyName: 'Dr. Anita Deshmukh', room: 'Room 204', type: 'Theory', color: '#6366F1' },
  { id: 'tt-4', dayOfWeek: 'Tuesday', startTime: '09:30 AM', endTime: '11:00 AM', subjectCode: 'CI3003D', subjectName: 'MLOPS', facultyName: 'Prof. Rajesh Kulkarni', room: 'Hall 105', type: 'Theory', color: '#F59E0B' },
  { id: 'tt-5', dayOfWeek: 'Tuesday', startTime: '11:30 AM', endTime: '01:00 PM', subjectCode: 'CI3203B', subjectName: 'Distributed Learning', facultyName: 'Dr. Sameer Joshi', room: 'Room 301', type: 'Theory', color: '#EC4899' },
  { id: 'tt-6', dayOfWeek: 'Wednesday', startTime: '09:00 AM', endTime: '11:00 AM', subjectCode: 'CI3003D', subjectName: 'MLOPS Lab', facultyName: 'Prof. Rajesh Kulkarni', room: 'Cloud Lab 2', type: 'Lab', color: '#F59E0B' },
  { id: 'tt-7', dayOfWeek: 'Wednesday', startTime: '01:30 PM', endTime: '03:00 PM', subjectCode: 'CI3203A', subjectName: 'Ethical & Responsible AI', facultyName: 'Dr. Neha Patil', room: 'Seminar Hall', type: 'Theory', color: '#8B5CF6' },
  { id: 'tt-8', dayOfWeek: 'Thursday', startTime: '10:00 AM', endTime: '11:30 AM', subjectCode: 'CI3001', subjectName: 'Deep Learning', facultyName: 'Dr. Elena Rostova', room: 'Hall 302', type: 'Theory', color: '#36B875' },
  { id: 'tt-9', dayOfWeek: 'Thursday', startTime: '02:00 PM', endTime: '04:00 PM', subjectCode: 'CI3202', subjectName: 'OS Systems Lab', facultyName: 'Dr. Anita Deshmukh', room: 'Systems Lab', type: 'Lab', color: '#6366F1' },
  { id: 'tt-10', dayOfWeek: 'Friday', startTime: '09:30 AM', endTime: '11:00 AM', subjectCode: 'CI3203C', subjectName: 'Information Security', facultyName: 'Prof. Amit Verma', room: 'Room 208', type: 'Theory', color: '#0EA5E9' },
  { id: 'tt-11', dayOfWeek: 'Friday', startTime: '11:30 AM', endTime: '01:00 PM', subjectCode: 'CI3003D', subjectName: 'MLOPS', facultyName: 'Prof. Rajesh Kulkarni', room: 'Hall 105', type: 'Theory', color: '#F59E0B' },
];

const initialExams: ExamRecord[] = [
  { id: 'ex-01', courseCode: 'CI3001', courseName: 'Deep Learning', examType: 'Mid-Sem Examination', date: '2026-10-28', time: '10:00 AM - 12:30 PM', venue: 'Auditorium Hall A', maxMarks: 50, status: 'Upcoming' },
  { id: 'ex-02', courseCode: 'CI3202', courseName: 'Operating System', examType: 'Mid-Sem Examination', date: '2026-10-30', time: '10:00 AM - 12:30 PM', venue: 'Auditorium Hall B', maxMarks: 50, status: 'Upcoming' },
  { id: 'ex-03', courseCode: 'CI3003D', courseName: 'MLOPS', examType: 'In-Sem Assessment', date: '2026-09-18', time: '02:00 PM - 03:30 PM', venue: 'Room 302', maxMarks: 30, marksObtained: 28, grade: 'A+', status: 'Published', facultyRemarks: 'Strong grasp of CI/CD concepts.' },
  { id: 'ex-04', courseCode: 'CI3001', courseName: 'Deep Learning', examType: 'In-Sem Assessment', date: '2026-09-15', time: '11:00 AM - 12:30 PM', venue: 'Room 302', maxMarks: 30, marksObtained: 29, grade: 'O', status: 'Published', facultyRemarks: 'Flawless neural architecture derivation.' },
  { id: 'ex-05', courseCode: 'CI3202', courseName: 'Operating System', examType: 'In-Sem Assessment', date: '2026-09-10', time: '09:30 AM - 11:00 AM', venue: 'Hall 105', maxMarks: 30, marksObtained: 26, grade: 'A', status: 'Published', facultyRemarks: 'Good analysis of virtual memory paging.' },
];

const initialProjects: PortfolioProject[] = [
  {
    id: 'proj-01',
    title: 'EdgeVision — Real-Time Defect Detection using YOLOv9 & TensorRT',
    category: 'Computer Vision & Embedded AI',
    description: 'Engineered an ultra-fast automated optical inspection system achieving 82 FPS on NVIDIA Jetson Orin Nano with 98.4% mAP.',
    techStack: ['PyTorch', 'YOLOv9', 'TensorRT', 'CUDA', 'C++', 'OpenCV'],
    githubUrl: 'https://github.com/aarav-sharma/edgevision-trt',
    liveDemoUrl: 'https://edgevision-demo.shreenil.ai',
    startDate: '2026-06-01',
    endDate: '2026-08-15',
    status: 'Completed',
  },
  {
    id: 'proj-02',
    title: 'SyllabusGPT — Retrieval-Augmented Academic Assistant for VIT Pune',
    category: 'Natural Language Processing & RAG',
    description: 'Built a vectorized hybrid BM25 + dense semantic retrieval system parsing official VIT syllabus syllabi and textbook chapters.',
    techStack: ['FastAPI', 'LangChain', 'Qdrant Vector DB', 'React', 'TypeScript'],
    githubUrl: 'https://github.com/aarav-sharma/syllabus-rag-assistant',
    startDate: '2026-08-20',
    status: 'In Progress',
  },
];

const initialEvents: EventItem[] = [
  {
    id: 'evt-01',
    title: 'VIT Pune AI Conclave & Hackathon 2026',
    category: 'Hackathon',
    date: '2026-10-24',
    time: '09:00 AM - 09:00 PM',
    venue: 'Sharad Arena Campus Ground',
    organizer: 'CSE AI Student Council',
    registered: true,
    capacity: 250,
    spotsLeft: 34,
    description: '36-hour flagship hackathon solving industrial problems with generative AI, autonomous robotics, and edge systems.',
  },
  {
    id: 'evt-02',
    title: 'Workshop: Scalable ML Pipelines with Kubernetes & Kubeflow',
    category: 'Technical Workshop',
    date: '2026-10-18',
    time: '02:00 PM - 05:00 PM',
    venue: 'Virtual Hall A (Jitsi Meet)',
    organizer: 'ACM Student Chapter',
    registered: false,
    capacity: 100,
    spotsLeft: 12,
    description: 'Hands-on live deployment of Kubeflow pipelines with model lineage tracking and automated rollback.',
  },
];

const initialNotifications: NotificationItem[] = [
  { id: 'notif-01', title: 'Mid-Sem Examination Schedule Published', message: 'AY 2026-27 Module V Mid-Sem exam timetable is now official. Check Examinations & Results.', category: 'exam', timestamp: '2 hours ago', isRead: false, actionUrl: '/student/examinations' },
  { id: 'notif-02', title: 'Assignment Graded: OS Scheduler Sim', message: 'Dr. Anita Deshmukh has evaluated CI3202-OS-03. Marks: 28/30.', category: 'assignment', timestamp: '5 hours ago', isRead: false, actionUrl: '/student/assignments' },
  { id: 'notif-03', title: 'Registration Confirmed: AI Conclave Hackathon', message: 'Your team registration for VIT AI Conclave 2026 has been approved.', category: 'event', timestamp: '1 day ago', isRead: true, actionUrl: '/student/events' },
  { id: 'notif-04', title: 'Library Book Due Reminder', message: 'Deep Learning by Ian Goodfellow is due in 3 days. Renew online if needed.', category: 'academic', timestamp: '2 days ago', isRead: true, actionUrl: '/student/library' },
];

class StudentPortalService {
  private getStorage<T>(key: string, defaultVal: T): T {
    try {
      const data = localStorage.getItem(`shreenil_${key}`);
      return data ? JSON.parse(data) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private setStorage<T>(key: string, val: T): void {
    try {
      localStorage.setItem(`shreenil_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  // Profile
  getProfile(): StudentProfileData {
    return this.getStorage<StudentProfileData>('student_profile', initialProfile);
  }

  updateProfile(updates: Partial<StudentProfileData>): StudentProfileData {
    const current = this.getProfile();
    const updated = { ...current, ...updates };
    this.setStorage('student_profile', updated);
    return updated;
  }

  // Assignments
  getAssignments(): AssignmentItem[] {
    return this.getStorage<AssignmentItem[]>('student_assignments', initialAssignments);
  }

  getAssignmentById(id: string): AssignmentItem | undefined {
    return this.getAssignments().find((a) => a.id === id);
  }

  submitAssignment(id: string, submissionText: string, fileName?: string): AssignmentItem {
    const list = this.getAssignments();
    const updated = list.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: 'Submitted' as const,
          submittedAt: new Date().toISOString(),
          submissionText,
          submissionFile: fileName || 'assignment_submission.pdf',
        };
      }
      return item;
    });
    this.setStorage('student_assignments', updated);
    return updated.find((a) => a.id === id)!;
  }

  // Timetable
  getTimetable(): TimetableSlot[] {
    return this.getStorage<TimetableSlot[]>('student_timetable', initialTimetable);
  }

  // Exams
  getExams(): ExamRecord[] {
    return this.getStorage<ExamRecord[]>('student_exams', initialExams);
  }

  // Projects
  getProjects(): PortfolioProject[] {
    return this.getStorage<PortfolioProject[]>('student_projects', initialProjects);
  }

  addProject(project: Omit<PortfolioProject, 'id'>): PortfolioProject {
    const list = this.getProjects();
    const newProj: PortfolioProject = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    list.unshift(newProj);
    this.setStorage('student_projects', list);
    return newProj;
  }

  updateProject(id: string, updates: Partial<PortfolioProject>): PortfolioProject {
    const list = this.getProjects();
    const updated = list.map((p) => (p.id === id ? { ...p, ...updates } : p));
    this.setStorage('student_projects', updated);
    return updated.find((p) => p.id === id)!;
  }

  deleteProject(id: string): void {
    const list = this.getProjects().filter((p) => p.id !== id);
    this.setStorage('student_projects', list);
  }

  // Events
  getEvents(): EventItem[] {
    return this.getStorage<EventItem[]>('student_events', initialEvents);
  }

  toggleEventRegistration(id: string): EventItem {
    const list = this.getEvents();
    const updated = list.map((ev) => {
      if (ev.id === id) {
        const newRegistered = !ev.registered;
        return {
          ...ev,
          registered: newRegistered,
          spotsLeft: newRegistered ? Math.max(0, ev.spotsLeft - 1) : ev.spotsLeft + 1,
        };
      }
      return ev;
    });
    this.setStorage('student_events', updated);
    return updated.find((e) => e.id === id)!;
  }

  // Notifications
  getNotifications(): NotificationItem[] {
    return this.getStorage<NotificationItem[]>('student_notifications', initialNotifications);
  }

  markNotificationAsRead(id: string): void {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, isRead: true } : n));
    this.setStorage('student_notifications', list);
  }

  markAllNotificationsAsRead(): void {
    const list = this.getNotifications().map((n) => ({ ...n, isRead: true }));
    this.setStorage('student_notifications', list);
  }

  // Leave Requests
  submitLeaveRequest(req: Omit<LeaveRequest, 'id' | 'status' | 'submittedAt'>): LeaveRequest {
    const list = this.getStorage<LeaveRequest[]>('student_leave_requests', []);
    const newReq: LeaveRequest = {
      ...req,
      id: `leave-${Date.now()}`,
      status: 'Pending',
      submittedAt: new Date().toISOString(),
    };
    list.unshift(newReq);
    this.setStorage('student_leave_requests', list);
    return newReq;
  }

  getLeaveRequests(): LeaveRequest[] {
    return this.getStorage<LeaveRequest[]>('student_leave_requests', [
      {
        id: 'leave-prev-01',
        startDate: '2026-09-04',
        endDate: '2026-09-05',
        reason: 'Attended Inter-Collegiate AI Hackathon at COEP Pune',
        category: 'Academic Event',
        status: 'Approved',
        submittedAt: '2026-09-01T10:00:00',
      },
    ]);
  }
}

export const studentPortalService = new StudentPortalService();
