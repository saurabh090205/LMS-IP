import React from 'react';
import * as Icons from 'lucide-react';
import { LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from './Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string | LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  helperText?: string;
  badge?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  helperText,
  badge,
  className,
}) => {
  let IconComponent: LucideIcon | null = null;
  if (typeof icon === 'string') {
    IconComponent = (Icons as unknown as Record<string, LucideIcon>)[icon] || null;
  } else if (icon) {
    IconComponent = icon;
  }

  const changeColors = {
    positive: 'text-[#065F46] bg-[#DDF4EA] border-[#A7F3D0]',
    negative: 'text-[#9A3412] bg-[#FBE1D8] border-[#FED7AA]',
    neutral: 'text-[#4B5563] bg-[#F3F4F9] border-[#E7E7F0]',
  }[changeType];

  const ChangeIcon = {
    positive: TrendingUp,
    negative: TrendingDown,
    neutral: Minus,
  }[changeType];

  return (
    <Card className={cn('p-5 sm:p-5 flex flex-col justify-between border-[#E7E7F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:border-[#D8D8E5] transition-all', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-slate-500 tracking-tight">
            {title}
          </span>
          <div className="text-xl sm:text-2xl font-semibold text-slate-800 tracking-tight">
            {value}
          </div>
        </div>
        {IconComponent && (
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#EEF0FF] text-[#4F46E5] border border-[#D0D7FF] shrink-0">
            <IconComponent className="w-4 h-4" />
          </div>
        )}
      </div>

      {(change || helperText || badge) && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#F1F1F8] text-xs flex-wrap">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-1 font-medium px-1.5 py-0.5 rounded-md border text-[11px] select-none',
                changeColors
              )}
            >
              <ChangeIcon className="w-3 h-3" />
              {change}
            </span>
          )}
          {helperText && <span className="text-slate-400 text-[11px] truncate font-normal">{helperText}</span>}
          {badge && <div className="ml-auto">{badge}</div>}
        </div>
      )}
    </Card>
  );
};
