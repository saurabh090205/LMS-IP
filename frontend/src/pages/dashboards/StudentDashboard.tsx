import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  BookOpen,
  Video,
  Bell,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  ChevronRight,
  MoreHorizontal,
  Flame,
  ArrowRight,
  Sparkles,
  Trophy,
  FileText,
  UserCheck,
  TrendingUp,
  CheckSquare,
  DollarSign,
  Laptop,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { studentPortalService } from '../../services/studentPortalService';

// Activity data for the Recharts AreaChart (Matching Reference 1 "My Activity" curve)
const monthlyActivityData = [
  { month: 'Jan', hours: 2.1 },
  { month: 'Feb', hours: 1.8 },
  { month: 'Mar', hours: 2.6 },
  { month: 'Apr', hours: 2.3 },
  { month: 'May', hours: 3.5 },
  { month: 'Jun', hours: 3.2 },
  { month: 'Jul', hours: 6.0 }, // Peak marked as "6h Active" in Reference 1
  { month: 'Aug', hours: 3.0 },
  { month: 'Sep', hours: 4.8 },
  { month: 'Oct', hours: 4.1 },
  { month: 'Nov', hours: 3.2 },
  { month: 'Dec', hours: 5.2 },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const profile = studentPortalService.getProfile();
  const assignments = studentPortalService.getAssignments();
  const pendingAssignments = assignments.filter((a) => a.status === 'In Progress' || a.status === 'Not Started');
  const timetable = studentPortalService.getTimetable();
  const todayClasses = timetable.filter((t) => t.dayOfWeek === 'Monday').slice(0, 3);
  const [learningPeriod, setLearningPeriod] = useState('Today');
  const [activityTimeframe, setActivityTimeframe] = useState('Monthly');

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* 1. WELCOME PROFILE HERO BANNER (Matching Reference 1) */}
      <div className="bg-white rounded-3xl border border-[#E5EBE7] p-6 lg:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Left Side: Avatar, Name & Edit Profile */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="relative shrink-0">
            <img
              src={profile.avatarUrl}
              alt={profile.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover ring-4 ring-[#EFF9F3] shadow-md"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#36B875] border-2 border-white flex items-center justify-center text-white text-[10px]" title="Active Student">
              ✓
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#18221D] tracking-tight">
                {profile.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
                {profile.classDivision}
              </span>
            </div>
            <p className="text-xs text-[#6B756F] mt-1 font-medium">
              6 Classes Enrolled | CGPA <strong className="text-[#18221D] font-bold">{profile.cgpa}</strong> • Roll #{profile.rollNumber}
            </p>

            <div className="mt-3">
              <button
                onClick={() => navigate('/student/profile')}
                className="px-5 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Edit Profile</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Educational Illustration Banner (Vector artwork matching Reference 1) */}
        <div className="hidden lg:flex items-center justify-end flex-1 max-w-sm">
          <div className="relative w-full h-32 flex items-center justify-center bg-gradient-to-r from-emerald-50/50 to-teal-50/30 rounded-2xl p-4 border border-[#EFF9F3]">
            {/* SVG Illustration of student at desk with laptop & lightbulb */}
            <svg className="w-56 h-28" viewBox="0 0 240 120" fill="none">
              {/* Desk */}
              <rect x="40" y="85" width="160" height="6" rx="3" fill="#D1DDD6" />
              <rect x="55" y="91" width="6" height="25" rx="3" fill="#A3B8AD" />
              <rect x="179" y="91" width="6" height="25" rx="3" fill="#A3B8AD" />
              
              {/* Laptop */}
              <rect x="90" y="55" width="45" height="30" rx="3" fill="#36B875" />
              <rect x="85" y="82" width="55" height="4" rx="2" fill="#18794E" />
              <circle cx="112" cy="70" r="4" fill="#FFFFFF" opacity="0.8" />

              {/* Student Figure */}
              <circle cx="160" cy="40" r="14" fill="#FBE1D8" /> {/* Head */}
              <path d="M150 36 C155 26, 170 28, 172 38" fill="#18221D" /> {/* Hair */}
              <path d="M145 60 C145 54, 155 52, 160 52 C165 52, 175 54, 175 60 L172 85 L148 85 Z" fill="#36B875" /> {/* Torso */}
              
              {/* Idea Lightbulb */}
              <circle cx="112" cy="22" r="10" fill="#FDE68A" />
              <path d="M108 28 L116 28 L114 32 L110 32 Z" fill="#D97706" />
              <line x1="112" y1="6" x2="112" y2="2" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <line x1="98" y1="18" x2="94" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
              <line x1="126" y1="18" x2="130" y2="15" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

              {/* Stack of books */}
              <rect x="45" y="70" width="30" height="5" rx="1.5" fill="#EC4899" />
              <rect x="43" y="75" width="34" height="5" rx="1.5" fill="#6366F1" />
              <rect x="42" y="80" width="36" height="5" rx="1.5" fill="#F59E0B" />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. FIVE SUMMARY STAT CARDS (Matching Reference 1 Colorful Rounded Badges) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Card 1: Enrolled Courses */}
        <div
          onClick={() => navigate('/student/courses')}
          className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#18221D]">6</span>
          <span className="text-xs text-[#6B756F] font-medium mt-0.5">Total Enrolled Courses</span>
        </div>

        {/* Card 2: Attendance Rate */}
        <div
          onClick={() => navigate('/student/attendance')}
          className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#36B875] text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <Video className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#18221D]">92.4%</span>
          <span className="text-xs text-[#6B756F] font-medium mt-0.5">Overall Attendance</span>
        </div>

        {/* Card 3: Notifications / Tasks */}
        <div
          onClick={() => navigate('/student/assignments')}
          className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <Sparkles className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#18221D]">{pendingAssignments.length}</span>
          <span className="text-xs text-[#6B756F] font-medium mt-0.5">Pending Assignments</span>
        </div>

        {/* Card 4: CGPA / Performance */}
        <div
          onClick={() => navigate('/student/examinations')}
          className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all cursor-pointer flex flex-col items-center text-center group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#18221D]">8.92</span>
          <span className="text-xs text-[#6B756F] font-medium mt-0.5">Academic CGPA</span>
        </div>

        {/* Card 5: Points Balance */}
        <div
          onClick={() => navigate('/student/portfolio')}
          className="bg-white p-5 rounded-2xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all cursor-pointer flex flex-col items-center text-center col-span-2 sm:col-span-1 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-md mb-3 group-hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-[#18221D]">78.50</span>
          <span className="text-xs text-[#6B756F] font-medium mt-0.5">Total Merit Points</span>
        </div>
      </div>

      {/* 3. MIDDLE ROW: Trophy Card, Learning Time Donut, Upcoming Tasks (Matching Reference 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card A: Trophy Badge Card (Matching Reference 1) */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between">
          <div className="flex items-center gap-4">
            {/* Gold Trophy Illustration */}
            <div className="w-20 h-20 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
              <Trophy className="w-10 h-10 fill-amber-400 stroke-amber-600" />
            </div>
            <div>
              <span className="text-2xl font-extrabold text-[#18221D] block">
                78.50 Point
              </span>
              <p className="text-xs text-[#6B756F] font-medium mt-0.5">
                Best AI Systems Developer Badge
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => {
                addToast({
                  title: 'Next Honor Badge Track',
                  description: 'Requirement: Complete FedAvg protocol practical to unlock Distributed Computing Specialist.',
                  type: 'info',
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Next Badge</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card B: Learning Time Breakdown Donut (Matching Reference 1) */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#18221D]">Learning Time</h3>
            <select
              value={learningPeriod}
              onChange={(e) => setLearningPeriod(e.target.value)}
              className="text-xs font-semibold text-[#6B756F] bg-slate-50 border border-[#E5EBE7] rounded-lg px-2 py-1 outline-none"
            >
              <option value="Today">Today</option>
              <option value="Week">This Week</option>
              <option value="Month">This Month</option>
            </select>
          </div>

          <div className="flex items-center gap-5">
            {/* Donut ring indicator */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="4"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#36B875]"
                  strokeDasharray="65, 100"
                  strokeWidth="4"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-base font-extrabold text-[#18221D]">2h</span>
                <span className="text-[9px] text-[#6B756F] block">Logged</span>
              </div>
            </div>

            {/* Breakdown statistics */}
            <div className="flex-1 space-y-1.5 text-[11px]">
              <div className="font-bold text-[#18221D] mb-1 truncate">
                Deep Learning & MLOps
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[#6B756F]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500" />
                  <span>Reading: <strong>40%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  <span>Lectures: <strong>60%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>Writing: <strong>40%</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#36B875]" />
                  <span>Lab Work: <strong>70%</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card C: Upcoming Tasks / Timetable (Matching Reference 1) */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#18221D]">Upcoming Task</h3>
            <Link
              to="/student/timetable"
              className="text-xs font-semibold text-[#36B875] hover:underline"
            >
              See all
            </Link>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls, idx) => (
              <div
                key={cls.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F6F8F7] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                    style={{ backgroundColor: cls.color }}
                  >
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#18221D] truncate max-w-[150px]">
                      {cls.subjectName}
                    </h4>
                    <span className="text-[10px] text-[#6B756F]">
                      {cls.startTime} - {cls.endTime} • {cls.room}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/student/timetable')}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. LOWER ROW: Promo Card, Academic Activity AreaChart & Recent Submissions (Matching Reference 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (2 Cols): Promo Mini Banner "Start Learning" */}
        <div className="lg:col-span-3 bg-white p-5 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between text-center">
          <div className="my-auto py-2">
            <div className="w-16 h-16 rounded-2xl bg-[#EFF9F3] text-[#36B875] flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Laptop className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h4 className="text-sm font-bold text-[#18221D]">Shreenil Mobile App</h4>
            <p className="text-xs text-[#6B756F] mt-1 leading-relaxed">
              Sync timetable, assignments and offline syllabus on Android & iOS.
            </p>
          </div>

          <button
            onClick={() => navigate('/student/assignments')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            Start Learning
          </button>
        </div>

        {/* Center Column (6 Cols): My Activity Area Chart (Matching Reference 1) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#18221D]">My Activity</h3>
              <p className="text-[11px] text-[#6B756F]">Study & practical learning hours over the academic year</p>
            </div>
            <select
              value={activityTimeframe}
              onChange={(e) => setActivityTimeframe(e.target.value)}
              className="text-xs font-semibold text-[#6B756F] bg-slate-50 border border-[#E5EBE7] rounded-lg px-2.5 py-1 outline-none"
            >
              <option value="Monthly">Monthly ▾</option>
              <option value="Weekly">Weekly ▾</option>
            </select>
          </div>

          {/* Area Chart with green gradient fill matching Reference 1 */}
          <div className="h-48 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyActivityData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="activityGreenGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#36B875" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#EFF9F3" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  stroke="#A3B8AD"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5EBE7' }}
                />
                <YAxis
                  stroke="#A3B8AD"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#E5EBE7' }}
                  tickFormatter={(val) => `${val}h`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #B0E7CB',
                    borderRadius: '0.75rem',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(24,34,29,0.06)',
                  }}
                  formatter={(value: any) => [`${value} Hours`, 'Active Study']}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#36B875"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#activityGreenGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (3 Cols): Recent Activity / Submissions (Matching Reference 1 Right Column) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#18221D]">Recent Activity</h3>
              <Link
                to="/student/assignments"
                className="text-xs font-semibold text-[#36B875] hover:underline"
              >
                See all
              </Link>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#EFF9F3] text-[#36B875] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#18221D]">Deep Learning</h5>
                    <span className="text-[10px] text-[#6B756F]">Practical 1 Submitted</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#18794E]">28/30</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#18221D]">Operating Systems</h5>
                    <span className="text-[10px] text-[#6B756F]">Scheduler Sim Graded</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#18794E]">28/30</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#18221D]">MLOPS Pipeline</h5>
                    <span className="text-[10px] text-[#6B756F]">FastAPI Docker Task</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-600">Pending</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E5EBE7] mt-4">
            <button
              onClick={() => navigate('/student/examinations')}
              className="w-full py-2 px-3 rounded-xl border border-[#E5EBE7] hover:bg-[#F6F8F7] text-xs font-bold text-[#18221D] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Full Report Card</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
