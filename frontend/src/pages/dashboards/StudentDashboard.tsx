import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Video,
  FileCheck,
  BookOpen,
  Award,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  Flame,
  Zap,
  Bot,
  Rocket,
  Dumbbell,
  PlayCircle,
  Layers,
  Building2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import { CourseCard } from '../../components/dashboard/CourseCard';
import { UpcomingItem } from '../../components/dashboard/UpcomingItem';
import { ActivityItem } from '../../components/dashboard/ActivityItem';
import { QuickActions } from '../../components/dashboard/QuickActions';
import { CourseThumbnail } from '../../components/dashboard/CourseThumbnail';
import {
  studentStats,
  studentCourses,
  studentDeadlines,
  studentActivities,
} from '../../lib/mockData';
import { mockCourses } from '../../features/courses/mockData';

export default function StudentDashboard() {
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
      id: 'qa-vc',
      label: 'Join Live Session',
      description: 'Auditorium Hall A (VIT)',
      icon: Video,
      onClick: () => handleAction('Connecting to Live Auditorium', 'Entering Deep Learning live session room...'),
    },
    {
      id: 'qa-sub',
      label: 'Submit Lab Work',
      description: 'Practical 2 (MLP) due',
      icon: FileCheck,
      onClick: () => navigate('/courses/ci3001/assignments/asg-dl-prac-2'),
    },
    {
      id: 'qa-lib',
      label: 'Digital Library',
      description: 'IEEE & ACM repository',
      icon: BookOpen,
      onClick: () => handleAction('Digital Library Portal', 'Redirecting to IEEE & Springer digital repository...'),
    },
    {
      id: 'qa-gpa',
      label: 'Report Card',
      description: 'AY 2026-27 Transcript',
      icon: Award,
      onClick: () => navigate('/student/grades'),
    },
  ];

  // Active in-progress course for the Hero Continue card
  const activeCourse = mockCourses[0]; // CI3001: Deep Learning

  return (
    <div className="flex flex-col gap-6">
      {/* Personalized Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7F0]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
              Welcome back, {user.name.split(' ')[0]} 👋
            </h1>
            <Badge variant="primary" size="md">
              AY 2026-27 • Module V
            </Badge>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Vishwakarma Institute of Technology • B.Tech CSE (AI)
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            You are enrolled in <strong className="text-slate-700 font-medium">Module V Core Curriculum</strong>. Maintaining a <strong className="text-[#065F46] font-medium">9-day study streak</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F8F0C8] border border-[#FDE68A] text-[#854D0E] text-xs font-semibold shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
            <Flame className="w-4 h-4 text-[#D97706] fill-[#FDE68A]" />
            <span>9 Day Streak</span>
          </div>

          <Button
            size="sm"
            variant="outline"
            leftIcon={Calendar}
            onClick={() => handleAction('Academic Calendar', 'Opening AY 2026-27 Module V timetable...')}
          >
            Calendar
          </Button>
        </div>
      </div>

      {/* Top Key Metric Strips */}
      <section aria-label="Key Academic Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {studentStats.map((stat) => (
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

      {/* CONTINUE LEARNING HERO FEATURE CARD */}
      <section aria-label="Continue Learning">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#4F46E5]" />
            Current Course & Unit in Progress
          </h2>
        </div>

        <Card className="overflow-hidden border-[#E7E7F0] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Left Thumbnail Banner */}
            <div className="relative">
              <CourseThumbnail category={activeCourse.category} code={activeCourse.code} className="h-full min-h-[160px]" />
            </div>

            {/* Middle Course & Next Unit Narrative */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4 lg:col-span-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#3730A3] bg-[#EEF0FF] px-2.5 py-0.5 rounded-md border border-[#D0D7FF]">
                    {activeCourse.code} • 4 Credits • Theory: 3h/wk • Lab: 2h/wk
                  </span>
                  <span className="text-xs text-slate-400">Last visited: Today at 10:15 AM</span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-800 tracking-tight">
                  {activeCourse.title}
                </h3>

                {/* Next up lecture preview */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] text-xs">
                  <PlayCircle className="w-4 h-4 text-[#4F46E5] shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800">Current Unit: Unit-I: Fundamental of Deep Learning (06 Hours)</span>
                    <span className="text-[11px] text-slate-400">Next Topic: Limitations of machine learning, Advantage and challenges of deep learning</span>
                  </div>
                </div>
              </div>

              {/* Progress & Launch Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-[#F1F1F8]">
                <div className="flex-1 max-w-sm">
                  <ProgressBar value={68} showPercentage label="Unit I & II Syllabus Completion" />
                </div>
                <Button
                  size="md"
                  variant="primary"
                  rightIcon={ArrowRight}
                  onClick={() => navigate(`/courses/${activeCourse.id}/learn/lsn-course-deep-learning-1-2`)}
                >
                  Resume Lecture
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Main Grid: Enrolled Courses (2 Cols) & Study Activity / Deadlines (1 Col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: My Enrolled Courses */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section aria-label="Enrolled Courses">
            <SectionHeader
              title="Module V Enrolled Courses"
              subtitle="AY 2026-27 Official Curriculum Subjects (T.Y. B.Tech CSE AI)"
              actionText="View Course Catalog"
              actionHref="/student/courses"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {mockCourses.slice(0, 6).map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  role="student"
                  onActionClick={() => navigate(`/courses/${course.id}`)}
                />
              ))}
            </div>
          </section>

          {/* AI-POWERED ECOSYSTEM RECOMMENDATIONS & TOUCHPOINTS */}
          <section aria-label="AI Recommendations">
            <SectionHeader
              title="AI Learning Pathways & University Ecosystem"
              subtitle="Personalized recommendations for research fellowships, venture incubation, and athletic performance."
            />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Research Fellowship */}
              <Card hoverable className="p-5 flex flex-col justify-between gap-3 border-[#DDD6FE] bg-gradient-to-br from-[#E7DFFF]/40 via-white to-white">
                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#E7DFFF] text-[#5B21B6] border border-[#DDD6FE] flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mt-1">Research Fellow Match</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Based on your CI3001 score, you qualify for the <strong className="text-slate-800">Quantum Neural Graph Lab</strong>.
                  </p>
                </div>
                <button
                  onClick={() => handleAction('Fellowship Portal', 'Connecting with Dr. Elena Rostova...')}
                  className="text-xs font-medium text-[#7C3AED] hover:text-[#5B21B6] flex items-center gap-1 text-left pt-1"
                >
                  <span>Apply for Fellow Slot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Card>

              {/* Deep Venture Studio */}
              <Card hoverable className="p-5 flex flex-col justify-between gap-3 border-[#FED7AA] bg-gradient-to-br from-[#FBE1D8]/40 via-white to-white">
                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#FBE1D8] text-[#9A3412] border border-[#FED7AA] flex items-center justify-center">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mt-1">Venture Incubator</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Student startup pitching clinic opens next Friday for engineering founders.
                  </p>
                </div>
                <button
                  onClick={() => handleAction('Venture Studio', 'Opening incubator pitch slot...')}
                  className="text-xs font-medium text-[#EA580C] hover:text-[#9A3412] flex items-center gap-1 text-left pt-1"
                >
                  <span>Join Founder Cohort</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Card>

              {/* Sports & Mental Performance */}
              <Card hoverable className="p-5 flex flex-col justify-between gap-3 border-[#A7F3D0] bg-gradient-to-br from-[#DDF4EA]/40 via-white to-white">
                <div className="flex flex-col gap-1.5">
                  <div className="w-8 h-8 rounded-xl bg-[#DDF4EA] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center">
                    <Dumbbell className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 mt-1">Cognitive & Fitness Peak</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Biometric recovery analysis & high-focus study cadence calibration.
                  </p>
                </div>
                <button
                  onClick={() => handleAction('Athletic Performance', 'Opening wellness coach schedule...')}
                  className="text-xs font-medium text-[#059669] hover:text-[#065F46] flex items-center gap-1 text-left pt-1"
                >
                  <span>Explore Metrics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Card>
            </div>
          </section>
        </div>

        {/* Right 1 Col: Weekly Study Habit Chart + Upcoming Deadlines + Activity */}
        <div className="flex flex-col gap-6">
          {/* Weekly Study Activity Card with Minimal Academic Chart */}
          <Card className="p-5 border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-3 border-b border-[#F1F1F8] flex items-center justify-between">
              <CardTitle className="text-xs sm:text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#4F46E5]" />
                Weekly Study Habit
              </CardTitle>
              <Badge variant="mint" size="sm">18.4 Hours</Badge>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-3">
              <div className="grid grid-cols-7 gap-1.5 items-end h-24 pt-2">
                {[
                  { day: 'M', hours: 3.2, max: 4 },
                  { day: 'T', hours: 2.8, max: 4 },
                  { day: 'W', hours: 4.0, max: 4 },
                  { day: 'T', hours: 1.5, max: 4 },
                  { day: 'F', hours: 3.5, max: 4 },
                  { day: 'S', hours: 2.0, max: 4 },
                  { day: 'S', hours: 1.4, max: 4 },
                ].map((item, i) => {
                  const pct = Math.round((item.hours / item.max) * 100);
                  const isToday = i === 4;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div className="w-full rounded-lg bg-[#F6F6FB] h-full flex items-end overflow-hidden p-0.5 border border-[#E7E7F0]/60">
                        <div
                          className={`w-full rounded-md transition-all duration-300 ${
                            isToday ? 'bg-[#4F46E5]' : 'bg-[#C7D2FE]'
                          }`}
                          style={{ height: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-[10px] ${isToday ? 'text-[#4F46E5] font-semibold' : 'text-slate-400'}`}>
                        {item.day}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 text-center">
                Weekly Target: 20h • <strong className="text-slate-700 font-medium">92% reached</strong>
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <section aria-label="Upcoming Deadlines">
            <SectionHeader
              title="Upcoming Deliverables"
              subtitle="Next lab submissions"
              actionText="All Tasks"
              actionHref="/student/assignments"
            />

            <div className="flex flex-col gap-2.5">
              {studentDeadlines.map((task) => (
                <UpcomingItem
                  key={task.id}
                  task={task}
                  onActionClick={() => navigate('/courses/ci3001/assignments/asg-dl-prac-2')}
                />
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <Card className="p-5 border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-3 border-b border-[#F1F1F8]">
              <CardTitle className="text-xs sm:text-sm">Quick Navigation</CardTitle>
            </CardHeader>
            <div className="grid grid-cols-2 gap-2">
              {quickActionsList.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.id}
                    onClick={qa.onClick}
                    className="p-3 rounded-xl border border-[#E7E7F0] hover:border-[#D0D7FF] hover:bg-[#EEF0FF]/40 transition-all text-left flex flex-col gap-1"
                  >
                    <Icon className="w-4 h-4 text-[#4F46E5]" />
                    <span className="text-xs font-semibold text-slate-800">{qa.label}</span>
                    <span className="text-[10px] text-slate-400 truncate">{qa.description}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Recent Activity Timeline */}
          <Card className="p-5 flex flex-col border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-2 border-b border-[#F1F1F8]">
              <CardTitle className="text-xs sm:text-sm">Academic Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-[#F1F1F8]">
              {studentActivities.map((act) => (
                <ActivityItem key={act.id} event={act} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
