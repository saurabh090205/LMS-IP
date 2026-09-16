import React, { ReactNode } from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  };
  children?: ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  action,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-800">{title}</h3>
      {description && <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4">{description}</p>}
      {action && (
        <Button size="sm" onClick={action.onClick} leftIcon={action.icon} variant="outline">
          {action.label}
        </Button>
      )}
      {children}
    </div>
  );
};
