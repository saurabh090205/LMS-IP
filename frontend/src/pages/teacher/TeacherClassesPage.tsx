import React, { useState, useEffect } from 'react';
import {
  Video,
  Calendar,
  Clock,
  PlusCircle,
  Users,
  Copy,
  ExternalLink,
  CheckCircle2,
  Radio,
  Play,
  FileVideo,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useToast } from '../../context/ToastContext';
import { teacherApi } from '../../services/api/teacherApi';
import type { LiveClassResponse, CourseSummaryResponse } from '../../types/api';

export default function TeacherClassesPage() {
  const [classes, setClasses] = useState<LiveClassResponse[]>([]);
  const [courses, setCourses] = useState<CourseSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'SCHEDULED' | 'RECORDINGS'>('SCHEDULED');
  const [searchQuery, setSearchQuery] = useState('');

  // Schedule modal state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [sessionTitle, setSessionTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [customRoom, setCustomRoom] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Active meeting viewer modal
  const [activeMeeting, setActiveMeeting] = useState<LiveClassResponse | null>(null);

  const { addToast } = useToast();

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
      const [classList, courseList] = await Promise.all([
        teacherApi.getClasses().catch(() => []),
        teacherApi.getCourses().catch(() => []),
      ]);
      setClasses(classList || []);
      const resolvedCourses = (courseList && courseList.length > 0) ? courseList : fallbackCourses;
      setCourses(resolvedCourses);
      setSelectedCourseId(resolvedCourses[0]?.id || '');
    } catch (err) {
      console.error('Error fetching classes:', err);
      setCourses(fallbackCourses);
      setSelectedCourseId(fallbackCourses[0]?.id || '');
      addToast({
        title: 'Error loading classes',
        description: 'Failed to fetch virtual classroom data from server.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseId || !sessionTitle || !startTime || !endTime) {
      addToast({
        title: 'Missing Fields',
        description: 'Please fill in course, title, and start/end times.',
        type: 'warning',
      });
      return;
    }

    setSubmitting(true);
    try {
      const roomName = customRoom.trim() || `vit-${sessionTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now().toString().slice(-4)}`;
      const meetingUrl = `https://meet.jit.si/${roomName}`;

      await teacherApi.scheduleClass({
        courseId: selectedCourseId,
        title: sessionTitle,
        teacherName: 'Dr. Elena Rostova',
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        meetingUrl,
        jitsiRoomName: roomName,
      });

      addToast({
        title: 'Live Session Scheduled',
        description: `Class "${sessionTitle}" is now published to student timetables.`,
        type: 'success',
      });

      setIsScheduleModalOpen(false);
      setSessionTitle('');
      setStartTime('');
      setEndTime('');
      setCustomRoom('');
      loadData();
    } catch (err) {
      console.error('Failed to schedule class', err);
      addToast({
        title: 'Scheduling Failed',
        description: 'Could not create class session on server.',
        type: 'danger',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (classId: string, newStatus: string) => {
    try {
      await teacherApi.updateClassStatus(classId, newStatus);
      addToast({
        title: 'Status Updated',
        description: `Session status transitioned to ${newStatus}.`,
        type: 'info',
      });
      loadData();
    } catch (err) {
      console.error('Failed to update status', err);
      addToast({
        title: 'Update Failed',
        description: 'Could not transition class status.',
        type: 'danger',
      });
    }
  };

  const copyInviteLink = (url: string) => {
    navigator.clipboard.writeText(url);
    addToast({
      title: 'Invite Link Copied',
      description: 'Auditorium URL copied to clipboard.',
      type: 'success',
    });
  };

  const filteredClasses = classes.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.courseCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const liveClassesCount = classes.filter((c) => c.status === 'LIVE').length;
  const scheduledCount = classes.filter((c) => c.status === 'SCHEDULED').length;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <PageHeader
        title="Faculty Auditorium & Live Virtual Classes"
        subtitle="Host real-time lectures with WebRTC video, manage interactive breakout auditoriums, and publish automated class recordings."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'Classes & Auditorium', isCurrent: true },
        ]}
        actions={
          <Button
            variant="primary"
            size="md"
            leftIcon={PlusCircle}
            onClick={() => setIsScheduleModalOpen(true)}
          >
            Schedule Live Class
          </Button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Live Now"
          value={liveClassesCount}
          helperText="Active WebRTC room"
          icon={Radio}
          badge={<Badge variant={liveClassesCount > 0 ? 'success' : 'neutral'}>{liveClassesCount > 0 ? 'Broadcasting' : 'Idle'}</Badge>}
        />
        <StatCard
          title="Scheduled Sessions"
          value={scheduledCount}
          helperText="Upcoming lectures"
          icon={Calendar}
          badge={<Badge variant="info">Syncing Timetable</Badge>}
        />
        <StatCard
          title="Total Lecture Hours"
          value="48.5 hrs"
          helperText="Delivered this semester"
          icon={Clock}
          badge={<Badge variant="success">Curriculum on track</Badge>}
        />
        <StatCard
          title="Jitsi Gateway"
          value="Operational"
          helperText="Low-latency mesh node"
          icon={Video}
          badge={<Badge variant="success">99.9% Uptime</Badge>}
        />
      </div>

      {/* Tab Navigation and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-3 rounded-xl border border-[#E7E7F0]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('SCHEDULED')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'SCHEDULED'
                ? 'bg-[#1E1B4B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Auditorium Sessions ({classes.length})
          </button>
          <button
            onClick={() => setActiveTab('RECORDINGS')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              activeTab === 'RECORDINGS'
                ? 'bg-[#1E1B4B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Archived Recordings (4)
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search session or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-[#E7E7F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4338CA]/20 focus:border-[#4338CA]"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'SCHEDULED' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredClasses.length === 0 ? (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-[#E7E7F0]">
              <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-medium text-slate-700">No sessions found</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                Schedule your next live lecture or seminar to broadcast to enrolled students.
              </p>
              <Button
                variant="primary"
                size="sm"
                leftIcon={PlusCircle}
                onClick={() => setIsScheduleModalOpen(true)}
              >
                Schedule First Class
              </Button>
            </div>
          ) : (
            filteredClasses.map((item) => {
              const isLive = item.status === 'LIVE';
              const isCompleted = item.status === 'COMPLETED';

              return (
                <Card
                  key={item.id}
                  className={`overflow-hidden transition-all duration-200 hover:shadow-md border ${
                    isLive ? 'border-emerald-300 ring-2 ring-emerald-500/10' : 'border-[#E7E7F0]'
                  }`}
                >
                  <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" size="sm">
                          {item.courseCode}
                        </Badge>
                        <span className="text-xs font-medium text-slate-500 truncate max-w-[200px]">
                          {item.courseTitle}
                        </span>
                      </div>

                      {isLive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                          BROADCASTING LIVE
                        </span>
                      ) : (
                        <Badge
                          variant={isCompleted ? 'neutral' : 'info'}
                          size="sm"
                        >
                          {item.status}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-4 flex flex-col gap-4">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        Host: <strong className="text-slate-700 font-medium">{item.teacherName}</strong>
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-slate-400 block mb-0.5">Start Time</span>
                        <span className="font-medium text-slate-700 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-indigo-500" />
                          {new Date(item.startTime).toLocaleString([], {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block mb-0.5">Jitsi Room</span>
                        <span className="font-mono text-slate-700 truncate block">
                          {item.jitsiRoomName}
                        </span>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          leftIcon={Copy}
                          onClick={() => copyInviteLink(item.meetingUrl)}
                          title="Copy Meeting Invite"
                        >
                          Copy URL
                        </Button>

                        {item.status === 'SCHEDULED' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleStatusChange(item.id, 'LIVE')}
                          >
                            Go Live
                          </Button>
                        )}

                        {isLive && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-amber-600 border-amber-200 hover:bg-amber-50"
                            onClick={() => handleStatusChange(item.id, 'COMPLETED')}
                          >
                            End Class
                          </Button>
                        )}
                      </div>

                      <Button
                        variant={isLive ? 'primary' : 'outline'}
                        size="sm"
                        leftIcon={ExternalLink}
                        onClick={() => window.open(item.meetingUrl, '_blank')}
                      >
                        {isLive ? 'Join Auditorium' : 'Launch Preview'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      ) : (
        /* Recorded Lectures Tab */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              id: 'rec-1',
              title: 'Introduction to Backpropagation & Computational Graphs',
              courseCode: 'CI3001',
              courseTitle: 'Deep Learning',
              duration: '52 min',
              recordedDate: 'Oct 04, 2026',
              views: 61,
            },
            {
              id: 'rec-2',
              title: 'Process Synchronization & Peterson’s Algorithm Proof',
              courseCode: 'CI3202',
              courseTitle: 'Operating System',
              duration: '45 min',
              recordedDate: 'Oct 02, 2026',
              views: 58,
            },
            {
              id: 'rec-3',
              title: 'MLOps Pipeline Deployment with Docker & Kubernetes',
              courseCode: 'CI3003D',
              courseTitle: 'MLOPS',
              duration: '60 min',
              recordedDate: 'Sep 29, 2026',
              views: 64,
            },
            {
              id: 'rec-4',
              title: 'Transformer Attention Mechanics & Scaled Dot-Product',
              courseCode: 'CI4001',
              courseTitle: 'Generative AI',
              duration: '58 min',
              recordedDate: 'Sep 25, 2026',
              views: 59,
            },
          ].map((rec) => (
            <Card key={rec.id} className="overflow-hidden hover:shadow-md transition-all border border-[#E7E7F0]">
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded font-mono">
                  {rec.duration}
                </span>
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-xs rounded font-semibold">
                  {rec.courseCode}
                </span>
              </div>
              <CardContent className="p-4">
                <h4 className="text-sm font-semibold text-slate-800 line-clamp-1">{rec.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{rec.courseTitle}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
                  <span>{rec.recordedDate}</span>
                  <span>{rec.views} Scholars Watched</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal: Schedule Class */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Live Virtual Lecture"
      >
        <form onSubmit={handleCreateClass} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Select Course</label>
            <Select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              options={courses.map((c) => ({
                label: `${c.courseCode}: ${c.title}`,
                value: c.id,
              }))}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">Session Title</label>
            <Input
              placeholder="e.g., Backpropagation in Deep Neural Networks (Lab Demo)"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Start Time</label>
              <Input
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">End Time</label>
              <Input
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Custom Jitsi Room Identifier <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <Input
              placeholder="leave empty to auto-generate"
              value={customRoom}
              onChange={(e) => setCustomRoom(e.target.value)}
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Will resolve to <code>https://meet.jit.si/[room-name]</code> with no plugin required.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={submitting}
            >
              {submitting ? 'Scheduling...' : 'Publish to Students'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
