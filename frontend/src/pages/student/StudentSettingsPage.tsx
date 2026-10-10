import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Shield,
  Moon,
  Eye,
  CheckCircle2,
  Save,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function StudentSettingsPage() {
  const { addToast } = useToast();
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [assignmentAlerts, setAssignmentAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Preferences Saved',
      description: 'Your portal and notification settings have been updated.',
      type: 'success',
    });
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      addToast({
        title: 'Validation Error',
        description: 'Both current and new password are required.',
        type: 'warning',
      });
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    addToast({
      title: 'Password Updated',
      description: 'Your login credentials have been changed successfully.',
      type: 'success',
    });
  };

  return (
    <div className="flex flex-col gap-6 selection:bg-[#EFF9F3] selection:text-[#18794E]">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[#EFF9F3] text-[#18794E] text-xs font-bold border border-[#B0E7CB]">
              User Preferences
            </span>
            <span className="text-xs text-[#6B756F]">Account Security & Alerts</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#18221D] tracking-tight">
            Portal Settings & Preferences
          </h1>
          <p className="text-xs text-[#6B756F] mt-0.5">
            Configure notification alerts, language options, theme modes, and institutional security settings.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5EBE7]">
            <Bell className="w-5 h-5 text-[#36B875]" />
            <h3 className="text-sm font-bold text-[#18221D]">Notification Preferences</h3>
          </div>

          <div className="space-y-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F6F8F7] cursor-pointer">
              <div>
                <span className="font-bold text-[#18221D] block">Email Notifications</span>
                <span className="text-[#6B756F]">Receive assignment grades and timetables via academic email</span>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                className="w-4 h-4 text-[#36B875] rounded focus:ring-[#36B875]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F6F8F7] cursor-pointer">
              <div>
                <span className="font-bold text-[#18221D] block">Assignment Due Date Alerts</span>
                <span className="text-[#6B756F]">24-hour reminder before assignment submission closes</span>
              </div>
              <input
                type="checkbox"
                checked={assignmentAlerts}
                onChange={(e) => setAssignmentAlerts(e.target.checked)}
                className="w-4 h-4 text-[#36B875] rounded focus:ring-[#36B875]"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F6F8F7] cursor-pointer">
              <div>
                <span className="font-bold text-[#18221D] block">Mid-Sem & Examination Alerts</span>
                <span className="text-[#6B756F]">Hall ticket notices and seat allocation updates</span>
              </div>
              <input
                type="checkbox"
                checked={examReminders}
                onChange={(e) => setExamReminders(e.target.checked)}
                className="w-4 h-4 text-[#36B875] rounded focus:ring-[#36B875]"
              />
            </label>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSavePreferences}
              className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint cursor-pointer"
            >
              Save Notification Preferences
            </button>
          </div>
        </div>

        {/* Password & Security */}
        <div className="bg-white p-6 rounded-3xl border border-[#E5EBE7] shadow-card space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-[#E5EBE7]">
            <Lock className="w-5 h-5 text-[#36B875]" />
            <h3 className="text-sm font-bold text-[#18221D]">Password & Access Security</h3>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-[#18221D] mb-1">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#18221D] mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full p-2.5 bg-[#F6F8F7] border border-[#E5EBE7] rounded-xl text-xs"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-bold shadow-mint cursor-pointer"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
