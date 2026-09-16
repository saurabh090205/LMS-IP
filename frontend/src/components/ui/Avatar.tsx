import React from 'react';
import { cn, formatInitials } from '../../lib/utils';
import { ComponentSize } from '../../types/common';

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: ComponentSize | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'User',
  size = 'md',
  status,
  className,
}) => {
  const sizeStyles: Record<string, string> = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-16 h-16 text-xl',
  };

  const statusSizeStyles: Record<string, string> = {
    sm: 'w-2 h-2 ring-1',
    md: 'w-2.5 h-2.5 ring-2',
    lg: 'w-3 h-3 ring-2',
    xl: 'w-4 h-4 ring-2',
  };

  const statusColors: Record<string, string> = {
    online: 'bg-emerald-500',
    offline: 'bg-slate-400',
    busy: 'bg-rose-500',
    away: 'bg-amber-500',
  };

  return (
    <div className={cn('relative inline-flex shrink-0 select-none items-center justify-center', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-slate-200', sizeStyles[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center border border-indigo-200',
            sizeStyles[size]
          )}
        >
          {formatInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-white',
            statusColors[status],
            statusSizeStyles[size]
          )}
        />
      )}
    </div>
  );
};
