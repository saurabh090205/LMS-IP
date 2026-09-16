import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  Award,
  UploadCloud,
  File,
  X,
  CheckCircle,
  Save,
  Send,
  ArrowLeft,
  Download,
  AlertCircle,
} from 'lucide-react';
import { assignmentService } from '../../services/assignmentService';
import { Assignment, Submission } from '../../types/lms';
import { CourseLayout } from '../../components/layout/CourseLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Textarea } from '../../components/ui/Textarea';
import { Modal } from '../../components/ui/Modal';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function AssignmentDetailPage() {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const cId = courseId || 'cs301';
  const aId = assignmentId || 'asg-201';

  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [textResponse, setTextResponse] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadAssignment();
  }, [aId]);

  const loadAssignment = async () => {
    const asg = await assignmentService.getAssignmentById(aId);
    if (asg) {
      setAssignment(asg);
      if (asg.userSubmission) {
        setTextResponse(asg.userSubmission.textResponse || '');
        setAttachedFiles(asg.userSubmission.attachments || []);
      }
    }
  };

  const handleMockDrop = () => {
    const newFiles = ['transformer_attention_solution.py', 'convergence_loss_curves.pdf'];
    setAttachedFiles((prev) => Array.from(new Set([...prev, ...newFiles])));
    addToast({
      title: 'File Attached (Prototype)',
      description: 'Files staged for submission.',
      type: 'info',
    });
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    await assignmentService.submitAssignment(aId, {
      studentId: user.id,
      studentName: user.name,
      studentEmail: user.email,
      textResponse,
      attachments: attachedFiles,
    });

    setIsSubmitting(false);
    setIsConfirmModalOpen(false);

    addToast({
      title: 'Assignment Submitted! 🚀',
      description: `Your work for "${assignment?.title}" has been transmitted to the instructor for evaluation.`,
      type: 'success',
    });

    loadAssignment();
  };

  if (!assignment) return null;

  return (
    <CourseLayout>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Header Breadcrumb & Actions */}
        <div className="flex items-center justify-between">
          <Link
            to={`/courses/${cId}?tab=assignments`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course Assignments
          </Link>

          <Badge variant={assignment.status === 'GRADED' ? 'success' : 'primary'} size="md">
            Status: {assignment.status}
          </Badge>
        </div>

        {/* Assignment Title Card */}
        <Card className="p-6 border-slate-200 bg-white">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="primary" size="sm">{assignment.courseCode || 'CS-301'}</Badge>
              <span className="text-xs text-slate-400 font-medium">Assignment Milestone</span>
            </div>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{assignment.title}</h1>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-slate-400" />
                Due: <strong>{assignment.dueDate}</strong> ({assignment.dueTime || '11:59 PM'})
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-600" />
                Points: <strong>{assignment.totalMarks} Marks</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Instructions & Rubric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Instructions Narrative */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Card className="p-6 border-slate-200">
              <CardHeader className="p-0 pb-3 border-b border-slate-100">
                <CardTitle className="text-base">Instructions & Problem Statement</CardTitle>
              </CardHeader>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-4 whitespace-pre-line font-sans">
                {assignment.instructions}
              </div>
            </Card>

            {/* Rubric Breakdown */}
            {assignment.rubric && assignment.rubric.length > 0 && (
              <Card className="p-6 border-slate-200">
                <CardHeader className="p-0 pb-3 border-b border-slate-100">
                  <CardTitle className="text-base">Evaluation Rubric</CardTitle>
                </CardHeader>
                <div className="divide-y divide-slate-100 pt-2 flex flex-col gap-1">
                  {assignment.rubric.map((crit) => (
                    <div key={crit.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 text-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-slate-900">{crit.title}</span>
                        <span className="text-slate-500">{crit.description}</span>
                      </div>
                      <Badge variant="neutral" size="sm" className="shrink-0 font-mono">
                        {crit.maxPoints} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* GRADED REVIEW FEEDBACK (If already evaluated) */}
            {assignment.userSubmission?.status === 'GRADED' && (
              <Card className="p-6 border-emerald-200 bg-emerald-50/30">
                <CardHeader className="p-0 pb-3 border-b border-emerald-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base text-emerald-900 flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      Instructor Evaluation & Feedback
                    </CardTitle>
                    <Badge variant="success" size="md">
                      Score: {assignment.userSubmission.marksAwarded} / {assignment.userSubmission.maxMarks}
                    </Badge>
                  </div>
                </CardHeader>
                <div className="pt-4 flex flex-col gap-2 text-xs text-slate-700">
                  <p className="font-semibold text-slate-900">Graded by {assignment.userSubmission.gradedBy} on {assignment.userSubmission.gradedAt}:</p>
                  <blockquote className="p-3 bg-white rounded-xl border border-emerald-200 italic">
                    "{assignment.userSubmission.feedback}"
                  </blockquote>
                </div>
              </Card>
            )}
          </div>

          {/* Right Column: Submission Workspace Dropper */}
          <div className="flex flex-col gap-6">
            <Card className="p-6 border-slate-200 flex flex-col gap-4">
              <CardHeader className="p-0 pb-3 border-b border-slate-100">
                <CardTitle className="text-base">Submission Workspace</CardTitle>
              </CardHeader>

              <Textarea
                label="Student Response & Execution Notes"
                placeholder="Paste code snippets, explain convergence metrics, or add comments for the grader..."
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                disabled={assignment.status === 'GRADED'}
                rows={5}
              />

              {/* Upload Dropzone */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-slate-700">Artifact Attachments</label>
                {assignment.status !== 'GRADED' && (
                  <div
                    onClick={handleMockDrop}
                    className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/70 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center"
                  >
                    <UploadCloud className="w-6 h-6 text-indigo-600 mb-1" />
                    <span className="text-xs font-semibold text-slate-800">
                      Click to attach solution files (.py, .zip, .pdf)
                    </span>
                    <span className="text-[10px] text-slate-400">Prototype file staging</span>
                  </div>
                )}

                {attachedFiles.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    {attachedFiles.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-100 border border-slate-200 text-xs"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span className="font-medium text-slate-800 truncate">{file}</span>
                        </div>
                        {assignment.status !== 'GRADED' && (
                          <button
                            onClick={() => setAttachedFiles((prev) => prev.filter((_, idx) => idx !== i))}
                            className="text-slate-400 hover:text-rose-600 ml-2"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              {assignment.status !== 'GRADED' && (
                <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
                  <Button
                    variant="primary"
                    size="md"
                    leftIcon={Send}
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    Submit Assignment
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={Save}
                    onClick={() => addToast({ title: 'Draft Saved', description: 'Your draft has been saved locally.', type: 'info' })}
                  >
                    Save Draft
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* SUBMISSION CONFIRMATION MODAL */}
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Confirm Final Submission"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                Review Again
              </Button>
              <Button variant="primary" isLoading={isSubmitting} onClick={handleFinalSubmit}>
                Confirm & Submit Lab
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-3 text-xs text-slate-600">
            <p className="text-sm text-slate-900 font-semibold">
              Are you ready to submit your deliverables for "{assignment.title}"?
            </p>
            <p>
              Once submitted, your solution will be locked for grading review. You have attached{' '}
              <strong>{attachedFiles.length} file(s)</strong>.
            </p>
          </div>
        </Modal>
      </div>
    </CourseLayout>
  );
}
