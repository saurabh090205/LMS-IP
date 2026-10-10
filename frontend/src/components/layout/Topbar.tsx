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
  Heart,
  Bookmark,
  Layers,
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
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E5EBE7] bg-white/95 backdrop-blur-xs px-4 sm:px-6">
        {/* Left Side: Mobile Menu Button & Categories dropdown */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-[#F6F8F7] transition-colors"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Reference 1: Categories dropdown pill */}
          <Dropdown
            align="left"
            trigger={
              <button
                type="button"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E5EBE7] bg-[#F6F8F7] hover:bg-slate-100 text-[#18221D] text-xs font-semibold transition-colors"
              >
                <Layers className="w-3.5 h-3.5 text-[#36B875]" />
                <span>Categories</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
            }
          >
            <div className="py-1 min-w-[180px]">
              <button
                onClick={() => navigate('/student/courses')}
                className="w-full px-3 py-2 text-left text-xs text-[#18221D] hover:bg-[#EFF9F3] hover:text-[#18794E] flex items-center justify-between"
              >
                <span>AI & Deep Learning</span>
                <span className="text-[10px] text-slate-400">CI3001</span>
              </button>
              <button
                onClick={() => navigate('/student/courses')}
                className="w-full px-3 py-2 text-left text-xs text-[#18221D] hover:bg-[#EFF9F3] hover:text-[#18794E] flex items-center justify-between"
              >
                <span>Operating Systems</span>
                <span className="text-[10px] text-slate-400">CI3202</span>
              </button>
              <button
                onClick={() => navigate('/student/courses')}
                className="w-full px-3 py-2 text-left text-xs text-[#18221D] hover:bg-[#EFF9F3] hover:text-[#18794E] flex items-center justify-between"
              >
                <span>MLOPS & Pipelines</span>
                <span className="text-[10px] text-slate-400">CI3003D</span>
              </button>
              <button
                onClick={() => navigate('/student/courses')}
                className="w-full px-3 py-2 text-left text-xs text-[#18221D] hover:bg-[#EFF9F3] hover:text-[#18794E] flex items-center justify-between"
              >
                <span>Distributed Learning</span>
                <span className="text-[10px] text-slate-400">CI3203B</span>
              </button>
            </div>
          </Dropdown>
        </div>

        {/* Center: Search Bar with Green "Search" Button (Matching Reference 1) */}
        <div className="flex-1 max-w-lg mx-4">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchOpen(true)}
              placeholder="Start typing your search..."
              className="w-full pl-4 pr-24 py-1.5 sm:py-2 bg-[#F6F8F7] border border-[#E5EBE7] rounded-full text-xs text-[#18221D] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#36B875]/20 focus:border-[#36B875] transition-all cursor-pointer"
            />
            <button
              type="submit"
              className="absolute right-1 px-4 py-1 sm:py-1.5 rounded-full bg-[#36B875] hover:bg-[#239B5E] text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Search</span>
            </button>
          </form>
        </div>

        {/* Right Side: Quick Action Icons & Profile (Matching Reference 1) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Bookmark / Tasks */}
          <button
            type="button"
            onClick={() => navigate('/student/assignments')}
            className="hidden md:flex p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-[#F6F8F7] transition-colors relative"
            title="My Assignments"
          >
            <Bookmark className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500" />
          </button>

          {/* Notification Bell with red badge */}
          <button
            type="button"
            onClick={() => navigate('/student/notifications')}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-[#F6F8F7] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-500" />
            <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
            </span>
          </button>

          {/* Role Switcher Pill */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border border-[#E5EBE7] bg-[#EFF9F3] text-[#18794E] text-[11px] font-semibold transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#36B875]" />
                <span>{roleLabels[role].label}</span>
                <ChevronDown className="w-3 h-3 text-[#18794E]/70" />
              </button>
            }
          >
            <div className="px-3 py-2 border-b border-[#E5EBE7]">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Switch Profile Experience</p>
            </div>
            {(['student', 'teacher', 'parent', 'admin'] as UserRole[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRoleSwitch(r)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                  role === r
                    ? 'bg-[#EFF9F3] text-[#18794E] font-bold'
                    : 'text-[#6B756F] hover:bg-slate-50 hover:text-[#18221D]'
                }`}
              >
                <span>{roleLabels[r].label}</span>
                {role === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#36B875]" />}
              </button>
            ))}
          </Dropdown>

          {/* User Profile Avatar with Name & Dropdown (Matching Reference 1: "Tonmoy Khan v") */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 p-1 rounded-full sm:rounded-xl hover:bg-[#F6F8F7] transition-colors"
              >
                <Avatar
                  name={user.name}
                  src={user.avatarUrl}
                  size="sm"
                  className="ring-2 ring-[#B0E7CB]"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#18221D] leading-none">
                    {user.name}
                  </span>
                  <span className="text-[10px] text-[#36B875] font-semibold mt-0.5">
                    {role === 'student' ? 'Module V' : roleLabels[role].label}
                  </span>
                </div>
                <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
              </button>
            }
          >
            <div className="px-4 py-3 border-b border-[#E5EBE7] bg-slate-50/50">
              <p className="text-xs font-bold text-[#18221D]">{user.name}</p>
              <p className="text-[10px] text-[#6B756F] truncate">{user.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => navigate('/student/profile')}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#6B756F] hover:bg-[#EFF9F3] hover:text-[#18794E]"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Profile</span>
              </button>
              <button
                onClick={() => navigate('/student/settings')}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#6B756F] hover:bg-[#EFF9F3] hover:text-[#18794E]"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Preferences & Settings</span>
              </button>
              <button
                onClick={() => navigate('/student/help')}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-[#6B756F] hover:bg-[#EFF9F3] hover:text-[#18794E]"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Help & FAQs</span>
              </button>
            </div>
            <div className="border-t border-[#E5EBE7] py-1">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Global Command Palette / Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
