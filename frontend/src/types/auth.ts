export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatarUrl?: string;
  institution: string;
  department?: string;
  studentId?: string;
  facultyId?: string;
  title?: string;
  bio?: string;
  joinedDate: string;
}

export interface AuthState {
  user: UserProfile;
  currentRole: UserRole;
  isAuthenticated: boolean;
}
