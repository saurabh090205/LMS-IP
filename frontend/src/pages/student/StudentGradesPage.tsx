import React, { useState, useEffect } from 'react';
import {
  Award,
  BookOpen,
  Download,
  CheckCircle,
  FileText,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';
import { gradeService } from '../../services/gradeService';
import { StudentCourseGradeRecord } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { useToast } from '../../context/ToastContext';

export default function StudentGradesPage() {
  const [gradeRecords, setGradeRecords] = useState<StudentCourseGradeRecord[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    loadGrades();
  }, []);

  const loadGrades = async () => {
    const list = await gradeService.getStudentGradeRecords();
    setGradeRecords(list);
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <PageHeader
        title="Academic Transcripts & Grades"
        subtitle="Official term transcript, detailed per-assessment point breakdowns, weightings, and faculty review notes."
        breadcrumbs={[
          { label: 'Student Portal', href: '/student/dashboard' },
          { label: 'Grades', isCurrent: true },
        ]}
        actions={
          <Button
            size="sm"
            variant="outline"
            leftIcon={Download}
            onClick={() => addToast({ title: 'Transcript Downloaded', description: 'Generated PDF grade report.', type: 'info' })}
          >
            Download Official Transcript (PDF)
          </Button>
        }
      />

      {/* High-Level GPA Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-5 flex items-center justify-between border-[#E7E7F0]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase">Cumulative GPA</span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-800">3.92 / 4.00</span>
            <span className="text-[11px] text-[#065F46] font-medium mt-0.5">Top 5% Cohort Standing</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#EEF0FF] text-[#4F46E5] border border-[#D0D7FF] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-[#E7E7F0]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Completed Units</span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-800">15 Credits</span>
            <span className="text-[11px] text-slate-400 mt-0.5">Fall 2026 Term</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E7DFFF] text-[#5B21B6] border border-[#DDD6FE] flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between border-[#E7E7F0]">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase">Academic Standing</span>
            <span className="text-xl sm:text-2xl font-semibold text-slate-800">Dean's List</span>
            <span className="text-[11px] text-[#065F46] font-medium mt-0.5">Satisfactory Progress</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#DDF4EA] text-[#065F46] border border-[#A7F3D0] flex items-center justify-center">
            <CheckCircle className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Course-by-Course Grade Tables */}
      <div className="flex flex-col gap-6">
        {gradeRecords.map((rec) => (
          <Card key={rec.courseId} className="border-[#E7E7F0] overflow-hidden">
            <div className="p-4 bg-[#F6F6FB]/80 border-b border-[#E7E7F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[#4F46E5] bg-white px-2.5 py-1 rounded-lg border border-[#E7E7F0]">
                  {rec.courseCode}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">{rec.courseTitle}</h3>
                  <p className="text-xs text-slate-400">Instructor: {rec.instructorName} • {rec.credits} Credits</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-slate-500">Current Average: {rec.currentPercentage}%</span>
                <Badge variant="primary" size="lg" className="font-semibold">
                  Grade: {rec.letterGrade}
                </Badge>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Weight</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Percentage</TableHead>
                  <TableHead>Feedback Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rec.assessments.map((a) => {
                  const pct = a.maxScore > 0 ? Math.round((a.score / a.maxScore) * 100) : 0;
                  return (
                    <TableRow key={a.id}>
                      <TableCell className="font-semibold text-slate-900 text-xs">
                        {a.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant={a.type === 'assignment' ? 'primary' : 'warning'} size="sm">
                          {a.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">{a.weightagePercent || 15}%</TableCell>
                      <TableCell className="font-mono text-xs">
                        {a.score} / {a.maxScore}
                      </TableCell>
                      <TableCell className="font-semibold text-xs text-slate-800">{pct}%</TableCell>
                      <TableCell className="text-xs text-slate-600 italic max-w-xs truncate">
                        {a.feedback || 'Evaluated.'}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        ))}
      </div>
    </div>
  );
}
