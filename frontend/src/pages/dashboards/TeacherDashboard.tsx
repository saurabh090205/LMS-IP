import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Users,
  FileText,
  Calendar,
  PlusCircle,
  Video,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  Layers,
  Award,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import { CourseCard } from '../../components/dashboard/CourseCard';
import { UpcomingItem } from '../../components/dashboard/UpcomingItem';
import { ActivityItem } from '../../components/dashboard/ActivityItem';
import { QuickActions } from '../../components/dashboard/QuickActions';
import {
  teacherStats,
  teacherCourses,
  teacherPendingTasks,
  teacherScheduleToday,
  teacherActivities,
} from '../../lib/mockData';
import { mockCourses } from '../../features/courses/mockData';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleAction = (title: string, desc: string) => {
    addToast({
      title,
      description: desc,
      type: 'info',
    });
  };

  const quickActionsList = [
    {
      id: 'qa-create-course',
      label: 'New Course',
      description: 'Author syllabus & units',
      icon: PlusCircle,
      onClick: () => navigate('/teacher/courses/new'),
    },
    {
      id: 'qa-speedgrader',
      label: 'SpeedGrader',
      description: '4 Pending Submissions',
      icon: Award,
      onClick: () => navigate('/teacher/grading'),
    },
    {
      id: 'qa-broadcast',
      label: 'Broadcast Notice',
      description: 'Notify 184 scholars',
      icon: Send,
      onClick: () => handleAction('Cohort Broadcast', 'Opening announcement dispatch dialog...'),
    },
    {
      id: 'qa-gradebook',
      label: 'Assessment Matrix',
      description: 'Full course gradebook',
      icon: FileText,
      onClick: () => navigate('/teacher/gradebook'),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Faculty Hero Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7F0]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
              Faculty Hub — {user.name}
            </h1>
            <Badge variant="lavender" size="md">
              Chair of Machine Intelligence
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            You have <strong className="text-slate-800 font-medium">2 live classes today</strong> and <strong className="text-[#9A3412] font-medium">4 student submissions</strong> awaiting grading.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            leftIcon={Calendar}
            onClick={() => handleAction('Timetable', 'Opening teaching timetable...')}
          >
            Timetable
          </Button>
          <Button
            size="sm"
            variant="primary"
            leftIcon={PlusCircle}
            onClick={() => navigate('/teacher/courses/new')}
          >
            Create Course
          </Button>
        </div>
      </div>

      {/* Top Actionable Metrics */}
      <section aria-label="Faculty Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teacherStats.map((stat) => (
            <StatCard
              key={stat.id}
              title={stat.label}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              helperText={stat.helperText}
            />
          ))}
        </div>
      </section>

      {/* Faculty Action Shortcuts */}
      <section aria-label="Quick Actions">
        <div className="mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faculty Actions & Workflows</h2>
        </div>
        <QuickActions actions={quickActionsList} />
      </section>

      {/* Main Content Grid: Schedule & Courses (2 cols) + SpeedGrader & Stream (1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule & Courses */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Today's Schedule & Live Auditorium */}
          <section aria-label="Today's Lecture Schedule">
            <SectionHeader
              title="Today's Teaching Schedule"
              subtitle="Scheduled lectures and interactive virtual recitation seminars"
            />

            <div className="flex flex-col gap-3">
              {teacherScheduleToday.map((item) => (
                <Card key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-[#E7E7F0]">
                  <div className="flex items-start sm:items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] border border-[#D0D7FF] flex items-center justify-center text-[#4F46E5] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#4F46E5]">{item.courseCode}</span>
                        <Badge variant="neutral" size="sm">{item.instructorOrClass}</Badge>
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">{item.courseTitle}</h4>
                      <p className="text-xs text-slate-400">{item.time} • {item.roomOrLink}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={Video}
                    onClick={() => handleAction(`Live Classroom`, `Launching interactive auditorium for ${item.courseCode}...`)}
                  >
                    Start Live Session
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Active Teaching Courses */}
          <section aria-label="Active Teaching Courses">
            <SectionHeader
              title="Courses You Teach"
              subtitle="Manage syllabus modules, review student submissions, and monitor enrollment rosters"
              actionText="Course Directory"
              actionHref="/teacher/courses"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mockCourses.slice(0, 2).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  role="teacher"
                  onActionClick={() => navigate(`/teacher/courses/${course.id}/builder`)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right 1 Col: SpeedGrader Pending Queue & Student Submissions */}
        <div className="flex flex-col gap-6">
          {/* Pending Tasks & Grading Queue */}
          <section aria-label="Pending Grading Tasks">
            <SectionHeader
              title="Grading Queue"
              subtitle="Submissions awaiting evaluation"
              actionText="Open SpeedGrader"
              actionHref="/teacher/grading"
            />

            <div className="flex flex-col gap-2.5">
              {teacherPendingTasks.map((task) => (
                <UpcomingItem
                  key={task.id}
                  task={task}
                  onActionClick={() => navigate('/teacher/grading')}
                />
              ))}
            </div>
          </section>

          {/* Student Submissions Stream */}
          <Card className="p-5 flex flex-col border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-2 border-b border-[#F1F1F8]">
              <CardTitle className="text-xs sm:text-sm">Student Activity Stream</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-[#F1F1F8]">
              {teacherActivities.map((act) => (
                <ActivityItem key={act.id} event={act} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
