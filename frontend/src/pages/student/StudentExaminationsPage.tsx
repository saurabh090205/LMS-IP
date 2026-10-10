import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Clock,
  Printer,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  Download,
  Building,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { studentPortalService } from '../../services/studentPortalService';

export default function StudentExaminationsPage() {
  const { addToast } = useToast();
  const profile = studentPortalService.getProfile();
  const exams = studentPortalService.getExams();

  const [activeTab, setActiveTab] = useState<'UPCOMING' | 'PUBLISHED'>('PUBLISHED');
  const [selectedTerm, setSelectedTerm] = useState('AY 2026-27 (Sem V)');
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);

  const upcomingExams = exams.filter((e) => e.status === 'Upcoming');
  const publishedExams = exams.filter((e) => e.status === 'Published');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              Autonomous Examination Authority
            </span>
            <span className="text-xs text-[#6B756F]">VIT Pune COE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Examinations & Academic Results
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Official Mid-Sem, In-Sem assessments, evaluated gradebooks, and verified transcript records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsReportCardOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Official Report Card</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E5EBE7] pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('PUBLISHED')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'PUBLISHED'
                ? 'bg-[#36B875] text-white shadow-xs'
                : 'bg-white text-[#6B756F] hover:bg-slate-50 border border-[#E5EBE7]'
            }`}
          >
            Evaluated Results ({publishedExams.length})
          </button>
          <button
            onClick={() => setActiveTab('UPCOMING')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'UPCOMING'
                ? 'bg-[#36B875] text-white shadow-xs'
                : 'bg-white text-[#6B756F] hover:bg-slate-50 border border-[#E5EBE7]'
            }`}
          >
            Upcoming Schedule ({upcomingExams.length})
          </button>
        </div>

        <select
          value={selectedTerm}
          onChange={(e) => setSelectedTerm(e.target.value)}
          className="text-xs font-semibold text-[#6B756F] bg-white border border-[#E5EBE7] rounded-xl px-3 py-2 outline-none shadow-subtle"
        >
          <option value="AY 2026-27 (Sem V)">AY 2026-27 • Semester V (Current)</option>
          <option value="AY 2025-26 (Sem IV)">AY 2025-26 • Semester IV</option>
          <option value="AY 2025-26 (Sem III)">AY 2025-26 • Semester III</option>
        </select>
      </div>

      {/* PUBLISHED RESULTS VIEW */}
      {activeTab === 'PUBLISHED' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#E5EBE7] overflow-hidden shadow-card">
            <div className="p-4 bg-slate-50/60 border-b border-[#E5EBE7] flex items-center justify-between">
              <span className="text-xs font-bold text-[#18221D]">Published Evaluation Records</span>
              <span className="text-[11px] text-[#18794E] font-semibold bg-[#EFF9F3] px-2 py-0.5 rounded-md">
                All Marks Formally Moderated & Signed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F6F8F7] text-[#6B756F] border-b border-[#E5EBE7] uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Course Code & Name</th>
                    <th className="px-5 py-3">Evaluation Type</th>
                    <th className="px-5 py-3">Exam Date</th>
                    <th className="px-5 py-3 text-center">Score / Max</th>
                    <th className="px-5 py-3 text-center">Grade</th>
                    <th className="px-5 py-3">Faculty Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5EBE7]">
                  {publishedExams.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-4 font-bold text-[#18221D]">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-[#EFF9F3] text-[#18794E] font-mono text-[11px]">
                            {item.courseCode}
                          </span>
                          <span>{item.courseName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-[#6B756F] font-medium">{item.examType}</td>
                      <td className="px-5 py-4 text-[#6B756F]">{item.date}</td>
                      <td className="px-5 py-4 text-center font-bold text-[#18221D]">
                        {item.marksObtained} / {item.maxMarks}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#EFF9F3] text-[#18794E] border border-[#B0E7CB]">
                          {item.grade}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#6B756F] italic">{item.facultyRemarks || 'Satisfactory performance.'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* UPCOMING EXAMS VIEW */}
      {activeTab === 'UPCOMING' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-white p-5 rounded-3xl border border-[#E5EBE7] shadow-card hover:border-[#B0E7CB] transition-all space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#18794E] bg-[#EFF9F3] px-2 py-0.5 rounded">
                      {exam.courseCode}
                    </span>
                    <h3 className="text-sm font-bold text-[#18221D]">{exam.courseName}</h3>
                  </div>
                  <p className="text-xs text-[#6B756F] mt-1 font-semibold">{exam.examType}</p>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {exam.maxMarks} Marks
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#F6F8F7] p-3 rounded-2xl text-[#6B756F]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#36B875]" />
                  <span>{exam.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#36B875]" />
                  <span>{exam.time}</span>
                </div>
                <div className="col-span-2 flex items-center gap-1.5 pt-1 border-t border-[#E5EBE7]/50">
                  <Building className="w-3.5 h-3.5 text-[#36B875]" />
                  <span className="text-[#18221D] font-medium">Venue: {exam.venue}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-400 font-mono text-[11px]">Seat Allotment: Assigned Hall Desk</span>
                <span className="text-xs font-bold text-[#36B875]">Admit Card Verified</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OFFICIAL REPORT CARD PRINT MODAL */}
      {isReportCardOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl border border-[#E5EBE7] shadow-2xl p-6 sm:p-8 space-y-6 my-8">
            {/* Report Card Header */}
            <div className="text-center pb-4 border-b-2 border-slate-900">
              <div className="flex items-center justify-center gap-2 mb-1">
                <GraduationCap className="w-7 h-7 text-[#18794E]" />
                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  Vishwakarma Institute of Technology, Pune
                </h2>
              </div>
              <p className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">
                Autonomous Institute Affiliated to Savitribai Phule Pune University
              </p>
              <h3 className="text-sm font-bold text-slate-800 mt-2 underline">
                OFFICIAL GRADE REPORT CARD & EVALUATION RECORD
              </h3>
            </div>

            {/* Student Bio Strip */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Candidate Name</span>
                <strong className="text-slate-900">{profile.fullName}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Registration Roll No.</span>
                <strong className="text-slate-900">{profile.rollNumber} ({profile.admissionNumber})</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Program / Specialization</span>
                <span className="text-slate-800 font-medium">{profile.degreeProgram}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Academic Period</span>
                <span className="text-slate-800 font-medium">AY 2026-27 • Semester V</span>
              </div>
            </div>

            {/* Evaluation Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Course Code</th>
                    <th className="p-2.5">Course Name</th>
                    <th className="p-2.5 text-center">Marks</th>
                    <th className="p-2.5 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {publishedExams.map((e) => (
                    <tr key={e.id}>
                      <td className="p-2.5 font-mono font-bold text-slate-900">{e.courseCode}</td>
                      <td className="p-2.5 text-slate-800">{e.courseName}</td>
                      <td className="p-2.5 text-center font-bold">{e.marksObtained} / {e.maxMarks}</td>
                      <td className="p-2.5 text-center font-black text-emerald-700">{e.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary Statistics */}
            <div className="flex items-center justify-between text-xs p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div>
                <span className="text-emerald-800 font-semibold block text-[11px]">Cumulative Grade Point Average (CGPA)</span>
                <span className="text-xl font-black text-emerald-900">{profile.cgpa} / 10.0</span>
              </div>
              <div className="text-right">
                <span className="text-emerald-800 font-semibold block text-[11px]">Result Status</span>
                <span className="text-sm font-bold text-emerald-900 uppercase">First Class with Distinction</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-[10px] text-slate-400 font-mono">Digitally signed & hashed via Shreenil Academic Twin.</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsReportCardOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
