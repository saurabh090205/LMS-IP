import React from 'react';
import { Calendar, Clock, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { TaskDeadline } from '../../types/dashboard';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';

export interface UpcomingItemProps {
  task: TaskDeadline;
  onActionClick?: () => void;
  className?: string;
}

export const UpcomingItem: React.FC<UpcomingItemProps> = ({ task, onActionClick, className }) => {
  const priorityBadge = {
    high: <Badge variant="danger" size="sm">Urgent</Badge>,
    medium: <Badge variant="warning" size="sm">Normal</Badge>,
    low: <Badge variant="neutral" size="sm">Low</Badge>,
  }[task.priority || 'medium'];

  return (
    <div
      onClick={onActionClick}
      className={cn(
        'flex items-start justify-between gap-3 p-3.5 rounded-2xl border border-[#E7E7F0] bg-white hover:border-[#D8D8E5] hover:bg-[#F6F6FB]/60 transition-all cursor-pointer group shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]',
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-xl bg-[#EEF0FF] border border-[#D0D7FF] flex items-center justify-center text-[#4F46E5] shrink-0 mt-0.5">
          <FileText className="w-4 h-4" />
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-700">{task.courseCode}</span>
            {priorityBadge}
          </div>
          <h4 className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-[#4F46E5] transition-colors leading-snug tracking-tight">
            {task.title}
          </h4>
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              {task.dueDate}
            </span>
            {task.points !== undefined && <span>{task.points} Points</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
