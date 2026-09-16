import React, { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  TrendingUp,
  FileText,
  CreditCard,
  BellRing,
  HeartHandshake,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import { ProgressCard } from '../../components/dashboard/ProgressCard';
import { ActivityItem } from '../../components/dashboard/ActivityItem';
import {
  parentChildren,
  parentStats,
  parentRecentUpdates,
} from '../../lib/mockData';

export default function ParentDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [selectedChildId, setSelectedChildId] = useState<string>(parentChildren[0].id);

  const activeChild = parentChildren.find((c) => c.id === selectedChildId) || parentChildren[0];

  const handleAction = (title: string, desc: string) => {
    addToast({
      title,
      description: desc,
      type: 'info',
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7F0]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
              Parent Portal — {user.name}
            </h1>
            <Badge variant="mint" size="md">
              2 Scholars Active
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor academic milestone progress, attendance records, instructor notes, and term assessments.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            leftIcon={MessageSquare}
            onClick={() => handleAction('Message Faculty', 'Connecting with Dr. Elena Rostova...')}
          >
            Message Teachers
          </Button>
        </div>
      </div>

      {/* Child Switcher Cards */}
      <section aria-label="Select Child Profile">
        <div className="mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Select Child Profile ({parentChildren.length} Enrolled)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {parentChildren.map((child) => {
            const isSelected = child.id === selectedChildId;
            return (
              <div
                key={child.id}
                onClick={() => {
                  setSelectedChildId(child.id);
                  addToast({
                    title: `Switched to ${child.name}`,
                    description: `Viewing academic records for ${child.grade}`,
                    type: 'info',
                  });
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isSelected
                    ? 'border-[#4F46E5] bg-[#EEF0FF]/40 shadow-[0_2px_8px_0_rgba(79,70,229,0.06)]'
                    : 'border-[#E7E7F0] bg-white hover:border-[#D8D8E5] hover:bg-[#F6F6FB]/50 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <Avatar name={child.name} size="lg" status="online" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">{child.name}</h3>
                      {isSelected && <Badge variant="primary" size="sm">Active View</Badge>}
                    </div>
                    <p className="text-xs text-slate-500">{child.grade} • {child.section}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">ID: {child.studentId}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <span className="text-xs text-slate-400">GPA</span>
                  <span className="text-lg sm:text-xl font-semibold text-slate-800">{child.currentGpa.toFixed(2)}</span>
                  <span className="text-[11px] text-[#065F46] font-medium">{child.attendanceRate}% Attn</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Academic & Attendance Metrics */}
      <section aria-label="Key Family & Academic Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {parentStats.map((stat) => (
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

      {/* Main Grid: Subject Breakdown & Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Subject Progression */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section aria-label="Subject Breakdown">
            <SectionHeader
              title={`Academic Progress — ${activeChild.name}`}
              subtitle="Performance breakdown across currently enrolled courses this semester"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgressCard
                title="CS-301: Advanced Neural Networks"
                category="Computer Science"
                progress={88}
                grade="A"
                statusText="14 of 16 labs completed • 98/100 average"
              />
              <ProgressCard
                title="CS-314: Distributed Systems"
                category="Software Engineering"
                progress={82}
                grade="A-"
                statusText="10 of 12 assignments submitted"
              />
              <ProgressCard
                title="MATH-240: Stochastic Calculus"
                category="Mathematics"
                progress={74}
                grade="B+"
                statusText="Midterm exam graded • Next test in 2 weeks"
              />
              <ProgressCard
                title="AI-410: Spatial Computing & Robotics"
                category="Emerging Technologies"
                progress={92}
                grade="A+"
                statusText="VR laboratory project approved"
              />
            </div>
          </section>

          {/* Upcoming Parent Tasks */}
          <Card className="p-5 border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-3 border-b border-[#F1F1F8]">
              <CardTitle className="text-xs sm:text-sm">Upcoming Parent Notices & Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex flex-col gap-2.5">
              <div className="p-3.5 rounded-xl border border-[#E7E7F0] bg-[#F6F6FB]/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF0FF] text-[#4F46E5] border border-[#D0D7FF] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Virtual Parent-Teacher Conference</h4>
                    <p className="text-[11px] text-slate-400">Sep 22, 4:00 PM • Dr. Elena Rostova (Machine Intelligence)</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleAction('Meeting Info', 'Opening video conference details...')}>
                  Join Info
                </Button>
              </div>

              <div className="p-3.5 rounded-xl border border-[#E7E7F0] bg-[#F6F6FB]/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#DDF4EA] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">Term 1 Tuition & Laboratory Fees</h4>
                    <p className="text-[11px] text-slate-400">Paid in Full • Receipt #SH-99201</p>
                  </div>
                </div>
                <Badge variant="mint" size="sm">Receipt Available</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: School Updates & Announcements */}
        <div className="flex flex-col gap-6">
          <Card className="p-5 flex flex-col border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-2 border-b border-[#F1F1F8]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm">School Updates & Alerts</CardTitle>
                <BellRing className="w-4 h-4 text-[#4F46E5]" />
              </div>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-[#F1F1F8]">
              {parentRecentUpdates.map((update) => (
                <ActivityItem key={update.id} event={update} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
