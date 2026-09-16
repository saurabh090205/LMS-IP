import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { reportCardApi } from '../../services/api/reportCardApi';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Award, Download, CheckCircle2, TrendingUp, BookOpen } from 'lucide-react';
import type { ReportCardResponse, GradeRecordResponse } from '../../types/api';

export default function StudentReportCardPage() {
  const { data: reportCard, isLoading } = useQuery<ReportCardResponse>({
    queryKey: ['student-report-card'],
    queryFn: reportCardApi.getMyReportCard,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#E7E7F0]">
        <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-[#5B5875]">Loading academic report card...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              Official Transcript
            </span>
            <Badge variant="neutral" className="text-xs">
              AY {reportCard?.academicYear || '2026-27'}
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight mt-2">
            Academic Performance & Report Card
          </h1>
          <p className="text-sm text-[#5B5875] mt-1">
            {reportCard?.studentName} • {reportCard?.enrollmentNumber} • Semester {reportCard?.semesterNumber}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-3xl font-black text-indigo-600">{reportCard?.cumulativeGpa?.toFixed(2) || '8.92'}</div>
            <div className="text-xs text-[#5B5875]">Cumulative GPA</div>
          </div>
        </div>
      </div>

      {/* GPA & Credit Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#5B5875]">Semester SGPA</p>
              <h3 className="text-2xl font-bold text-[#1E1B4B] mt-1">{reportCard?.semesterGpa?.toFixed(2) || '8.92'}</h3>
              <span className="text-[11px] text-emerald-600 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-3 h-3" /> Top 5% in cohort
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Award className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#5B5875]">Credits Earned</p>
              <h3 className="text-2xl font-bold text-[#1E1B4B] mt-1">{reportCard?.totalCreditsEarned || '22.0'}</h3>
              <span className="text-[11px] text-slate-500 mt-0.5">Module V Requirements</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#5B5875]">Standing</p>
              <h3 className="text-2xl font-bold text-indigo-700 mt-1">First Class Dist.</h3>
              <span className="text-[11px] text-slate-500 mt-0.5">Autonomous Evaluation</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evaluations Table */}
      <Card className="border-[#E7E7F0] bg-white">
        <CardHeader className="pb-3 flex flex-row items-center justify-between">
          <CardTitle className="text-base text-[#1E1B4B]">Course-Wise Assessment Summary</CardTitle>
          <Button variant="outline" size="sm" className="text-xs gap-1.5 border-[#E7E7F0]">
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            Download PDF
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8F8FC] border-y border-[#E7E7F0] text-[#5B5875] font-semibold">
                  <th className="p-4">Course Code & Title</th>
                  <th className="p-4">Assessment Name</th>
                  <th className="p-4 text-center">Score</th>
                  <th className="p-4 text-center">Percentage</th>
                  <th className="p-4 text-center">Grade</th>
                  <th className="p-4 text-center">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F1F7]">
                {reportCard?.detailedAssessments && reportCard.detailedAssessments.length > 0 ? (
                  reportCard.detailedAssessments.map((grade: GradeRecordResponse) => (
                    <tr key={grade.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-[#1E1B4B]">{grade.courseCode}</div>
                        <div className="text-[#5B5875]">{grade.courseTitle}</div>
                      </td>
                      <td className="p-4 text-[#1E1B4B] font-medium">{grade.assessmentName}</td>
                      <td className="p-4 text-center font-bold text-[#1E1B4B]">
                        {grade.marksObtained} / {grade.maxMarks}
                      </td>
                      <td className="p-4 text-center text-emerald-600 font-bold">{grade.percentage}%</td>
                      <td className="p-4 text-center">
                        <Badge
                          variant={grade.letterGrade?.startsWith('A') ? 'success' : 'info'}
                          className="text-xs font-bold"
                        >
                          {grade.letterGrade}
                        </Badge>
                      </td>
                      <td className="p-4 text-center font-bold text-[#1E1B4B]">{grade.gradePoints}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-[#5B5875]">
                      No grade records available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
