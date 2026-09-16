import React from 'react';
import { AlertOctagon, RotateCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Failed to load content',
  message = 'An unexpected error occurred while fetching information. Please try again.',
  onRetry,
  className,
}) => {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-200 bg-rose-50/40 text-slate-800',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-white border border-rose-200 shadow-xs flex items-center justify-center text-rose-500 mb-3">
        <AlertOctagon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-semibold text-slate-900">{title}</h3>
      <p className="text-xs text-slate-600 max-w-sm mt-1 mb-4">{message}</p>
      {onRetry && (
        <Button size="sm" onClick={onRetry} leftIcon={RotateCw} variant="outline">
          Retry Action
        </Button>
      )}
    </div>
  );
};
