import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  LogOut,
  Sparkles,
  Smartphone,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { roleNavigationConfig } from '../../features/role-navigation/navigationConfig';
import { cn } from '../../lib/utils';
import { NavItem } from '../../types/navigation';

export interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isMobileOpen,
  onCloseMobile,
  isCollapsed,
  onToggleCollapse,
}) => {
  const { role, logout, user } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const sections = roleNavigationConfig[role] || [];

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as unknown as Record<string, LucideIcon>)[iconName] || Icons.Circle;
  };

  const handleLogout = () => {
    logout();
    addToast({
      title: 'Signed Out',
      description: 'You have been safely logged out of your session.',
      type: 'info',
    });
    navigate('/login');
  };

  const renderNavItem = (item: NavItem) => {
    const Icon = getIcon(item.icon);
    const isActive = location.pathname === item.href;

    return (
      <NavLink
        key={item.id}
        to={item.href}
        onClick={() => onCloseMobile()}
        className={({ isActive: linkActive }) =>
          cn(
            'group relative flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 select-none tracking-tight',
            linkActive || isActive
              ? 'bg-[#EFF9F3] text-[#18794E] font-bold shadow-xs'
              : 'text-[#6B756F] hover:bg-slate-50 hover:text-[#18221D]',
            isCollapsed && 'justify-center px-2'
          )
        }
        title={isCollapsed ? item.title : undefined}
      >
        {/* Active green indicator strip */}
        {(location.pathname === item.href) && (
          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-[#36B875]" />
        )}
        <Icon
          className={cn(
            'w-4 h-4 shrink-0 transition-colors',
            isActive ? 'text-[#36B875] stroke-[2.2]' : 'text-slate-400 group-hover:text-slate-600'
          )}
        />
        {!isCollapsed && (
          <span className="truncate flex-1">{item.title}</span>
        )}
        {!isCollapsed && item.badge !== undefined && (
          <span
            className={cn(
              'px-1.5 py-0.5 rounded-full text-[10px] font-bold shrink-0',
              item.badgeVariant === 'warning'
                ? 'bg-amber-100 text-amber-800'
                : item.badgeVariant === 'danger'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-[#EFF9F3] text-[#18794E]'
            )}
          >
            {item.badge}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-[#E5EBE7] transition-all duration-200 ease-in-out lg:static shadow-subtle',
          isCollapsed ? 'w-18' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Top Logo & Brand (Matching Reference 1 green pill badge) */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5EBE7]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#36B875] text-white shadow-mint">
              <GraduationCap className="h-5 w-5 stroke-[2.2]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#18221D] tracking-tight uppercase">
                  COURSE LMS
                </span>
                <span className="text-[10px] font-semibold text-[#36B875] tracking-wider uppercase">
                  Shreenil Platform
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop Collapse Toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 no-scrollbar">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#6B756F]/80 mb-1">
                  {section.title}
                </div>
              )}
              <div className="space-y-0.5">
                {section.items.map(renderNavItem)}
              </div>
            </div>
          ))}

          {/* Reference 1 bottom-left Promo Mini Card: "Start Learning" */}
          {!isCollapsed && role === 'student' && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#EFF9F3] to-[#D6F2E3] border border-[#B0E7CB] text-center my-3 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-white/80 shadow-xs flex items-center justify-center mx-auto mb-2 text-[#36B875]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-[#18794E]">Continue Learning</h4>
              <p className="text-[10px] text-[#18794E]/80 mt-0.5 mb-2.5">
                Practical 2 (MLP) due in 3 days. Keep your streak alive!
              </p>
              <button
                onClick={() => navigate('/student/assignments')}
                className="w-full py-1.5 px-3 rounded-xl bg-[#36B875] hover:bg-[#239B5E] text-white text-[11px] font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Start Learning</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom User & Logout Footer */}
        <div className="p-3 border-t border-[#E5EBE7] bg-white">
          <button
            onClick={handleLogout}
            className={cn(
              'w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer',
              isCollapsed && 'justify-center px-2'
            )}
            title="Log Out"
          >
            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
