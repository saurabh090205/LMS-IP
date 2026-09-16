import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  onActionClick?: () => void;
  rightElement?: ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  actionHref,
  onActionClick,
  rightElement,
  className,
}) => {
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-3.5', className)}>
      <div className="flex flex-col gap-0.5">
        <h2 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {rightElement ? (
        rightElement
      ) : actionHref ? (
        <Link
          to={actionHref}
          className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>{actionText || 'View All'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      ) : onActionClick ? (
        <button
          onClick={onActionClick}
          className="text-xs font-medium text-[#4F46E5] hover:text-[#4338CA] transition-colors flex items-center gap-1 shrink-0"
        >
          <span>{actionText || 'View All'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      ) : null}
    </div>
  );
};
