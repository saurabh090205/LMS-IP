import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  CheckCircle,
  Eye,
  Award,
  Clock,
  Download,
  FileText,
  Save,
  Sparkles,
} from 'lucide-react';
import { gradeService } from '../../services/gradeService';
import { Submission } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Avatar } from '../../components/ui/Avatar';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';

type ExtendedSubmission = Submission & { courseCode: string; courseTitle: string; assignmentTitle: string };

export default function GradingQueuePage() {
  const [submissions, setSubmissions] = useState<ExtendedSubmission[]>([]);
  const [activeSubmissionForGrading, setActiveSubmissionForGrading] = useState<ExtendedSubmission | null>(null);
  const [marks, setMarks] = useState<number>(95);
  const [feedback, setFeedback] = useState<string>('');

  const { addToast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    const list = await gradeService.getPendingSubmissions();
    setSubmissions(list as ExtendedSubmission[]);
  };

  const openGradingModal = (sub: ExtendedSubmission) => {
    setActiveSubmissionForGrading(sub);
    setMarks(sub.marksAwarded || 92);
    setFeedback(sub.feedback || 'Excellent work on the code structure and numerical proofs.');
  };

  const handleSaveGrade = async () => {
    if (!activeSubmissionForGrading) return;

    await gradeService.gradeSubmission(
      activeSubmissionForGrading.id,
      marks,
      feedback,
      'Dr. Elena Rostova'
    );

    addToast({
      title: 'Submission Graded & Published',
      description: `Awarded ${marks}/${activeSubmissionForGrading.maxMarks} to ${activeSubmissionForGrading.studentName}.`,
      type: 'success',
    });

    setActiveSubmissionForGrading(null);
    loadSubmissions();
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <PageHeader
        title="Pending Grading Queue"
        subtitle="Review student code deliverables, evaluate submissions against grading rubrics, and provide feedback."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'Grading Queue', isCurrent: true },
        ]}
        badge={
          <Badge variant="danger" size="md">
            {submissions.length} Awaiting Evaluation
          </Badge>
        }
      />

      {submissions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Assignment</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.map((sub) => (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={sub.studentName} size="sm" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{sub.studentName}</span>
                      <span className="text-xs text-slate-400">{sub.studentEmail}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="primary" size="sm">
                    {sub.courseCode}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs font-semibold text-slate-800">
                  {sub.assignmentTitle}
                </TableCell>
                <TableCell className="text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{sub.submittedAt}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="warning" size="sm" dot>
                    Needs Grading
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="primary"
                    leftIcon={Award}
                    onClick={() => openGradingModal(sub)}
                  >
                    SpeedGrader
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <EmptyState
          icon={CheckCircle}
          title="Grading Queue is Clear!"
          description="All student submissions have been graded and published."
        />
      )}

      {/* SPEEDGRADER EVALUATION MODAL */}
      <Modal
        isOpen={Boolean(activeSubmissionForGrading)}
        onClose={() => setActiveSubmissionForGrading(null)}
        title="SpeedGrader — Evaluation & Rubric Feedback"
        size="xl"
        footer={
          <>
            <Button variant="outline" onClick={() => setActiveSubmissionForGrading(null)}>
              Cancel
            </Button>
            <Button variant="primary" leftIcon={Save} onClick={handleSaveGrade}>
              Publish Grade & Feedback
            </Button>
          </>
        }
      >
        {activeSubmissionForGrading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Student Submission Content */}
            <div className="flex flex-col gap-4 border-r border-slate-100 pr-0 md:pr-6">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <Avatar name={activeSubmissionForGrading.studentName} size="md" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{activeSubmissionForGrading.studentName}</h4>
                  <p className="text-xs text-slate-500">{activeSubmissionForGrading.assignmentTitle} • {activeSubmissionForGrading.courseCode}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Student Submission Text</span>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-mono leading-relaxed max-h-48 overflow-y-auto">
                  {activeSubmissionForGrading.textResponse || 'No accompanying written note.'}
                </div>
              </div>

              {activeSubmissionForGrading.attachments && activeSubmissionForGrading.attachments.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Attached Artifacts</span>
                  <div className="flex flex-col gap-1.5">
                    {activeSubmissionForGrading.attachments.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white text-xs hover:bg-slate-50 cursor-pointer"
                        onClick={() => addToast({ title: 'Viewing Artifact', description: `Opening ${file}...`, type: 'info' })}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-600" />
                          <span className="font-semibold text-slate-800">{file}</span>
                        </div>
                        <Button size="sm" variant="ghost" leftIcon={Download}>
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Score & Rubric Grading Input */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Assessment Score</span>
                <span className="text-xs text-slate-500">Max: {activeSubmissionForGrading.maxMarks} Points</span>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100">
                <Input
                  type="number"
                  label="Score Awarded"
                  value={marks}
                  onChange={(e) => setMarks(Number(e.target.value))}
                  min={0}
                  max={activeSubmissionForGrading.maxMarks}
                  className="w-32 font-bold text-lg"
                />
                <div className="flex flex-col text-xs text-slate-600 mt-4">
                  <span>Percentage: <strong>{Math.round((marks / activeSubmissionForGrading.maxMarks) * 100)}%</strong></span>
                  <span>Letter Grade: <strong>{marks >= 90 ? 'A' : marks >= 80 ? 'B' : 'C'}</strong></span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Instructor Feedback & Rubric Notes
                </label>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Provide qualitative feedback, highlight areas of excellence or algorithmic bugs..."
                  rows={5}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
