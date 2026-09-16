import { RoleNavigationMap } from '../../types/navigation';

export const roleNavigationConfig: RoleNavigationMap = {
  student: [
    {
      title: 'Academic',
      items: [
        { id: 'std-dash', title: 'Dashboard', href: '/student/dashboard', icon: 'LayoutDashboard' },
        { id: 'std-courses', title: 'Courses', href: '/student/courses', icon: 'BookOpen', badge: 5 },
        { id: 'std-calendar', title: 'Calendar', href: '/student/calendar', icon: 'Calendar' },
        { id: 'std-assign', title: 'Assignments', href: '/student/assignments', icon: 'CheckSquare', badge: 3, badgeVariant: 'warning' },
        { id: 'std-grades', title: 'Grades', href: '/student/grades', icon: 'Award' },
        { id: 'std-att', title: 'Attendance', href: '/student/attendance', icon: 'Clock' },
      ],
    },
    {
      title: 'Communication & Account',
      items: [
        { id: 'std-msg', title: 'Messages', href: '/student/messages', icon: 'MessageSquare', badge: 2, badgeVariant: 'primary' },
        { id: 'std-prof', title: 'Profile', href: '/profile', icon: 'User' },
      ],
    },
  ],
  teacher: [
    {
      title: 'Faculty Hub',
      items: [
        { id: 'tch-dash', title: 'Dashboard', href: '/teacher/dashboard', icon: 'LayoutDashboard' },
        { id: 'tch-courses', title: 'My Courses', href: '/teacher/courses', icon: 'BookOpen', badge: 4 },
        { id: 'tch-classes', title: 'Classes', href: '/teacher/classes', icon: 'Users' },
        { id: 'tch-assign', title: 'Assignments', href: '/teacher/assignments', icon: 'CheckSquare' },
        { id: 'tch-grades', title: 'Gradebook', href: '/teacher/gradebook', icon: 'Award', badge: 18, badgeVariant: 'danger' },
        { id: 'tch-att', title: 'Attendance', href: '/teacher/attendance', icon: 'Clock' },
        { id: 'tch-cal', title: 'Calendar', href: '/teacher/calendar', icon: 'Calendar' },
      ],
    },
    {
      title: 'Communication & Account',
      items: [
        { id: 'tch-msg', title: 'Messages', href: '/teacher/messages', icon: 'MessageSquare', badge: 4, badgeVariant: 'primary' },
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
        { id: 'par-progress', title: 'Progress', href: '/parent/progress', icon: 'TrendingUp' },
        { id: 'par-attendance', title: 'Attendance', href: '/parent/attendance', icon: 'Clock' },
        { id: 'par-grades', title: 'Grades', href: '/parent/grades', icon: 'Award' },
        { id: 'par-assignments', title: 'Assignments', href: '/parent/assignments', icon: 'CheckSquare' },
      ],
    },
    {
      title: 'Communication & Account',
      items: [
        { id: 'par-msg', title: 'Messages', href: '/parent/messages', icon: 'MessageSquare', badge: 1 },
        { id: 'par-prof', title: 'Profile', href: '/profile', icon: 'User' },
      ],
    },
  ],
  admin: [
    {
      title: 'University Administration',
      items: [
        { id: 'adm-dash', title: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
        { id: 'adm-users', title: 'Users', href: '/admin/users', icon: 'Users', badge: '3.4k' },
        { id: 'adm-inst', title: 'Institutions', href: '/admin/institutions', icon: 'Building2' },
        { id: 'adm-acad', title: 'Academic', href: '/admin/academic', icon: 'GraduationCap' },
        { id: 'adm-reports', title: 'Reports', href: '/admin/reports', icon: 'BarChart3' },
      ],
    },
    {
      title: 'System & Account',
      items: [
        { id: 'adm-settings', title: 'Settings', href: '/settings', icon: 'Settings' },
        { id: 'adm-prof', title: 'Profile', href: '/profile', icon: 'User' },
      ],
    },
  ],
};
