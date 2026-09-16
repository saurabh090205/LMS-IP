import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  BookOpen,
  Activity,
  UserPlus,
  FolderPlus,
  BarChart3,
  Shield,
  CheckCircle2,
  Clock,
  Server,
  Download,
  Search,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { PageHeader } from '../../components/ui/PageHeader';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { SectionHeader } from '../../components/dashboard/SectionHeader';
import { ActivityItem } from '../../components/dashboard/ActivityItem';
import { QuickActions } from '../../components/dashboard/QuickActions';
import {
  adminStats,
  adminRecentRegistrations,
  adminSystemLogs,
} from '../../lib/mockData';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [search, setSearch] = useState('');

  const handleAction = (title: string, desc: string) => {
    addToast({
      title,
      description: desc,
      type: 'info',
    });
  };

  const quickActionsList = [
    {
      id: 'qa-add-user',
      label: 'Add User Account',
      description: 'Student, faculty, or staff',
      icon: UserPlus,
      onClick: () => handleAction('Provision User', 'Opening automated identity provisioning modal...'),
    },
    {
      id: 'qa-create-course',
      label: 'New Course Offering',
      description: 'Syllabus & accreditation',
      icon: FolderPlus,
      onClick: () => handleAction('Course Management', 'Creating course catalog record...'),
    },
    {
      id: 'qa-gen-report',
      label: 'University Audit',
      description: 'Accreditation export',
      icon: BarChart3,
      onClick: () => handleAction('Generate Audit Report', 'Compiling institutional metrics into PDF...'),
    },
    {
      id: 'qa-sys-health',
      label: 'Cluster Health',
      description: 'Zero incident status',
      icon: Server,
      onClick: () => handleAction('System Telemetry', 'Loading distributed server cluster stats...'),
    },
  ];

  const filteredRegistrations = adminRecentRegistrations.filter(
    (reg) =>
      reg.name.toLowerCase().includes(search.toLowerCase()) ||
      reg.email.toLowerCase().includes(search.toLowerCase()) ||
      reg.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7F0]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
              Institutional Administration
            </h1>
            <Badge variant="lavender" size="md">
              Executive Control Plane
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Global virtual university operations, user identity lifecycle, server telemetry, and compliance monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            leftIcon={Download}
            onClick={() => handleAction('Export Report', 'Generating university audit log (CSV)...')}
          >
            Export Audit Report
          </Button>
        </div>
      </div>

      {/* University Key Metrics */}
      <section aria-label="Campus Metrics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((stat) => (
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

      {/* Quick Actions */}
      <section aria-label="Administrative Shortcuts">
        <div className="mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Executive Shortcuts & Operations</h2>
        </div>
        <QuickActions actions={quickActionsList} />
      </section>

      {/* Main Content Grid: Recent Registrations Table & System Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Registrations Table */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <section aria-label="Recent User Registrations">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">Recent Registrations & Approvals</h3>
                <p className="text-xs text-slate-500">Newly enrolled students, faculty onboardings, and parent accounts</p>
              </div>

              <Input
                placeholder="Search user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                leftIcon={Search}
                className="w-full sm:w-56"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((reg) => (
                  <TableRow key={reg.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-800">{reg.name}</span>
                        <span className="text-xs text-slate-400">{reg.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          reg.role === 'Student'
                            ? 'blue'
                            : reg.role === 'Faculty'
                            ? 'lavender'
                            : 'neutral'
                        }
                        size="sm"
                      >
                        {reg.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-600">{reg.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={reg.status === 'Active' ? 'mint' : 'yellow'}
                        size="sm"
                        dot
                      >
                        {reg.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-slate-400">{reg.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Infrastructure Health Status Card */}
          <Card className="p-5 bg-[#F6F6FB]/80 border-[#E7E7F0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#DDF4EA] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-800">Virtual University Grid Online</h4>
                  <p className="text-xs text-slate-500">
                    High availability across 4 global edge nodes. Latency: 18ms avg. 0 critical incidents.
                  </p>
                </div>
              </div>
              <Badge variant="mint" size="md">
                99.98% SLA
              </Badge>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: System Activity & Audit Trail */}
        <div className="flex flex-col gap-6">
          <Card className="p-5 flex flex-col border-[#E7E7F0]">
            <CardHeader className="p-0 pb-3 mb-2 border-b border-[#F1F1F8]">
              <CardTitle className="text-xs sm:text-sm">Audit Trail & Compliance Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-[#F1F1F8]">
              {adminSystemLogs.map((log) => (
                <ActivityItem key={log.id} event={log} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
