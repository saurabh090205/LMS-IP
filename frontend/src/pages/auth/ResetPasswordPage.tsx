import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast({
        title: 'Passwords Do Not Match',
        description: 'Please ensure both password fields match exactly.',
        type: 'danger',
      });
      return;
    }
    if (password.length < 8) {
      addToast({
        title: 'Password Too Short',
        description: 'Password must be at least 8 characters long.',
        type: 'warning',
      });
      return;
    }

    addToast({
      title: 'Password Updated Successfully',
      description: 'Your academic portal password has been reset. Please log in.',
      type: 'success',
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F6F8F7] flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2.5 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#36B875] text-white shadow-mint">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold text-[#18221D]">Shreenil</span>
        </Link>
        <h2 className="text-2xl font-bold text-center text-[#18221D]">
          Set New Password
        </h2>
        <p className="mt-1.5 text-xs text-center text-[#6B756F]">
          Choose a secure password containing at least 8 characters.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5EBE7] shadow-card">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  required
                  className="w-full pl-10 pr-11 py-2.5 bg-white border border-[#E5EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <span>Update Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-[#E5EBE7] text-center">
            <Link
              to="/login"
              className="text-xs font-semibold text-[#6B756F] hover:text-[#18221D]"
            >
              Cancel and return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
