import React from 'react';
import { NavLink, useParams, Link, useLocation } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  Layers,
  FileText,
  HelpCircle,
  Award,
  Bell,
  CheckCircle2,
  Users,
  FlaskConical,
  FolderGit2,
  GraduationCap,
  Library,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockCourses } from '../../features/courses/mockData';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { ToastContainer } from '../ui/Toast';

export const CourseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { courseId } = useParams<{ courseId: string }>();
  const { role } = useAuth();
  const location = useLocation();

  const course = mockCourses.find((c) => c.id === courseId || c.code.toLowerCase() === courseId?.toLowerCase()) || mockCourses[0];

  const courseNavItems = [
    { label: 'Overview & Units', href: `/courses/${course.id}`, icon: BookOpen, exact: true },
    { label: 'Practicals & Labs', href: `/courses/${course.id}?tab=practicals`, icon: FlaskConical },
    { label: 'Project Areas', href: `/courses/${course.id}?tab=projects`, icon: FolderGit2 },
    { label: 'Outcomes & Assessment', href: `/courses/${course.id}?tab=outcomes`, icon: GraduationCap },
    { label: 'References & MOOCs', href: `/courses/${course.id}?tab=references`, icon: Library },
    { label: 'Assignments', href: `/courses/${course.id}?tab=assignments`, icon: FileText },
    { label: 'Quizzes', href: `/courses/${course.id}?tab=quizzes`, icon: HelpCircle },
    { label: 'Announcements', href: `/courses/${course.id}?tab=announcements`, icon: Bell },
  ];

  const backUrl = role === 'teacher' ? '/teacher/courses' : '/student/courses';

  return (
    <div className="min-h-screen bg-[#F6F6FB] text-slate-800 flex flex-col antialiased selection:bg-[#4F46E5] selection:text-white">
      {/* Contextual Course Topbar */}
      <header className="sticky top-0 z-30 flex flex-col border-b border-[#E7E7F0] bg-white/95 backdrop-blur-xs">
        <div className="flex h-14 w-full items-center justify-between px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={backUrl}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-[#F6F6FB] transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Courses</span>
            </Link>

            <div className="h-4 w-px bg-[#E7E7F0]" />

            <div className="flex items-center gap-2 min-w-0 truncate">
              <span className="text-xs font-semibold text-[#3730A3] bg-[#EEF0FF] px-2 py-0.5 rounded-md border border-[#D0D7FF] shrink-0">
                {course.code}
              </span>
              <h1 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                {course.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {course.isEnrolled && course.progress !== undefined && (
              <div className="hidden md:flex items-center gap-3 w-40">
                <ProgressBar value={course.progress} showPercentage size="sm" />
              </div>
            )}
            <Badge variant="primary" size="sm">
              {course.difficulty}
            </Badge>
          </div>
        </div>

        {/* Course Subnavigation Bar */}
        <div className="border-t border-[#F1F1F8] bg-white px-4 sm:px-6">
          <div className="flex items-center gap-1 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
            {courseNavItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = item.exact
                ? (location.pathname === `/courses/${course.id}` || location.pathname === `/courses/${courseId}`) && (!location.search || location.search === '?tab=overview')
                : location.search.includes(item.href.split('?')[1]);

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-medium border-b-2 transition-colors whitespace-nowrap tracking-tight ${
                    isCurrent
                      ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
                      : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-[#D8D8E5]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Course Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>

      <ToastContainer />
    </div>
  );
};
