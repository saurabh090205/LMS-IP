import React from 'react';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface ProgressCardProps {
  title: string;
  category?: string;
  progress: number;
  totalModules?: number;
  completedModules?: number;
  grade?: string;
  statusText?: string;
  className?: string;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  category,
  progress,
  totalModules,
  completedModules,
  grade,
  statusText,
  className,
}) => {
  return (
    <Card className={cn('p-5 flex flex-col gap-3', className)}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          {category && <span className="text-[10px] font-semibold text-[#4F46E5] uppercase tracking-wider">{category}</span>}
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{title}</h4>
        </div>
        {grade && (
          <Badge variant="primary" size="sm">
            Grade: {grade}
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1.5 mt-1">
        <ProgressBar value={progress} showPercentage />
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>{statusText || (totalModules ? `${completedModules || 0} of ${totalModules} modules completed` : 'In Progress')}</span>
        </div>
      </div>
    </Card>
  );
};
