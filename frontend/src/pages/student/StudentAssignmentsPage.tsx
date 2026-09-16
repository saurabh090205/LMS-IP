import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { assignmentService } from '../../services/assignmentService';
import { Assignment, AssignmentStatus } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Tabs, TabList, TabTrigger, TabContent } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/EmptyState';

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'SUBMITTED' | 'GRADED'>('UPCOMING');
  const navigate = useNavigate();

  useEffect(() => {
    loadAssignments();
  }, []);

  const loadAssignments = async () => {
    const list = await assignmentService.getAssignments();
    setAssignments(list);
  };

  const upcoming = assignments.filter((a) => a.status === 'UPCOMING');
  const submitted = assignments.filter((a) => a.status === 'SUBMITTED');
  const graded = assignments.filter((a) => a.status === 'GRADED');

  const renderAssignmentCard = (asg: Assignment) => (
    <Card
      key={asg.id}
      hoverable
      onClick={() => navigate(`/courses/${asg.courseId}/assignments/${asg.id}`)}
      className="p-5 flex flex-col justify-between gap-4 border-[#E7E7F0]"
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <Badge variant="blue" size="sm">
            {asg.courseCode || 'CS-301'}
          </Badge>
          <span className="text-xs font-semibold text-slate-500">{asg.totalMarks} Points</span>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug">{asg.title}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{asg.description}</p>
      </div>

      <div className="pt-3 border-t border-[#F1F1F8] flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Due: {asg.dueDate}</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          rightIcon={ArrowRight}
        >
          {asg.status === 'GRADED' ? 'Review Score' : 'Open Lab'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <PageHeader
        title="Assignments & Deliverables"
        subtitle="Manage upcoming project submissions, lab evaluations, and reviewed faculty feedback."
        breadcrumbs={[
          { label: 'Student Portal', href: '/student/dashboard' },
          { label: 'Assignments', isCurrent: true },
        ]}
      />

      <Tabs defaultValue="UPCOMING" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabList>
          <TabTrigger value="UPCOMING" badge={upcoming.length}>
            <Clock className="w-4 h-4 mr-1.5" />
            Upcoming Due
          </TabTrigger>
          <TabTrigger value="SUBMITTED" badge={submitted.length}>
            <FileText className="w-4 h-4 mr-1.5" />
            Submitted Awaiting Grade
          </TabTrigger>
          <TabTrigger value="GRADED" badge={graded.length}>
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Graded & Reviewed
          </TabTrigger>
        </TabList>

        <TabContent value="UPCOMING">
          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcoming.map(renderAssignmentCard)}
            </div>
          ) : (
            <EmptyState
              icon={CheckCircle}
              title="All caught up!"
              description="You have no pending assignments with upcoming deadlines."
            />
          )}
        </TabContent>

        <TabContent value="SUBMITTED">
          {submitted.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {submitted.map(renderAssignmentCard)}
            </div>
          ) : (
            <EmptyState
              icon={FileText}
              title="No pending submissions awaiting review"
              description="Submitted deliverables will appear here until faculty completes grading."
            />
          )}
        </TabContent>

        <TabContent value="GRADED">
          {graded.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {graded.map(renderAssignmentCard)}
            </div>
          ) : (
            <EmptyState
              icon={Award}
              title="No graded assignments yet"
              description="Once instructors review your work, grades and feedback notes will display here."
            />
          )}
        </TabContent>
      </Tabs>
    </div>
  );
}
