import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
  BookOpen,
  Users,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types/auth';

export default function LoginPage() {
  const { loginAs } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('aarav.sharma@shreenil.edu');
  const [password, setPassword] = useState('Shreenil@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const roleCredentials: Record<UserRole, { email: string; name: string; label: string; icon: typeof BookOpen }> = {
    student: {
      email: 'aarav.sharma@shreenil.edu',
      name: 'Aarav Sharma',
      label: 'Student Portal',
      icon: BookOpen,
    },
    teacher: {
      email: 'elena.rostova@shreenil.edu',
      name: 'Dr. Elena Rostova',
      label: 'Faculty Portal',
      icon: GraduationCap,
    },
    parent: {
      email: 'vikram.sharma@gmail.com',
      name: 'Vikram Sharma',
      label: 'Parent Portal',
      icon: Users,
    },
    admin: {
      email: 'dean.pendelton@shreenil.edu',
      name: 'Dean Arthur Pendelton',
      label: 'Administrator',
      icon: Shield,
    },
  };

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r);
    setEmail(roleCredentials[r].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({
        title: 'Validation Error',
        description: 'Please enter both your academic email and password.',
        type: 'warning',
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      loginAs(selectedRole);
      setIsLoading(false);
      addToast({
        title: 'Welcome to Shreenil!',
        description: `Signed in as ${roleCredentials[selectedRole].name} (${roleCredentials[selectedRole].label})`,
        type: 'success',
      });
      navigate(`/${selectedRole}/dashboard`);
    }, 400);
  };

  const handleSocialLogin = (provider: string) => {
    addToast({
      title: `${provider} SSO Simulation`,
      description: `Authenticating with institutional ${provider} Single Sign-On...`,
      type: 'info',
    });
    setTimeout(() => {
      loginAs('student');
      navigate('/student/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col lg:flex-row antialiased selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* LEFT SPLIT: Chalkboard Reference Artwork */}
      <div className="relative hidden lg:flex lg:w-1/2 bg-[#1C332A] flex-col justify-between p-12 overflow-hidden text-white/90 select-none">
        {/* Subtle chalkboard math formulas & diagrams pattern */}
        <div className="absolute inset-0 opacity-25 pointer-events-none font-mono text-xs">
          <div className="absolute top-12 left-12">2x⁴ + ry³ = b²</div>
          <div className="absolute top-16 right-20">4π(l + ct)</div>
          <div className="absolute top-44 left-16 text-sm">√(a·b) / x²</div>
          <div className="absolute top-52 right-32 text-base">E = ½mv²</div>
          <div className="absolute top-80 left-20">2e⁻¹⁰</div>
          <div className="absolute top-72 right-16">E = π√2</div>
          <div className="absolute bottom-48 left-16">F_net = m² + 2πX</div>
          <div className="absolute bottom-56 right-24">E - z(A) = m</div>
          
          {/* Geometric sketches */}
          <svg className="absolute top-20 right-48 w-24 h-24 stroke-white/40 fill-none" viewBox="0 0 100 100">
            <polygon points="50,10 90,90 10,90" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="50" cy="55" r="25" strokeWidth="1" />
          </svg>
          <svg className="absolute bottom-64 left-44 w-32 h-20 stroke-white/40 fill-none" viewBox="0 0 120 80">
            <ellipse cx="60" cy="40" rx="50" ry="25" strokeWidth="1.5" />
            <line x1="10" y1="40" x2="110" y2="40" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>

        {/* Top Branding Pill */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#36B875] text-white shadow-mint">
            <GraduationCap className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white">Shreenil</span>
            <span className="block text-[11px] font-medium tracking-wider text-[#A7F3D0] uppercase">
              Virtual University Ecosystem
            </span>
          </div>
        </div>

        {/* Center Prominent Emblem & Logo (matching Reference 2) */}
        <div className="relative z-10 my-auto text-center flex flex-col items-center justify-center">
          <div className="w-28 h-28 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl mb-6">
            <GraduationCap className="w-16 h-16 text-white stroke-[1.8]" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Shreenil
          </h1>
          <p className="text-sm text-emerald-100/80 max-w-sm text-center leading-relaxed font-sans">
            One Digital Twin. One Lifetime Learning Journey. Comprehensive higher-education portal for students, faculty & parents.
          </p>
        </div>

        {/* Bottom Wooden Desk with Chalk Duster & Chalk Sticks (matching Reference 2) */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-16 h-4 bg-amber-900/80 rounded-sm border border-amber-800 flex items-center justify-center text-[9px] text-amber-200">
              Eraser
            </div>
            <div className="w-8 h-2 bg-white/90 rounded-full shadow-xs" />
            <div className="w-8 h-2 bg-emerald-200 rounded-full shadow-xs" />
            <div className="w-8 h-2 bg-pink-200 rounded-full shadow-xs" />
          </div>
          <span className="text-xs text-emerald-200/70 font-mono">
            VIT Pune • AY 2026-27 Module V
          </span>
        </div>
      </div>

      {/* RIGHT SPLIT: Modern Clean Authentication Panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-20 xl:px-28">
        <div className="w-full max-w-md mx-auto">
          {/* Top greeting badge */}
          <div className="text-center sm:text-left mb-8">
            <span className="text-xs font-semibold tracking-wider text-[#18794E] uppercase bg-[#EFF9F3] px-3 py-1 rounded-full inline-block mb-3">
              Welcome To <strong className="font-bold text-[#36B875]">Shreenil!</strong>
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18221D] tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-xs sm:text-sm text-[#6B756F] mt-1.5">
              Access your digital twin, courses, timetable & academic records.
            </p>
          </div>

          {/* Quick Demo Role Selector */}
          <div className="mb-6 bg-white p-3 rounded-2xl border border-[#E5EBE7] shadow-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-[#6B756F] uppercase tracking-wider">
                Select Demo Role
              </span>
              <span className="text-[11px] text-[#36B875] font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 1-Click Access
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['student', 'teacher', 'parent', 'admin'] as UserRole[]).map((r) => {
                const cred = roleCredentials[r];
                const Icon = cred.icon;
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all ${
                      isSelected
                        ? 'border border-[#36B875] bg-[#EFF9F3] text-[#18794E] font-semibold shadow-xs'
                        : 'border border-[#E5EBE7] hover:border-slate-300 text-[#6B756F] bg-slate-50/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#36B875]' : 'text-slate-400'}`} />
                    <span className="truncate">{cred.label.replace(' Portal', '').replace('istrator', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Username or email address..."
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5EBE7] rounded-xl text-sm text-[#18221D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-white border border-[#E5EBE7] rounded-xl text-sm text-[#18221D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-[#6B756F] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#E5EBE7] text-[#36B875] focus:ring-[#36B875] w-4 h-4"
                />
                <span>Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="font-medium text-[#E11D48] hover:text-[#BE123C] transition-colors"
              >
                Forgot Password
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Signing In...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          <div className="text-center mt-3 text-xs text-[#6B756F]">
            Don't have an account?{' '}
            <Link to="/login" className="font-semibold text-[#0284C7] hover:underline">
              Sign up
            </Link>
          </div>

          {/* Social login divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E5EBE7]" />
            </div>
            <span className="relative bg-[#F6F8F7] px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              SIGN IN WITH
            </span>
          </div>

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5EBE7] hover:border-slate-300 rounded-xl text-xs font-semibold text-[#18221D] shadow-subtle hover:bg-slate-50 transition-all cursor-pointer"
            >
              {/* Google G logo */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5EBE7] hover:border-slate-300 rounded-xl text-xs font-semibold text-[#18221D] shadow-subtle hover:bg-slate-50 transition-all cursor-pointer"
            >
              {/* Apple Logo */}
              <svg className="w-4 h-4 fill-black" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.43-5.74-9.17-10.22-19.78-13.43-31.81-3.21-12.04-4.82-23.73-4.82-35.08 0-14.83 3.69-27.18 11.08-37.05 7.38-9.87 16.63-14.87 27.75-15.01 5.43 0 11.45 1.48 18.06 4.45 6.61 2.97 10.8 4.51 12.57 4.61 1.34 0 5.86-1.68 13.56-5.04 7.7-3.36 14.16-4.79 19.38-4.3 14.39.81 25.68 6.33 33.87 16.56-12.87 7.79-19.19 18.39-18.96 31.81.23 10.42 4.14 19.16 11.73 26.22 7.59 7.06 16.89 11.08 27.9 12.06-2.45 7.4-5.35 14.83-8.71 22.28zM119.22 33.02c0-7.39 2.65-14.4 7.95-21.03 5.3-6.63 11.83-11.05 19.59-13.26.11 1.25.17 2.45.17 3.61 0 7.39-2.73 14.46-8.19 21.2-5.46 6.74-12.05 11.13-19.77 13.17-.11-1.14-.17-2.37-.17-3.69z" />
              </svg>
              <span>Apple</span>
            </button>

            <button
              type="button"
              onClick={() => handleSocialLogin('Microsoft')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white border border-[#E5EBE7] hover:border-slate-300 rounded-xl text-xs font-semibold text-[#18221D] shadow-subtle hover:bg-slate-50 transition-all cursor-pointer"
            >
              {/* Microsoft 4-Color Grid */}
              <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                <div className="bg-[#F25022] w-1.5 h-1.5" />
                <div className="bg-[#7FBA00] w-1.5 h-1.5" />
                <div className="bg-[#00A4EF] w-1.5 h-1.5" />
                <div className="bg-[#FFB900] w-1.5 h-1.5" />
              </div>
              <span>Microsoft</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
