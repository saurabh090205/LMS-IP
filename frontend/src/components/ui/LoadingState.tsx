import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface LoadingStateProps {
  message?: string;
  type?: 'spinner' | 'skeleton';
  skeletonCount?: number;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  type = 'spinner',
  skeletonCount = 3,
  className,
}) => {
  if (type === 'skeleton') {
    return (
      <div className={cn('w-full flex flex-col gap-3', className)}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div
            key={i}
            className="w-full h-16 rounded-xl bg-slate-100 border border-slate-200/60 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-12 text-center rounded-xl bg-white/60',
        className
      )}
    >
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
      <p className="text-xs font-medium text-slate-500">{message}</p>
    </div>
  );
};
