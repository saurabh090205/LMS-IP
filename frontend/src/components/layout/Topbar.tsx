import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Bell,
  HelpCircle,
  Menu,
  GraduationCap,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Sparkles,
  Shield,
  BookOpen,
  Users,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Avatar } from '../ui/Avatar';
import { Dropdown } from '../ui/Dropdown';
import { Badge } from '../ui/Badge';
import { SearchModal } from './SearchModal';
import { UserRole } from '../../types/auth';

export interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const roleLabels: Record<UserRole, { label: string; badge: string; icon: typeof User }> = {
    student: { label: 'Student View', badge: 'Enrolled', icon: BookOpen },
    teacher: { label: 'Faculty View', badge: 'Professor', icon: GraduationCap },
    parent: { label: 'Parent Portal', badge: 'Guardian', icon: Users },
    admin: { label: 'System Admin', badge: 'Executive', icon: Shield },
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    switchRole(newRole);
    addToast({
      title: `Switched Role`,
      description: `Now viewing workspace as ${roleLabels[newRole].label}`,
      type: 'info',
    });
    navigate(`/${newRole}/dashboard`);
  };

  const handleLogout = () => {
    logout();
    addToast({
      title: 'Logged Out',
      description: 'You have been safely signed out of Shreenil.',
      type: 'info',
    });
    navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E7E7F0] bg-white/95 backdrop-blur-xs px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button & Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-[#F6F6FB] transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5] text-white shadow-[0_1px_2px_0_rgba(79,70,229,0.2)] group-hover:bg-[#4338CA] transition-colors">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-none group-hover:text-[#4F46E5] transition-colors">
                Shreenil
              </span>
              <span className="text-[10px] font-semibold text-[#4F46E5] tracking-wider uppercase mt-0.5">
                Virtual University
              </span>
            </div>
          </Link>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-[#E7E7F0] bg-[#F6F6FB] hover:bg-[#EEF0FF]/50 text-slate-400 hover:text-slate-600 transition-colors text-xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400" />
              <span>Search courses, modules, assignments, faculty...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded-md bg-white border border-[#E7E7F0] text-[10px] font-mono text-slate-400 shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Side: Role Quick Switcher, Notifications, Help & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search trigger */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-[#F6F6FB]"
            aria-label="Open search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Role Switcher Pill */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E7E7F0] bg-[#F6F6FB] hover:bg-[#EEF0FF]/60 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                <span>{roleLabels[role].label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            }
          >
            <div className="px-3 py-2 border-b border-[#F1F1F8]">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Switch Experience</p>
            </div>
            {(['student', 'teacher', 'parent', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => handleRoleSwitch(r)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg text-left transition-colors ${
                  role === r ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold' : 'text-slate-700 hover:bg-[#F6F6FB]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${role === r ? 'bg-[#4F46E5]' : 'bg-slate-300'}`} />
                  {roleLabels[r].label}
                </div>
                {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#4F46E5]" />}
              </button>
            ))}
          </Dropdown>

          {/* Notifications Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 ring-2 ring-white" />
              </button>
            }
          >
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">Notifications</span>
              <Badge variant="primary" size="sm">2 New</Badge>
            </div>
            <div className="p-2 flex flex-col gap-1 max-h-60 overflow-y-auto">
              <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs flex flex-col gap-0.5">
                <span className="font-semibold text-slate-800">Grade Posted</span>
                <span className="text-[11px] text-slate-500">CS-301 Midterm results are now available.</span>
                <span className="text-[10px] text-slate-400 mt-1">10 mins ago</span>
              </div>
              <div className="p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs flex flex-col gap-0.5">
                <span className="font-semibold text-slate-800">System Notice</span>
                <span className="text-[11px] text-slate-500">Virtual Lab scheduled maintenance on Sunday 2 AM.</span>
                <span className="text-[10px] text-slate-400 mt-1">2 hours ago</span>
              </div>
            </div>
            <div className="p-2 border-t border-slate-100 text-center">
              <button
                onClick={() => addToast({ title: 'Notifications Cleared', type: 'info' })}
                className="text-[11px] font-semibold text-indigo-600 hover:underline"
              >
                Mark all as read
              </button>
            </div>
          </Dropdown>

          {/* Help Button */}
          <button
            type="button"
            onClick={() => {
              addToast({
                title: 'University Help Desk',
                description: 'Support hotline: support@shreenil.edu • 24/7 Portal Support',
                type: 'info',
              });
            }}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Help and Documentation"
          >
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* User Menu Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button type="button" className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-slate-200 transition-all">
                <Avatar name={user.name} size="sm" status="online" />
              </button>
            }
          >
            <div className="px-3 py-2.5 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-900">{user.name}</p>
              <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
              <Badge variant="primary" size="sm" className="mt-1.5">
                {roleLabels[role].label}
              </Badge>
            </div>

            <div className="p-1">
              <button
                onClick={() => navigate('/profile')}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4 text-slate-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => navigate('/settings')}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <Settings className="w-4 h-4 text-slate-400" />
                <span>Account Settings</span>
              </button>
            </div>

            <div className="p-1 border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
