import React from 'react';
import { ActivityEvent } from '../../types/dashboard';
import { cn } from '../../lib/utils';
import { Avatar } from '../ui/Avatar';
import { BookOpen, Award, FileText, Bell, Shield } from 'lucide-react';

export interface ActivityItemProps {
  event: ActivityEvent;
  className?: string;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ event, className }) => {
  const iconByType = {
    course: <BookOpen className="w-3.5 h-3.5 text-indigo-600" />,
    grade: <Award className="w-3.5 h-3.5 text-emerald-600" />,
    submission: <FileText className="w-3.5 h-3.5 text-sky-600" />,
    announcement: <Bell className="w-3.5 h-3.5 text-amber-600" />,
    system: <Shield className="w-3.5 h-3.5 text-purple-600" />,
  }[event.type];

  return (
    <div className={cn('flex items-start gap-3 py-3 text-xs text-slate-700', className)}>
      <div className="relative shrink-0">
        <Avatar name={event.actor} src={event.actorAvatar} size="sm" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-xs">
          {iconByType}
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <p className="leading-snug">
          <span className="font-semibold text-slate-900">{event.actor}</span>{' '}
          <span className="text-slate-600">{event.action}</span>{' '}
          <span className="font-medium text-slate-900">{event.target}</span>
        </p>
        <span className="text-[11px] text-slate-400">{event.timestamp}</span>
      </div>
    </div>
  );
};
