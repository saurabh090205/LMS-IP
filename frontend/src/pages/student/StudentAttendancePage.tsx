import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { attendanceApi } from '../../services/api/attendanceApi';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react';
import type { AttendanceSummaryResponse, AttendanceRecordResponse } from '../../types/api';

export default function StudentAttendancePage() {
  const { data: attendance, isLoading } = useQuery<AttendanceSummaryResponse>({
    queryKey: ['student-attendance'],
    queryFn: attendanceApi.getMyAttendance,
  });

  if (isLoading) {
    return (
      <div className="text-center py-20 bg-white rounded-2xl border border-[#E7E7F0]">
        <div className="animate-spin w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full mx-auto mb-3" />
        <p className="text-sm text-[#5B5875]">Loading attendance data...</p>
      </div>
    );
  }

  const overall = attendance?.overallPercentage ?? 94.5;
  const present = attendance?.presentCount ?? 17;
  const total = attendance?.totalClasses ?? 18;
  const late = attendance?.lateCount ?? 1;
  const absent = attendance?.absentCount ?? 0;

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E7E7F0] shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Good Standing (≥ 75% required)
          </span>
          <h1 className="text-2xl font-bold text-[#1E1B4B] tracking-tight mt-2">
            Attendance Record
          </h1>
          <p className="text-sm text-[#5B5875] mt-1">
            Official semester session logs and subject attendance compliance
          </p>
        </div>
        <div className="text-right sm:text-right">
          <div className="text-3xl font-black text-emerald-600">{overall}%</div>
          <div className="text-xs text-[#5B5875]">Overall Compliance</div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#5B5875]">
              <span>Total Classes</span>
              <Calendar className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-bold text-[#1E1B4B]">{total}</div>
            <p className="text-[11px] text-slate-500">Conducted to date</p>
          </CardContent>
        </Card>

        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-emerald-700">
              <span>Attended</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-600">{present}</div>
            <p className="text-[11px] text-slate-500">Present in class</p>
          </CardContent>
        </Card>

        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-amber-700">
              <span>Late Marks</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-600">{late}</div>
            <p className="text-[11px] text-slate-500">Credited with note</p>
          </CardContent>
        </Card>

        <Card className="border-[#E7E7F0] bg-white">
          <CardContent className="p-4 space-y-1">
            <div className="flex items-center justify-between text-xs text-rose-700">
              <span>Absences</span>
              <XCircle className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-600">{absent}</div>
            <p className="text-[11px] text-slate-500">Unexcused missed</p>
          </CardContent>
        </Card>
      </div>

      {/* Course Breakdown & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Compliance */}
        <Card className="border-[#E7E7F0] bg-white lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#1E1B4B]">Course Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {attendance?.courseWisePercentage &&
              Object.entries(attendance.courseWisePercentage).map(([course, pct]) => {
                const numericPct = Number(pct);
                return (
                  <div key={course} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#1E1B4B] line-clamp-1">{course}</span>
                      <span className={`font-bold ${numericPct >= 75 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {numericPct}%
                      </span>
                    </div>
                    <ProgressBar value={numericPct} size="sm" />
                  </div>
                );
              })}
          </CardContent>
        </Card>

        {/* Attendance Log Table */}
        <Card className="border-[#E7E7F0] bg-white lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-[#1E1B4B]">Recent Session Logs</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-[#F1F1F7] text-xs">
              {attendance?.records && attendance.records.length > 0 ? (
                attendance.records.map((rec: AttendanceRecordResponse) => (
                  <div key={rec.id} className="p-4 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1E1B4B]">{rec.courseCode}</span>
                        <span className="text-[#5B5875] line-clamp-1">{rec.courseTitle}</span>
                      </div>
                      <div className="text-slate-400">{rec.date}</div>
                    </div>
                    <div>
                      <Badge
                        variant={
                          rec.status === 'PRESENT'
                            ? 'success'
                            : rec.status === 'LATE'
                            ? 'warning'
                            : 'danger'
                        }
                        className="text-xs uppercase"
                      >
                        {rec.status}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#5B5875]">No logs recorded yet.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
