import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface QuickActionItem {
  id: string;
  label: string;
  description?: string;
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'neutral';
}

export interface QuickActionsProps {
  actions: QuickActionItem[];
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions, className }) => {
  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-3', className)}>
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <button
            key={act.id}
            type="button"
            onClick={act.onClick}
            className="flex flex-col items-start p-3.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-xs transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-indigo-100 text-slate-700 group-hover:text-indigo-600 flex items-center justify-center transition-colors mb-2">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">
              {act.label}
            </span>
            {act.description && (
              <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{act.description}</span>
            )}
          </button>
        );
      })}
    </div>
  );
};
