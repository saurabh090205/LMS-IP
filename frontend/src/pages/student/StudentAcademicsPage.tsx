import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  BookOpen,
  User,
  Clock,
  Award,
  ChevronRight,
  FileText,
  Video,
  Download,
  CheckCircle2,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SubjectAcademicData {
  id: string;
  code: string;
  name: string;
  faculty: string;
  credits: number;
  theoryHours: number;
  labHours: number;
  syllabusCoverage: number;
  attendancePercent: number;
  gradeScore: string;
  units: { number: string; title: string; topicsCount: number; status: 'Completed' | 'In Progress' | 'Upcoming' }[];
  textbook: string;
}

const subjectsList: SubjectAcademicData[] = [
  {
    id: 'ci3001',
    code: 'CI3001',
    name: 'Deep Learning',
    faculty: 'Dr. Elena Rostova',
    credits: 4.0,
    theoryHours: 42,
    labHours: 28,
    syllabusCoverage: 68,
    attendancePercent: 94.2,
    gradeScore: 'O (Outstanding)',
    textbook: 'Deep Learning — Ian Goodfellow, Yoshua Bengio (MIT Press)',
    units: [
      { number: 'Unit I', title: 'Foundations of Deep Neural Networks & Backpropagation', topicsCount: 6, status: 'Completed' },
      { number: 'Unit II', title: 'Convolutional Neural Networks (CNN) & Computer Vision', topicsCount: 8, status: 'Completed' },
      { number: 'Unit III', title: 'Recurrent Neural Networks (RNN) & Sequence Modeling', topicsCount: 7, status: 'In Progress' },
      { number: 'Unit IV', title: 'Transformers & Self-Attention Architectures', topicsCount: 8, status: 'Upcoming' },
      { number: 'Unit V', title: 'Deep Generative Models (VAEs & Diffusion Models)', topicsCount: 6, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Edge Deployment, Quantization & Model Optimization', topicsCount: 5, status: 'Upcoming' },
    ],
  },
  {
    id: 'ci3202',
    code: 'CI3202',
    name: 'Operating System',
    faculty: 'Dr. Anita Deshmukh',
    credits: 4.0,
    theoryHours: 40,
    labHours: 24,
    syllabusCoverage: 72,
    attendancePercent: 91.0,
    gradeScore: 'A+ (Excellent)',
    textbook: 'Operating System Concepts — Silberschatz, Galvin & Gagne',
    units: [
      { number: 'Unit I', title: 'OS Structures & System Calls', topicsCount: 5, status: 'Completed' },
      { number: 'Unit II', title: 'Processes, CPU Scheduling & Multithreading', topicsCount: 7, status: 'Completed' },
      { number: 'Unit III', title: 'Process Synchronization & Deadlocks', topicsCount: 6, status: 'Completed' },
      { number: 'Unit IV', title: 'Memory Management, Paging & Virtual Memory', topicsCount: 6, status: 'In Progress' },
      { number: 'Unit V', title: 'Storage Management, File Systems & I/O', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Protection, Security & Virtualization', topicsCount: 4, status: 'Upcoming' },
    ],
  },
  {
    id: 'ci3003d',
    code: 'CI3003D',
    name: 'MLOPS (Machine Learning Operations)',
    faculty: 'Prof. Rajesh Kulkarni',
    credits: 4.0,
    theoryHours: 38,
    labHours: 28,
    syllabusCoverage: 62,
    attendancePercent: 93.5,
    gradeScore: 'A+ (Excellent)',
    textbook: 'Introducing MLOps — Mark Treveil et al. (O’Reilly)',
    units: [
      { number: 'Unit I', title: 'ML Lifecycle & Reproducibility Principles', topicsCount: 5, status: 'Completed' },
      { number: 'Unit II', title: 'Data Pipelines, Feature Stores & DVC', topicsCount: 6, status: 'Completed' },
      { number: 'Unit III', title: 'Model Packaging, Docker & FastAPI Serving', topicsCount: 7, status: 'In Progress' },
      { number: 'Unit IV', title: 'CI/CD Pipelines for ML with GitHub Actions & CML', topicsCount: 6, status: 'Upcoming' },
      { number: 'Unit V', title: 'Model Monitoring, Data Drift & Prometheus', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Kubeflow & Scalable Distributed Workflows', topicsCount: 5, status: 'Upcoming' },
    ],
  },
  {
    id: 'ci3203b',
    code: 'CI3203B',
    name: 'Distributed and Federated Learning',
    faculty: 'Dr. Sameer Joshi',
    credits: 4.0,
    theoryHours: 36,
    labHours: 20,
    syllabusCoverage: 55,
    attendancePercent: 88.0,
    gradeScore: 'A (Very Good)',
    textbook: 'Federated Learning — Qiang Yang et al.',
    units: [
      { number: 'Unit I', title: 'Distributed Systems Foundations for Machine Learning', topicsCount: 5, status: 'Completed' },
      { number: 'Unit II', title: 'Data Parallelism & Parameter Server Frameworks', topicsCount: 6, status: 'In Progress' },
      { number: 'Unit III', title: 'Federated Optimization & FedAvg Algorithm', topicsCount: 6, status: 'Upcoming' },
      { number: 'Unit IV', title: 'Privacy Preservation, Differential Privacy & Secure Aggregation', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit V', title: 'Edge Hardware Constraints & Communication Compression', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Cross-Silo & Cross-Device Industrial Case Studies', topicsCount: 4, status: 'Upcoming' },
    ],
  },
  {
    id: 'ci3203a',
    code: 'CI3203A',
    name: 'Ethical and Responsible AI',
    faculty: 'Dr. Neha Patil',
    credits: 4.0,
    theoryHours: 36,
    labHours: 16,
    syllabusCoverage: 80,
    attendancePercent: 96.0,
    gradeScore: 'O (Outstanding)',
    textbook: 'Weapons of Math Destruction — Cathy O’Neil',
    units: [
      { number: 'Unit I', title: 'Moral Philosophy & AI System Governance', topicsCount: 5, status: 'Completed' },
      { number: 'Unit II', title: 'Algorithmic Bias, Fairness Metrics & Audits', topicsCount: 6, status: 'Completed' },
      { number: 'Unit III', title: 'Explainable AI (XAI): SHAP, LIME & Integrated Gradients', topicsCount: 7, status: 'Completed' },
      { number: 'Unit IV', title: 'Privacy Regulations (GDPR, EU AI Act & India DPDP)', topicsCount: 5, status: 'In Progress' },
      { number: 'Unit V', title: 'Societal Impact, Deepfakes & Watermarking', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Responsible AI Deployment Life Cycle in Enterprise', topicsCount: 4, status: 'Upcoming' },
    ],
  },
  {
    id: 'ci3203c',
    code: 'CI3203C',
    name: 'Information Security',
    faculty: 'Prof. Amit Verma',
    credits: 4.0,
    theoryHours: 38,
    labHours: 20,
    syllabusCoverage: 60,
    attendancePercent: 91.5,
    gradeScore: 'A (Very Good)',
    textbook: 'Cryptography and Network Security — William Stallings',
    units: [
      { number: 'Unit I', title: 'Security Architecture, Threat Modeling & Attacks', topicsCount: 5, status: 'Completed' },
      { number: 'Unit II', title: 'Symmetric & Asymmetric Cryptography (AES, RSA, ECC)', topicsCount: 7, status: 'Completed' },
      { number: 'Unit III', title: 'Hashes, MACs, Digital Signatures & Public Key Infrastructure', topicsCount: 6, status: 'In Progress' },
      { number: 'Unit IV', title: 'Network Security Protocols (TLS, IPsec & Zero Trust)', topicsCount: 6, status: 'Upcoming' },
      { number: 'Unit V', title: 'Software Vulnerabilities (OWASP Top 10 & Memory Exploits)', topicsCount: 5, status: 'Upcoming' },
      { number: 'Unit VI', title: 'Security Auditing, Compliance & Incident Response', topicsCount: 4, status: 'Upcoming' },
    ],
  },
];

export default function StudentAcademicsPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<SubjectAcademicData>(subjectsList[0]);

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              AY 2026-27 • Module V Core Curriculum
            </span>
            <span className="text-xs text-[#6B756F]">B.Tech CSE (AI)</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Academic Curriculum & Syllabus
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Vishwakarma Institute of Technology, Pune • Autonomous Affiliated with SPPU
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              addToast({
                title: 'Downloading Syllabus PDF',
                description: 'Exporting official VIT B.Tech CSE (AI) AY 2026-27 curriculum specification...',
                type: 'info',
              });
            }}
            className="px-4 py-2 rounded-xl border border-[#E5EBE7] bg-white hover:bg-slate-50 text-xs font-bold text-[#18221D] transition-colors flex items-center gap-1.5 cursor-pointer shadow-subtle"
          >
            <Download className="w-4 h-4 text-[#36B875]" />
            <span>Download Full Syllabus</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subjects Grid (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#6B756F] px-1">
            Enrolled Core Subjects (6 Courses • 24.0 Credits)
          </h2>

          <div className="space-y-3">
            {subjectsList.map((sub) => {
              const isSelected = selectedSubject.id === sub.id;
              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubject(sub)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EFF9F3] border-[#36B875] shadow-xs ring-1 ring-[#36B875]'
                      : 'bg-white border-[#E5EBE7] hover:border-slate-300 shadow-subtle'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-[#18794E] bg-white px-2 py-0.5 rounded-md border border-[#B0E7CB]">
                          {sub.code}
                        </span>
                        <span className="text-xs font-bold text-[#18221D]">{sub.name}</span>
                      </div>
                      <p className="text-[11px] text-[#6B756F] mt-1 flex items-center gap-1">
                        <User className="w-3 h-3" /> {sub.faculty}
                      </p>
                    </div>

                    <span className="text-xs font-extrabold text-[#18794E]">
                      {sub.credits} Credits
                    </span>
                  </div>

                  {/* Syllabus progress bar */}
                  <div className="mt-3 pt-2.5 border-t border-[#E5EBE7]/60">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#6B756F]">Syllabus Coverage</span>
                      <span className="font-bold text-[#18221D]">{sub.syllabusCoverage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#36B875] h-full rounded-full transition-all duration-300"
                        style={{ width: `${sub.syllabusCoverage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Subject Details & Units (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5EBE7]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-md bg-[#EFF9F3] text-[#18794E] text-xs font-bold">
                  {selectedSubject.code}
                </span>
                <h3 className="text-xl font-extrabold text-[#18221D]">{selectedSubject.name}</h3>
              </div>
              <p className="text-xs text-[#6B756F]">Course Coordinator: <strong>{selectedSubject.faculty}</strong></p>
            </div>

            <button
              onClick={() => navigate(`/student/courses`)}
              className="px-3.5 py-1.5 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-xs transition-colors self-start flex items-center gap-1 cursor-pointer"
            >
              <span>Learning Materials</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-[#F6F8F7] p-3 rounded-2xl">
              <span className="text-[10px] text-[#6B756F] uppercase font-bold block">Lecture Hours</span>
              <span className="text-sm font-bold text-[#18221D]">{selectedSubject.theoryHours} Th + {selectedSubject.labHours} Lab</span>
            </div>
            <div className="bg-[#F6F8F7] p-3 rounded-2xl">
              <span className="text-[10px] text-[#6B756F] uppercase font-bold block">Attendance</span>
              <span className="text-sm font-bold text-[#18794E]">{selectedSubject.attendancePercent}%</span>
            </div>
            <div className="bg-[#F6F8F7] p-3 rounded-2xl">
              <span className="text-[10px] text-[#6B756F] uppercase font-bold block">Current Grade</span>
              <span className="text-sm font-bold text-amber-600">{selectedSubject.gradeScore.split(' ')[0]}</span>
            </div>
          </div>

          {/* Prescribed Textbook */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-xs">
            <span className="font-bold text-amber-900 block mb-0.5">Prescribed Textbook & References:</span>
            <span className="text-amber-800">{selectedSubject.textbook}</span>
          </div>

          {/* Units and Chapters List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B756F] mb-3">
              Course Structure & Unit Plan
            </h4>

            <div className="space-y-2.5">
              {selectedSubject.units.map((unit, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-[#E5EBE7] flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#EFF9F3] text-[#18794E] font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-[#18221D]">{unit.number}: {unit.title}</h5>
                      <span className="text-[11px] text-[#6B756F]">{unit.topicsCount} Lecture Modules</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      unit.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : unit.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
