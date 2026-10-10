import { RoleNavigationMap } from '../../types/navigation';

export const roleNavigationConfig: RoleNavigationMap = {
  student: [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'std-dash', title: 'Dashboard', href: '/student/dashboard', icon: 'LayoutDashboard' },
        { id: 'std-prof', title: 'My Profile', href: '/student/profile', icon: 'User' },
      ],
    },
    {
      title: 'LEARNING',
      items: [
        { id: 'std-acad', title: 'My Academics', href: '/student/academics', icon: 'GraduationCap' },
        { id: 'std-courses', title: 'Subjects & Materials', href: '/student/courses', icon: 'BookOpen', badge: 6 },
        { id: 'std-tt', title: 'Timetable', href: '/student/timetable', icon: 'Calendar' },
        { id: 'std-assign', title: 'Assignments & Homework', href: '/student/assignments', icon: 'CheckSquare', badge: 3, badgeVariant: 'warning' },
        { id: 'std-att', title: 'Attendance', href: '/student/attendance', icon: 'Clock' },
        { id: 'std-exams', title: 'Examinations & Results', href: '/student/examinations', icon: 'Award' },
        { id: 'std-lib', title: 'Digital Library', href: '/student/library', icon: 'Library' },
      ],
    },
    {
      title: 'CAMPUS LIFE',
      items: [
        { id: 'std-sports', title: 'Sports & Fitness', href: '/student/sports', icon: 'Trophy' },
        { id: 'std-events', title: 'Events & Activities', href: '/student/events', icon: 'CalendarDays', badge: 'New', badgeVariant: 'primary' },
        { id: 'std-port', title: 'Projects & Portfolio', href: '/student/portfolio', icon: 'Briefcase' },
      ],
    },
    {
      title: 'STUDENT SERVICES',
      items: [
        { id: 'std-fees', title: 'Fees & Payments', href: '/student/fees', icon: 'CreditCard' },
        { id: 'std-comm', title: 'Communication Centre', href: '/student/communications', icon: 'MessageSquare', badge: 2, badgeVariant: 'primary' },
        { id: 'std-docs', title: 'My Documents', href: '/student/documents', icon: 'FileText' },
        { id: 'std-notif', title: 'Notifications', href: '/student/notifications', icon: 'Bell', badge: 4, badgeVariant: 'danger' },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        { id: 'std-settings', title: 'Settings', href: '/student/settings', icon: 'Settings' },
        { id: 'std-help', title: 'Help & Support', href: '/student/help', icon: 'HelpCircle' },
      ],
    },
  ],
  teacher: [
    {
      title: 'Faculty Hub',
      items: [
        { id: 'tch-dash', title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
        { id: 'tch-courses', title: 'My Courses', href: '/teacher/courses', icon: 'BookOpen', badge: 4 },
        { id: 'tch-classes', title: 'Live Classes', href: '/teacher/classes', icon: 'Users' },
        { id: 'tch-assign', title: 'Assignments', href: '/teacher/assignments', icon: 'CheckSquare' },
        { id: 'tch-grades', title: 'Gradebook', href: '/teacher/gradebook', icon: 'Award', badge: 18, badgeVariant: 'danger' },
        { id: 'tch-att', title: 'Attendance', href: '/teacher/attendance', icon: 'Clock' },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: 'tch-prof', title: 'Profile', href: '/profile', icon: 'User' },
      ],
    },
  ],
  parent: [
    {
      title: 'Parent Portal',
      items: [
        { id: 'par-dash', title: 'Dashboard', href: '/parent/dashboard', icon: 'LayoutDashboard' },
        { id: 'par-children', title: 'Children', href: '/parent/children', icon: 'Users', badge: 2 },
        { id: 'par-attendance', title: 'Attendance', href: '/parent/attendance', icon: 'Clock' },
        { id: 'par-grades', title: 'Grades', href: '/parent/grades', icon: 'Award' },
      ],
    },
  ],
  admin: [
    {
      title: 'Administration',
      items: [
        { id: 'adm-dash', title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
        { id: 'adm-users', title: 'Users', href: '/admin/users', icon: 'Users', badge: '3.4k' },
        { id: 'adm-reports', title: 'Reports', href: '/admin/reports', icon: 'BarChart3' },
      ],
    },
  ],
};
