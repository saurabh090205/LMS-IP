import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  Search,
  Save,
  CheckCheck,
  Download,
  Filter,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Avatar } from '../../components/ui/Avatar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { useToast } from '../../context/ToastContext';
import { teacherApi } from '../../services/api/teacherApi';
import type { CourseSummaryResponse, RosterStudentResponse, AttendanceRecordResponse } from '../../types/api';

type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';

interface StudentAttendanceRow {
  studentProfileId: string;
  name: string;
  rollNumber: string;
  email: string;
  historicalRate: number;
  status: AttendanceStatus;
  remarks: string;
}

export default function TeacherAttendancePage() {
  const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [roster, setRoster] = useState<StudentAttendanceRow[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      loadRosterAndAttendance();
    }
  }, [selectedCourseId, selectedDate]);

  const fallbackCourses: CourseSummaryResponse[] = [
    { id: 'course-deep-learning', courseCode: 'CI3001', title: 'Deep Learning', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 5, totalTopics: 24, studentProgressPercent: 68, semester: 'V', moduleCode: 'V' },
    { id: 'course-operating-systems', courseCode: 'CI3202', title: 'Operating System', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'Computer Science', totalUnits: 5, totalTopics: 22, studentProgressPercent: 55, semester: 'V', moduleCode: 'V' },
    { id: 'course-mlops', courseCode: 'CI3003D', title: 'MLOPS', credits: 3, theoryHours: 2, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 4, totalTopics: 18, studentProgressPercent: 40, semester: 'V', moduleCode: 'V' },
    { id: 'course-genai', courseCode: 'CI4001', title: 'Generative AI', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 5, totalTopics: 20, studentProgressPercent: 30, semester: 'VII', moduleCode: 'VII' },
  ];

  const loadCourses = async () => {
    try {
      const list = await teacherApi.getCourses();
      if (list && list.length > 0) {
        setCourses(list);
        setSelectedCourseId(list[0].id);
      } else {
        setCourses(fallbackCourses);
        setSelectedCourseId(fallbackCourses[0].id);
      }
    } catch (err) {
      console.warn('Using default course curriculum for attendance register', err);
      setCourses(fallbackCourses);
      setSelectedCourseId(fallbackCourses[0].id);
    }
  };

  const loadRosterAndAttendance = async () => {
    setLoading(true);
    try {
      const [rosterData, attendanceData] = await Promise.all([
        teacherApi.getCourseRoster(selectedCourseId),
        teacherApi.getCourseAttendance(selectedCourseId, selectedDate),
      ]);

      const attendanceMap = new Map<string, AttendanceRecordResponse>();
      (attendanceData || []).forEach((rec) => {
        if (rec.studentProfileId) {
          attendanceMap.set(rec.studentProfileId, rec);
        }
      });

      // If backend roster has items, use them; otherwise provide rich demo cohort
      let studentsList: RosterStudentResponse[] = rosterData || [];
      if (studentsList.length === 0) {
        studentsList = [
          {
            id: 'enr-1',
            studentProfileId: 'profile-aarav',
            studentName: 'Aarav Sharma',
            email: 'aarav.sharma@shreenil.edu',
            enrollmentNumber: 'VIT-2026-AI88',
            section: 'Division AI-1',
            attendancePercentage: 96.8,
            progressPercentage: 68,
            status: 'ACTIVE',
          },
          {
            id: 'enr-2',
            studentProfileId: 'profile-rohan',
            studentName: 'Rohan Verma',
            email: 'rohan.v@shreenil.edu',
            enrollmentNumber: 'VIT-2026-AI89',
            section: 'Division AI-1',
            attendancePercentage: 91.5,
            progressPercentage: 74,
            status: 'ACTIVE',
          },
          {
            id: 'enr-3',
            studentProfileId: 'profile-priya',
            studentName: 'Priya Patel',
            email: 'priya.p@shreenil.edu',
            enrollmentNumber: 'VIT-2026-AI90',
            section: 'Division AI-1',
            attendancePercentage: 98.2,
            progressPercentage: 82,
            status: 'ACTIVE',
          },
          {
            id: 'enr-4',
            studentProfileId: 'profile-marcus',
            studentName: 'Marcus Aurelius Sterling',
            email: 'marcus.s@shreenil.edu',
            enrollmentNumber: 'VIT-2026-AI91',
            section: 'Division AI-1',
            attendancePercentage: 88.0,
            progressPercentage: 61,
            status: 'ACTIVE',
          },
          {
            id: 'enr-5',
            studentProfileId: 'profile-zoya',
            studentName: 'Zoya Khan',
            email: 'zoya.k@shreenil.edu',
            enrollmentNumber: 'VIT-2026-AI92',
            section: 'Division AI-1',
            attendancePercentage: 94.0,
            progressPercentage: 79,
            status: 'ACTIVE',
          },
        ];
      }

      const rows: StudentAttendanceRow[] = studentsList.map((s) => {
        const existing = attendanceMap.get(s.studentProfileId);
        return {
          studentProfileId: s.studentProfileId,
          name: s.studentName,
          rollNumber: s.enrollmentNumber,
          email: s.email,
          historicalRate: s.attendancePercentage || 94,
          status: (existing?.status as AttendanceStatus) || 'PRESENT',
          remarks: existing?.remarks || '',
        };
      });

      setRoster(rows);
    } catch (err) {
      console.error('Failed to load roster/attendance', err);
      addToast({
        title: 'Error loading roster',
        description: 'Unable to retrieve students for selected course.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentProfileId: string, status: AttendanceStatus) => {
    setRoster((prev) =>
      prev.map((r) => (r.studentProfileId === studentProfileId ? { ...r, status } : r))
    );
  };

  const handleRemarksChange = (studentProfileId: string, remarks: string) => {
    setRoster((prev) =>
      prev.map((r) => (r.studentProfileId === studentProfileId ? { ...r, remarks } : r))
    );
  };

  const markAllPresent = () => {
    setRoster((prev) => prev.map((r) => ({ ...r, status: 'PRESENT' })));
    addToast({
      title: 'Batch Action Applied',
      description: 'All scholars set to PRESENT. Remember to click Save Register.',
      type: 'info',
    });
  };

  const saveAttendanceRegister = async () => {
    if (!selectedCourseId) return;
    setSaving(true);
    try {
      await teacherApi.markBatchAttendance({
        courseId: selectedCourseId,
        attendanceDate: selectedDate,
        entries: roster.map((r) => ({
          studentProfileId: r.studentProfileId,
          status: r.status,
          remarks: r.remarks,
        })),
      });

      addToast({
        title: 'Register Saved & Synced',
        description: `Successfully recorded attendance for ${roster.length} students on ${selectedDate}.`,
        type: 'success',
      });
    } catch (err) {
      console.error('Failed to save attendance', err);
      addToast({
        title: 'Save Failed',
        description: 'Server error while persisting attendance records.',
        type: 'danger',
      });
    } finally {
      setSaving(false);
    }
  };

  const filteredRoster = roster.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = roster.filter((r) => r.status === 'PRESENT').length;
  const lateCount = roster.filter((r) => r.status === 'LATE').length;
  const absentCount = roster.filter((r) => r.status === 'ABSENT').length;
  const excusedCount = roster.filter((r) => r.status === 'EXCUSED').length;
  const total = roster.length;
  const attendanceRate = total > 0 ? (((presentCount + lateCount) / total) * 100).toFixed(1) : '100.0';

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-16">
      <PageHeader
        title="Faculty Attendance Register"
        subtitle="Record daily classroom presence, log tardiness or authorized medical excuses, and sync real-time attendance percentages."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'Attendance Register', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={CheckCheck}
              onClick={markAllPresent}
            >
              Mark All Present
            </Button>
            <Button
              variant="primary"
              size="sm"
              leftIcon={Save}
              disabled={saving}
              onClick={saveAttendanceRegister}
            >
              {saving ? 'Syncing...' : 'Save Register'}
            </Button>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard
          title="Total Scholars"
          value={total}
          helperText="Enrolled in section"
          icon={Users}
        />
        <StatCard
          title="Present"
          value={presentCount}
          helperText="In classroom"
          icon={CheckCircle}
          badge={<Badge variant="success">Attending</Badge>}
        />
        <StatCard
          title="Late Arrival"
          value={lateCount}
          helperText="Admitted tardy"
          icon={Clock}
          badge={<Badge variant="warning">Partial credit</Badge>}
        />
        <StatCard
          title="Absent"
          value={absentCount}
          helperText="Unexcused"
          icon={XCircle}
          badge={<Badge variant={absentCount > 0 ? 'danger' : 'neutral'}>{absentCount > 0 ? 'Flagged' : 'None'}</Badge>}
        />
        <StatCard
          title="Daily Rate"
          value={`${attendanceRate}%`}
          helperText="Compliance ratio"
          icon={Sparkles}
          badge={<Badge variant={Number(attendanceRate) >= 75 ? 'success' : 'danger'}>{Number(attendanceRate) >= 75 ? 'Meets VIT 75% Rule' : 'Below Threshold'}</Badge>}
        />
      </div>

      {/* Control Bar: Course selector, Date Picker, Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-[#E7E7F0]">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          <div className="w-full sm:w-80">
            <Select
              label="Select Subject / Course"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              options={courses.map((c) => ({
                label: `${c.courseCode}: ${c.title}`,
                value: c.id,
              }))}
            />
          </div>

          <div className="w-full sm:w-48">
            <label className="block text-xs font-medium text-slate-700 mb-1">Attendance Date</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full sm:w-64 mt-auto">
          <Input
            placeholder="Search scholar..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={Search}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <Card className="overflow-hidden border border-[#E7E7F0]">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/70">
              <TableHead className="w-72">Scholar Name & ID</TableHead>
              <TableHead>Prior Term Rate</TableHead>
              <TableHead className="text-center">Attendance Status</TableHead>
              <TableHead>Teacher Note / Remarks</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                  Loading class roster and attendance data...
                </TableCell>
              </TableRow>
            ) : filteredRoster.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-slate-500">
                  No scholars match the search criteria.
                </TableCell>
              </TableRow>
            ) : (
              filteredRoster.map((item) => (
                <TableRow key={item.studentProfileId} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={item.name}
                        size="md"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 text-sm">{item.name}</div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5">{item.rollNumber}</div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.historicalRate >= 85
                              ? 'bg-emerald-500'
                              : item.historicalRate >= 75
                              ? 'bg-amber-500'
                              : 'bg-rose-500'
                          }`}
                          style={{ width: `${item.historicalRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {item.historicalRate}%
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-center gap-1.5">
                      {(
                        [
                          { status: 'PRESENT', label: 'Present', activeColor: 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-600' },
                          { status: 'LATE', label: 'Late', activeColor: 'bg-amber-500 text-white shadow-sm ring-1 ring-amber-500' },
                          { status: 'ABSENT', label: 'Absent', activeColor: 'bg-rose-600 text-white shadow-sm ring-1 ring-rose-600' },
                          { status: 'EXCUSED', label: 'Excused', activeColor: 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-600' },
                        ] as const
                      ).map((btn) => {
                        const isSelected = item.status === btn.status;
                        return (
                          <button
                            key={btn.status}
                            type="button"
                            onClick={() => handleStatusChange(item.studentProfileId, btn.status)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                              isSelected
                                ? btn.activeColor
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {btn.label}
                          </button>
                        );
                      })}
                    </div>
                  </TableCell>

                  <TableCell>
                    <input
                      type="text"
                      placeholder="Optional note (e.g. excused hospital visit)..."
                      value={item.remarks}
                      onChange={(e) => handleRemarksChange(item.studentProfileId, e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Floating Save Action Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-slate-900/90 text-white backdrop-blur-md px-5 py-3 rounded-full shadow-2xl border border-white/10">
        <span className="text-xs text-slate-300">
          Showing <strong>{filteredRoster.length} scholars</strong> • {presentCount} Present
        </span>
        <div className="h-4 w-px bg-white/20"></div>
        <Button
          variant="primary"
          size="sm"
          leftIcon={Save}
          disabled={saving}
          onClick={saveAttendanceRegister}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
        >
          {saving ? 'Saving...' : 'Sync to Database'}
        </Button>
      </div>
    </div>
  );
}
