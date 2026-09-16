import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  Search,
  BookOpen,
  Users,
  Clock,
  Edit,
  Layers,
  CheckCircle,
  Archive,
  Eye,
  SlidersHorizontal,
  MoreVertical,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { Course, CourseStatus } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Dropdown } from '../../components/ui/Dropdown';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';

export default function TeacherCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | CourseStatus>('ALL');
  const [selectedCourseForLifecycle, setSelectedCourseForLifecycle] = useState<{ course: Course; action: 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' } | null>(null);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [statusFilter, search]);

  const fetchCourses = async () => {
    const list = await courseService.getCourses({
      status: statusFilter === 'ALL' ? undefined : statusFilter,
      search,
    });
    setCourses(list);
  };

  const handleLifecycleChange = async () => {
    if (!selectedCourseForLifecycle) return;
    const { course, action } = selectedCourseForLifecycle;
    const nextStatus: CourseStatus =
      action === 'PUBLISH' ? 'PUBLISHED' : action === 'UNPUBLISH' ? 'DRAFT' : 'ARCHIVED';

    await courseService.updateCourseStatus(course.id, nextStatus);
    addToast({
      title: `Course ${action === 'PUBLISH' ? 'Published' : action === 'UNPUBLISH' ? 'Unpublished' : 'Archived'}`,
      description: `${course.title} is now in ${nextStatus} state.`,
      type: 'success',
    });
    setSelectedCourseForLifecycle(null);
    fetchCourses();
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="My Faculty Courses"
        subtitle="Manage your instructional curriculum, design module structures, monitor student enrollment rosters, and publish courses."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'My Courses', isCurrent: true },
        ]}
        actions={
          <Link to="/teacher/courses/new">
            <Button leftIcon={PlusCircle}>Create New Course</Button>
          </Link>
        }
      />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div className="w-full sm:max-w-md">
          <Input
            placeholder="Search by course code, title, or topic..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={Search}
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {(['ALL', 'PUBLISHED', 'DRAFT', 'ARCHIVED'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => {
            const statusBadgeVariant = {
              PUBLISHED: 'success',
              DRAFT: 'warning',
              ARCHIVED: 'neutral',
            }[course.status] as 'success' | 'warning' | 'neutral';

            return (
              <Card key={course.id} className="flex flex-col justify-between overflow-hidden border-slate-200 hover:border-slate-300 transition-all">
                {/* Card Top Ribbon */}
                <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {course.code}
                    </span>
                    <Badge variant={statusBadgeVariant} size="sm" dot>
                      {course.status}
                    </Badge>
                  </div>

                  <Dropdown
                    align="right"
                    trigger={
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    }
                  >
                    <div className="p-1 text-xs">
                      <button
                        onClick={() => navigate(`/courses/${course.id}`)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>Preview Course</span>
                      </button>
                      <button
                        onClick={() => navigate(`/teacher/courses/${course.id}/edit`)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                      >
                        <Edit className="w-3.5 h-3.5 text-slate-400" />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => navigate(`/teacher/courses/${course.id}/builder`)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                      >
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        <span>Course Builder</span>
                      </button>
                      <button
                        onClick={() => navigate(`/teacher/courses/${course.id}/students`)}
                        className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700"
                      >
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Student Roster</span>
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      {course.status === 'DRAFT' && (
                        <button
                          onClick={() => setSelectedCourseForLifecycle({ course, action: 'PUBLISH' })}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-emerald-50 text-emerald-700 font-semibold"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Publish Course</span>
                        </button>
                      )}
                      {course.status === 'PUBLISHED' && (
                        <button
                          onClick={() => setSelectedCourseForLifecycle({ course, action: 'UNPUBLISH' })}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-amber-50 text-amber-700 font-semibold"
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>Unpublish to Draft</span>
                        </button>
                      )}
                      {course.status !== 'ARCHIVED' && (
                        <button
                          onClick={() => setSelectedCourseForLifecycle({ course, action: 'ARCHIVE' })}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-500"
                        >
                          <Archive className="w-3.5 h-3.5 text-slate-400" />
                          <span>Archive Course</span>
                        </button>
                      )}
                    </div>
                  </Dropdown>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {course.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-slate-400" />
                      <strong className="text-slate-800">{course.enrolledStudentsCount}</strong> Students
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-slate-400" />
                      <strong className="text-slate-800">{course.modulesCount || 4}</strong> Modules
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Updated: {course.lastUpdated}</span>
                    <span>{course.durationHours}h Duration</span>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={Layers}
                    onClick={() => navigate(`/teacher/courses/${course.id}/builder`)}
                  >
                    Builder
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={Users}
                    onClick={() => navigate(`/teacher/courses/${course.id}/students`)}
                  >
                    Roster
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No courses match your filter"
          description="Try adjusting your search terms or change the status filter."
          action={{
            label: 'Create New Course',
            onClick: () => navigate('/teacher/courses/new'),
            icon: PlusCircle,
          }}
        />
      )}

      {/* Course Lifecycle Confirmation Dialog */}
      <Modal
        isOpen={Boolean(selectedCourseForLifecycle)}
        onClose={() => setSelectedCourseForLifecycle(null)}
        title={`${selectedCourseForLifecycle?.action} Course Confirmation`}
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelectedCourseForLifecycle(null)}>
              Cancel
            </Button>
            <Button
              variant={selectedCourseForLifecycle?.action === 'ARCHIVE' ? 'danger' : 'primary'}
              onClick={handleLifecycleChange}
            >
              Confirm {selectedCourseForLifecycle?.action}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          Are you sure you want to <strong>{selectedCourseForLifecycle?.action.toLowerCase()}</strong> the course{' '}
          <span className="text-slate-900 font-bold">"{selectedCourseForLifecycle?.course.title}"</span>?
        </p>
        <p className="text-xs text-slate-500 mt-2">
          {selectedCourseForLifecycle?.action === 'PUBLISH'
            ? 'This will make the course visible and accessible in the student course catalog.'
            : selectedCourseForLifecycle?.action === 'UNPUBLISH'
            ? 'The course will revert to Draft mode and won’t accept new student enrollments.'
            : 'Archived courses will be hidden from active rosters and placed in cold storage.'}
        </p>
      </Modal>
    </div>
  );
}
