import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
import { ComponentSize } from '../../types/common';

export type BadgeVariant =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'info'
  | 'purple'
  | 'blue'
  | 'lavender'
  | 'mint'
  | 'peach'
  | 'yellow'
  | 'pink';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: ComponentSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'neutral',
  size = 'md',
  dot = false,
  ...props
}) => {
  const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string; border: string }> = {
    primary: {
      bg: 'bg-[#EEF0FF]',
      text: 'text-[#3730A3] font-semibold',
      dot: 'bg-[#4F46E5]',
      border: 'border-[#D0D7FF]',
    },
    success: {
      bg: 'bg-[#DDF4EA]',
      text: 'text-[#065F46] font-semibold',
      dot: 'bg-[#059669]',
      border: 'border-[#A7F3D0]',
    },
    mint: {
      bg: 'bg-[#DDF4EA]',
      text: 'text-[#065F46] font-semibold',
      dot: 'bg-[#059669]',
      border: 'border-[#A7F3D0]',
    },
    warning: {
      bg: 'bg-[#F8F0C8]',
      text: 'text-[#854D0E] font-semibold',
      dot: 'bg-[#D97706]',
      border: 'border-[#FDE68A]',
    },
    yellow: {
      bg: 'bg-[#F8F0C8]',
      text: 'text-[#854D0E] font-semibold',
      dot: 'bg-[#D97706]',
      border: 'border-[#FDE68A]',
    },
    danger: {
      bg: 'bg-[#FBE1D8]',
      text: 'text-[#9A3412] font-semibold',
      dot: 'bg-[#EA580C]',
      border: 'border-[#FED7AA]',
    },
    peach: {
      bg: 'bg-[#FBE1D8]',
      text: 'text-[#9A3412] font-semibold',
      dot: 'bg-[#EA580C]',
      border: 'border-[#FED7AA]',
    },
    info: {
      bg: 'bg-[#DCEEFF]',
      text: 'text-[#1E40AF] font-semibold',
      dot: 'bg-[#2563EB]',
      border: 'border-[#BFDBFE]',
    },
    blue: {
      bg: 'bg-[#DCEEFF]',
      text: 'text-[#1E40AF] font-semibold',
      dot: 'bg-[#2563EB]',
      border: 'border-[#BFDBFE]',
    },
    purple: {
      bg: 'bg-[#E7DFFF]',
      text: 'text-[#5B21B6] font-semibold',
      dot: 'bg-[#7C3AED]',
      border: 'border-[#DDD6FE]',
    },
    lavender: {
      bg: 'bg-[#E7DFFF]',
      text: 'text-[#5B21B6] font-semibold',
      dot: 'bg-[#7C3AED]',
      border: 'border-[#DDD6FE]',
    },
    pink: {
      bg: 'bg-[#F6DFEC]',
      text: 'text-[#9D174D] font-semibold',
      dot: 'bg-[#DB2777]',
      border: 'border-[#FBCFE8]',
    },
    neutral: {
      bg: 'bg-[#F3F4F9]',
      text: 'text-[#4B5563] font-medium',
      dot: 'bg-[#9CA3AF]',
      border: 'border-[#E7E7F0]',
    },
  };

  const sizeStyles: Record<ComponentSize, string> = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-0.5 gap-1.5',
    lg: 'text-xs px-3 py-1 font-semibold gap-2',
  };

  const currentVariant = variantStyles[variant] || variantStyles.neutral;

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border leading-none select-none transition-colors tracking-tight',
        currentVariant.bg,
        currentVariant.text,
        currentVariant.border,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', currentVariant.dot)} />}
      {children}
    </span>
  );
};
