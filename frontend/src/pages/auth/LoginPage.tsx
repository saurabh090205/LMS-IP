import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { UserRole } from '../../types/auth';

export default function LoginPage() {
  const { loginAs } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('aarav.sharma@shreenil.edu');
  const [password, setPassword] = useState('••••••••••••');

  const roleCredentials: Record<UserRole, { email: string; name: string; label: string; icon: typeof BookOpen }> = {
    student: {
      email: 'aarav.sharma@shreenil.edu',
      name: 'Aarav Sharma',
      label: 'Student Account',
      icon: BookOpen,
    },
    teacher: {
      email: 'elena.rostova@shreenil.edu',
      name: 'Dr. Elena Rostova',
      label: 'Faculty Account',
      icon: GraduationCap,
    },
    parent: {
      email: 'vikram.sharma@gmail.com',
      name: 'Vikram Sharma',
      label: 'Parent Account',
      icon: Users,
    },
    admin: {
      email: 'dean.pendelton@shreenil.edu',
      name: 'Dean Arthur Pendelton',
      label: 'Admin Executive',
      icon: Shield,
    },
  };

  const handleRoleSelect = (r: UserRole) => {
    setSelectedRole(r);
    setEmail(roleCredentials[r].email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs(selectedRole);
    addToast({
      title: 'Authenticated Successfully',
      description: `Logged in as ${roleCredentials[selectedRole].name} (${roleCredentials[selectedRole].label})`,
      type: 'success',
    });
    navigate(`/${selectedRole}/dashboard`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-xs">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
              Shreenil
            </span>
            <span className="text-[10px] font-semibold text-indigo-600 tracking-wider uppercase mt-0.5">
              Virtual University Portal
            </span>
          </div>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
          Sign In to Your Academic Workspace
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Select a role experience below for instant Stage 1 prototype access
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-6 sm:p-8 shadow-md border-slate-200 bg-white">
          {/* Role Quick Selector Tabs */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Select Demo Role Profile
            </label>
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
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span className="truncate">{cred.label.replace(' Account', '')}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Academic Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={Mail}
              required
            />

            <Input
              label="SSO Password / Token"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-indigo-600 focus:ring-indigo-500" />
                <span>Remember this device</span>
              </label>
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Help signing in?
              </a>
            </div>

            <Button type="submit" size="lg" variant="primary" className="w-full mt-2" rightIcon={ArrowRight}>
              Continue to {roleCredentials[selectedRole].label}
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Encrypted Institutional Single Sign-On</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
