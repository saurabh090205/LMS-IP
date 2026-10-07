import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileCheck,
  PlusCircle,
  Calendar,
  Clock,
  Award,
  Users,
  Search,
  CheckCircle,
  AlertCircle,
  FileText,
  Eye,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import { teacherApi } from '../../services/api/teacherApi';
import type {
  AssignmentResponse,
  CourseSummaryResponse,
  FacultySubmissionResponse,
} from '../../types/api';

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<AssignmentResponse[]>([]);
  const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('ALL');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Creation modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCourseId, setNewCourseId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newDueDate, setNewDueDate] = useState('');
  const [newMaxMarks, setNewMaxMarks] = useState(100);
  const [newSubmissionType, setNewSubmissionType] = useState('CODE_NOTEBOOK');
  const [submitting, setSubmitting] = useState(false);

  // Submissions drawer modal state
  const [selectedAssignmentForSubs, setSelectedAssignmentForSubs] = useState<AssignmentResponse | null>(null);
  const [subsList, setSubsList] = useState<FacultySubmissionResponse[]>([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  const fallbackCourses: CourseSummaryResponse[] = [
    { id: 'course-deep-learning', courseCode: 'CI3001', title: 'Deep Learning', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 5, totalTopics: 24, studentProgressPercent: 68, semester: 'V', moduleCode: 'V' },
    { id: 'course-operating-systems', courseCode: 'CI3202', title: 'Operating System', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'Computer Science', totalUnits: 5, totalTopics: 22, studentProgressPercent: 55, semester: 'V', moduleCode: 'V' },
    { id: 'course-mlops', courseCode: 'CI3003D', title: 'MLOPS', credits: 3, theoryHours: 2, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 4, totalTopics: 18, studentProgressPercent: 40, semester: 'V', moduleCode: 'V' },
    { id: 'course-genai', courseCode: 'CI4001', title: 'Generative AI', credits: 4, theoryHours: 3, labHours: 2, tutorialHours: 0, department: 'AI & Data Science', totalUnits: 5, totalTopics: 20, studentProgressPercent: 30, semester: 'VII', moduleCode: 'VII' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [asgList, courseList] = await Promise.all([
        teacherApi.getAssignments().catch(() => []),
        teacherApi.getCourses().catch(() => []),
      ]);
      setAssignments(asgList || []);
      const resolvedCourses = (courseList && courseList.length > 0) ? courseList : fallbackCourses;
      setCourses(resolvedCourses);
      setNewCourseId(resolvedCourses[0]?.id || '');
    } catch (err) {
      console.error('Failed to load assignments', err);
      setCourses(fallbackCourses);
      setNewCourseId(fallbackCourses[0]?.id || '');
      addToast({
        title: 'Error loading assignments',
        description: 'Could not fetch homework list from server.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseId || !newTitle || !newDescription || !newDueDate) {
      addToast({
        title: 'Missing Fields',
        description: 'Please complete all required fields.',
        type: 'warning',
      });
      return;
    }

    setSubmitting(true);
    try {
      await teacherApi.createAssignment({
        courseId: newCourseId,
        title: newTitle,
        description: newDescription,
        dueDate: new Date(newDueDate).toISOString(),
        maxMarks: Number(newMaxMarks),
        submissionType: newSubmissionType,
      });

      addToast({
        title: 'Assignment Published',
        description: `"${newTitle}" has been posted to student coursework feeds.`,
        type: 'success',
      });

      setIsCreateModalOpen(false);
      setNewTitle('');
      setNewDescription('');
      setNewDueDate('');
      loadData();
    } catch (err) {
      console.error('Failed to create assignment', err);
      addToast({
        title: 'Creation Failed',
        description: 'Could not post assignment to server.',
        type: 'danger',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenSubmissions = async (asg: AssignmentResponse) => {
    setSelectedAssignmentForSubs(asg);
    setLoadingSubs(true);
    try {
      const list = await teacherApi.getAssignmentSubmissions(asg.id);
      setSubsList(list || []);
    } catch (err) {
      console.error('Failed to load submissions for assignment', err);
      setSubsList([]);
    } finally {
      setLoadingSubs(false);
    }
  };

  const filteredAssignments = assignments
    .filter((a) => (selectedCourseFilter === 'ALL' ? true : a.courseId === selectedCourseFilter))
    .filter(
      (a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
        a.courseCode.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-12">
      <PageHeader
        title="Faculty Assignments & Assessment Control"
        subtitle="Author homework problem sets, configure submission deadlines, inspect student uploads, and launch the SpeedGrader."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'Assignments', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              leftIcon={Award}
              onClick={() => navigate('/teacher/grading')}
            >
              SpeedGrader Queue
            </Button>
            <Button
              variant="primary"
              size="md"
              leftIcon={PlusCircle}
              onClick={() => setIsCreateModalOpen(true)}
            >
              New Assignment
            </Button>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Assignments"
          value={assignments.length}
          helperText="Across all courses"
          icon={FileCheck}
          badge={<Badge variant="success">Published</Badge>}
        />
        <StatCard
          title="Submissions Received"
          value="184"
          helperText="Total student uploads"
          icon={Users}
          badge={<Badge variant="info">High engagement</Badge>}
        />
        <StatCard
          title="Pending Evaluation"
          value="4"
          helperText="In SpeedGrader queue"
          icon={Clock}
          badge={<Badge variant="warning">Action required</Badge>}
        />
        <StatCard
          title="Rubric Consistency"
          value="100%"
          helperText="Standardized criteria"
          icon={CheckCircle}
          badge={<Badge variant="success">Compliant</Badge>}
        />
      </div>

      {/* Course Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-[#E7E7F0]">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedCourseFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
              selectedCourseFilter === 'ALL'
                ? 'bg-[#1E1B4B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Courses ({assignments.length})
          </button>
          {courses.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCourseFilter(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                selectedCourseFilter === c.id
                  ? 'bg-[#1E1B4B] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {c.courseCode}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assignments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#E7E7F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA]"
          />
        </div>
      </div>

      {/* Assignment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            Loading assignments from server...
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-[#E7E7F0]">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-medium text-slate-700">No assignments found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-4">
              Create an assignment to assign problem sets, code deliverables, or reading reflections.
            </p>
            <Button
              variant="primary"
              size="sm"
              leftIcon={PlusCircle}
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Assignment
            </Button>
          </div>
        ) : (
          filteredAssignments.map((asg) => (
            <Card key={asg.id} className="overflow-hidden border border-[#E7E7F0] hover:shadow-md transition-all">
              <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {asg.courseCode}
                    </Badge>
                    <span className="text-xs font-medium text-slate-500 truncate max-w-[200px]">
                      {asg.courseTitle}
                    </span>
                  </div>

                  <Badge variant="lavender" size="sm">
                    {asg.maxMarks} Marks Max
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="pt-4 flex flex-col gap-3">
                <div>
                  <h3 className="text-base font-semibold text-slate-900 line-clamp-1">{asg.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">{asg.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Submission Deadline</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {new Date(asg.dueDate).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Type & Deliverable</span>
                    <span className="font-mono text-slate-700 uppercase">
                      {asg.submissionType || 'FILE UPLOAD'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={Eye}
                    onClick={() => handleOpenSubmissions(asg)}
                  >
                    View Submissions
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Award}
                    onClick={() => navigate('/teacher/grading')}
                  >
                    SpeedGrader
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal: Create Assignment */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Author New Course Assignment"
      >
        <form onSubmit={handleCreateAssignment} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Target Course</label>
            <Select
              value={newCourseId}
              onChange={(e) => setNewCourseId(e.target.value)}
              options={courses.map((c) => ({
                label: `${c.courseCode}: ${c.title}`,
                value: c.id,
              }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Assignment Title</label>
            <Input
              placeholder="e.g., Practical 3: Convolutional Neural Network on CIFAR-10"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Description & Objectives</label>
            <Textarea
              placeholder="Describe requirements, expected results, mathematical derivations, and submission format..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Due Date & Time</label>
              <Input
                type="datetime-local"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Maximum Marks</label>
              <Input
                type="number"
                value={newMaxMarks}
                onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                min={1}
                max={500}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Submission Type</label>
            <Select
              value={newSubmissionType}
              onChange={(e) => setNewSubmissionType(e.target.value)}
              options={[
                { label: 'Jupyter Notebook / Python Script (.ipynb, .py)', value: 'CODE_NOTEBOOK' },
                { label: 'Laboratory Report (PDF, DOCX)', value: 'REPORT' },
                { label: 'Text Reflection & Online Code Editor', value: 'TEXT_AND_FILE' },
              ]}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={submitting}
            >
              {submitting ? 'Publishing...' : 'Publish Assignment'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: View Submissions Drawer */}
      <Modal
        isOpen={!!selectedAssignmentForSubs}
        onClose={() => setSelectedAssignmentForSubs(null)}
        title={selectedAssignmentForSubs ? `Submissions: ${selectedAssignmentForSubs.title}` : 'Submissions'}
      >
        <div className="flex flex-col gap-4">
          {loadingSubs ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              Retrieving student submissions...
            </div>
          ) : subsList.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm bg-slate-50 rounded-xl">
              <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              No submissions recorded yet for this assignment.
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {subsList.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 bg-white border border-[#E7E7F0] rounded-xl flex items-center justify-between gap-3 hover:border-indigo-200 transition-all"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{sub.studentName}</h4>
                    <p className="text-xs text-slate-400 font-mono">{sub.studentEmail}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant={sub.status === 'GRADED' ? 'success' : 'warning'}
                        size="sm"
                      >
                        {sub.status}
                      </Badge>
                      {sub.fileName && (
                        <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {sub.fileName}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {sub.marksAwarded != null ? (
                      <span className="text-xs font-bold text-emerald-600">
                        {sub.marksAwarded} / {sub.maxMarks}
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setSelectedAssignmentForSubs(null);
                          navigate('/teacher/grading');
                        }}
                      >
                        Grade in SpeedGrader
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <Button
              variant="outline"
              size="md"
              onClick={() => setSelectedAssignmentForSubs(null)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
