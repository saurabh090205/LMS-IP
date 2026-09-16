import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Sparkles,
  BookOpen,
  Users,
  Compass,
  Award,
  ArrowRight,
  Shield,
  Layers,
  Cpu,
  Globe2,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/auth';

export default function LandingPage() {
  const { loginAs } = useAuth();
  const navigate = useNavigate();

  const handleQuickEnter = (role: UserRole) => {
    loginAs(role);
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 tracking-tight leading-none">
                Shreenil
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase mt-0.5">
                Virtual University & Ecosystem
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#ecosystem" className="hover:text-slate-900 transition-colors">Ecosystem</a>
            <a href="#pillars" className="hover:text-slate-900 transition-colors">Academic Pillars</a>
            <a href="#roles" className="hover:text-slate-900 transition-colors">Role Experiences</a>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleQuickEnter('student')}
            >
              Explore Campus
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-First Virtual University & Life Growth Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight max-w-4xl leading-[1.15]">
            Where Virtual Higher Learning Meets{' '}
            <span className="text-indigo-600">Whole-Life Excellence</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            Shreenil combines world-class curriculum, adaptive digital twins, immersive research laboratories, entrepreneurship hubs, and parental engagement into one unified academic ecosystem.
          </p>

          {/* Role Instant Access Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center max-w-2xl" id="roles">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto"
              rightIcon={ArrowRight}
              onClick={() => handleQuickEnter('student')}
            >
              Enter as Student
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => handleQuickEnter('teacher')}
            >
              Enter as Faculty
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleQuickEnter('parent')}
            >
              Parent Portal
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => handleQuickEnter('admin')}
            >
              Admin Suite
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 w-full max-w-4xl border-t border-slate-200/80 pt-10 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">3,400+</div>
              <div className="text-xs text-slate-500 mt-0.5">Global Scholars</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">140+</div>
              <div className="text-xs text-slate-500 mt-0.5">Virtual Courses & Labs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">98.4%</div>
              <div className="text-xs text-slate-500 mt-0.5">Cohort Engagement</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 mt-0.5">Cloud-First Accreditation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Pillars Section */}
      <section id="pillars" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">
              Comprehensive Growth Architecture
            </h2>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              More Than An LMS. A Complete Life University.
            </h3>
            <p className="text-sm text-slate-500 mt-3">
              Designed from first principles to foster intellectual mastery, entrepreneurial venture, athletic vigor, and deep parent-faculty collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="ecosystem">
            <Card className="p-6 flex flex-col gap-4 border-slate-200 hover:border-indigo-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Academic & Virtual Classrooms</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Structured course management, contextual syllabi, interactive grading, and high-fidelity video lecture auditoriums with collaborative whiteboards.
              </p>
            </Card>

            <Card className="p-6 flex flex-col gap-4 border-slate-200 hover:border-indigo-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Digital Twin & Personalization</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Continuous learning diagnostics that adapt pacing, suggest customized research literature, and recommend skill pathways based on individual curiosity.
              </p>
            </Card>

            <Card className="p-6 flex flex-col gap-4 border-slate-200 hover:border-indigo-200 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Globe2 className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Research & Venture Incubation</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Collaborative digital labs linking peer researchers, faculty mentors, institutional patent resources, and student-led startup ventures.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-10 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Shreenil.com</span>
            <span>— Virtual University & Life Growth Ecosystem © 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/student/dashboard" className="hover:text-slate-900">Student</Link>
            <Link to="/teacher/dashboard" className="hover:text-slate-900">Faculty</Link>
            <Link to="/parent/dashboard" className="hover:text-slate-900">Parent</Link>
            <Link to="/admin/dashboard" className="hover:text-slate-900">Admin</Link>
            <Link to="/settings" className="hover:text-slate-900">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
