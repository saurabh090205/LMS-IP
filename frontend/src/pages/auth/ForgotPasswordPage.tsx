import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ForgotPasswordPage() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    addToast({
      title: 'Reset Link Sent',
      description: 'A mock password recovery link has been generated for your academic email.',
      type: 'info',
    });
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
          Reset Your Password
        </h2>
        <p className="mt-1.5 text-xs text-center text-[#6B756F]">
          Enter your registered institutional email to receive recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E5EBE7] shadow-card">
          {isSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#EFF9F3] text-[#18794E] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#18221D]">Check Your Inbox</h3>
              <p className="text-xs text-[#6B756F] leading-relaxed">
                We've sent a simulated password reset email to <strong className="text-[#18221D]">{email}</strong>. Note that in mock mode, no external email is dispatched.
              </p>
              <div className="pt-2">
                <Link
                  to="/reset-password"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#36B875] text-white text-xs font-semibold hover:bg-[#239B5E] transition-colors"
                >
                  Proceed to Reset Password Page
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#18221D] mb-1.5">
                  Academic Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@shreenil.edu"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5EBE7] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Send Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#E5EBE7] text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#6B756F] hover:text-[#18221D]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
