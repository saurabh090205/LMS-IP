import React from 'react';
import { cn } from '../../lib/utils';
import { ComponentVariant } from '../../types/common';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: ComponentVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = false,
  variant = 'primary',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const barHeight = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }[size];

  const variantColors: Record<ComponentVariant, string> = {
    primary: 'bg-indigo-600',
    secondary: 'bg-slate-600',
    outline: 'bg-indigo-400',
    ghost: 'bg-slate-400',
    danger: 'bg-rose-500',
    neutral: 'bg-slate-900',
  };

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-700">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-slate-500 font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-slate-100 overflow-hidden', barHeight)}>
        <div
          className={cn('h-full rounded-full transition-all duration-300 ease-out', variantColors[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};
