import React, { HTMLAttributes } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { StatusType } from '../../types/common';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  type?: StatusType;
  title?: string;
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onDismiss,
  className,
  ...props
}) => {
  const styles: Record<StatusType, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
    info: {
      bg: 'bg-[#DCEEFF]/60',
      border: 'border-[#BFDBFE]',
      text: 'text-[#1E40AF]',
      icon: <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />,
    },
    success: {
      bg: 'bg-[#DDF4EA]/60',
      border: 'border-[#A7F3D0]',
      text: 'text-[#065F46]',
      icon: <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />,
    },
    warning: {
      bg: 'bg-[#F8F0C8]/60',
      border: 'border-[#FDE68A]',
      text: 'text-[#854D0E]',
      icon: <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />,
    },
    danger: {
      bg: 'bg-[#FBE1D8]/60',
      border: 'border-[#FED7AA]',
      text: 'text-[#9A3412]',
      icon: <AlertCircle className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />,
    },
  };

  const current = styles[type];

  return (
    <div
      role="alert"
      className={cn(
        'flex items-start gap-3 rounded-xl border p-4 text-sm transition-all',
        current.bg,
        current.border,
        current.text,
        className
      )}
      {...props}
    >
      {current.icon}
      <div className="flex-1 flex flex-col gap-0.5">
        {title && <h5 className="font-semibold text-slate-900 leading-snug">{title}</h5>}
        {children && <div className="text-xs text-slate-700 leading-relaxed">{children}</div>}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-black/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
