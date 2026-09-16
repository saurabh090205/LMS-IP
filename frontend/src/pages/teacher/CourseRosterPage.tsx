import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Users,
  Search,
  ArrowLeft,
  Mail,
  Download,
  CheckCircle,
  Clock,
  Award,
} from 'lucide-react';
import { gradeService } from '../../services/gradeService';
import { courseService } from '../../services/courseService';
import { Course, CourseStudentRosterItem } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Pagination } from '../../components/ui/Pagination';
import { useToast } from '../../context/ToastContext';

export default function CourseRosterPage() {
  const { id } = useParams<{ id: string }>();
  const courseId = id || 'cs301';
  const { addToast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [roster, setRoster] = useState<CourseStudentRosterItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    const c = await courseService.getCourseById(courseId);
    if (c) setCourse(c);
    const list = await gradeService.getCourseRoster(courseId);
    setRoster(list);
  };

  const filtered = roster.filter((item) => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.studentEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <PageHeader
        title={`Student Roster — ${course?.code || 'CS-301'}`}
        subtitle="Manage registered students, track individual syllabus progression, view grades, and send cohort notifications."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'My Courses', href: '/teacher/courses' },
          { label: course?.code || 'Course', href: `/courses/${courseId}` },
          { label: 'Roster', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/teacher/courses">
              <Button size="sm" variant="outline" leftIcon={ArrowLeft}>
                Back to Courses
              </Button>
            </Link>
            <Button
              size="sm"
              variant="outline"
              leftIcon={Download}
              onClick={() => addToast({ title: 'Roster Exported', description: 'Downloaded CSV student list.', type: 'info' })}
            >
              Export CSV
            </Button>
          </div>
        }
      />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="w-full sm:max-w-md">
          <Input
            placeholder="Search student by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={Search}
          />
        </div>

        <div className="flex items-center gap-2">
          {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === st
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Roster Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Student</TableHead>
            <TableHead>Enrollment Date</TableHead>
            <TableHead className="w-48">Course Progress</TableHead>
            <TableHead>Current Grade</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar name={item.studentName} src={item.studentAvatar} size="sm" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{item.studentName}</span>
                    <span className="text-xs text-slate-400">{item.studentEmail}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-xs text-slate-600">{item.enrollmentDate}</TableCell>
              <TableCell>
                <ProgressBar value={item.progressPercent} showPercentage size="sm" />
              </TableCell>
              <TableCell>
                <Badge variant="primary" size="sm">
                  {item.currentGrade}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-slate-500">{item.lastActive}</TableCell>
              <TableCell>
                <Badge variant={item.status === 'ACTIVE' ? 'success' : 'neutral'} size="sm" dot>
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={filtered.length}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
