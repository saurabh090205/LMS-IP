import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import {
  LucideIcon,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  ShieldCheck,
  User,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { roleNavigationConfig } from '../../features/role-navigation/navigationConfig';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
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
  const { user, role } = useAuth();
  const location = useLocation();
  const sections = roleNavigationConfig[role] || [];

  const getIcon = (iconName: string): LucideIcon => {
    return (Icons as unknown as Record<string, LucideIcon>)[iconName] || Icons.HelpCircle;
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
              ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold'
              : 'text-slate-600 hover:bg-[#F6F6FB] hover:text-slate-900',
            isCollapsed && 'justify-center px-2'
          )
        }
        title={isCollapsed ? item.title : undefined}
      >
        {/* Active subtle indicator bar */}
        {(location.pathname === item.href) && (
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-[#4F46E5]" />
        )}
        <Icon
          className={cn(
            'w-4 h-4 shrink-0 transition-colors',
            isActive ? 'text-[#4F46E5] stroke-[2.2]' : 'text-slate-400 group-hover:text-slate-600'
          )}
        />
        {!isCollapsed && (
          <span className="flex-1 truncate">{item.title}</span>
        )}

        {!isCollapsed && item.badge !== undefined && (
          <Badge
            variant={item.badgeVariant || 'neutral'}
            size="sm"
            className="ml-auto shrink-0 font-semibold text-[10px]"
          >
            {item.badge}
          </Badge>
        )}
      </NavLink>
    );
  };

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-3.5 py-4">
      {/* Navigation Sections */}
      <div className="flex flex-col gap-6">
        {sections.map((section, idx) => (
          <div key={idx} className="flex flex-col gap-0.5">
            {!isCollapsed && section.title && (
              <h3 className="px-3 text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 select-none">
                {section.title}
              </h3>
            )}
            <div className="flex flex-col gap-0.5">
              {section.items.map(renderNavItem)}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Section: User Profile Snapshot & Collapse Button */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-[#E7E7F0]">
        {!isCollapsed && (
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0]">
            <Avatar name={user.name} size="sm" status="online" />
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-800 truncate leading-tight">{user.name}</span>
              <span className="text-[10px] text-slate-500 capitalize truncate mt-0.5">
                {user.role} Portal
              </span>
            </div>
          </div>
        )}

        {/* Collapse Button */}
        <div className="hidden lg:flex items-center justify-end">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center gap-2 p-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-[#F6F6FB] rounded-lg w-full justify-center transition-colors select-none"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <>
                <ChevronLeft className="w-4 h-4" />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop & Tablet Persistent / Collapsible Sidebar */}
      <aside
        className={cn(
          'hidden lg:flex flex-col border-r border-[#E7E7F0] bg-white transition-all duration-200 shrink-0 sticky top-16 h-[calc(100vh-4rem)]',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-Over) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={onCloseMobile}
          />

          {/* Drawer Sheet */}
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-10 flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold text-sm shadow-2xs">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span className="font-bold text-slate-900 text-sm">Shreenil Navigation</span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">{sidebarContent}</div>
          </div>
        </div>
      )}
    </>
  );
};
