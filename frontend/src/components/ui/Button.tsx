import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { LucideIcon, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ComponentSize, ComponentVariant } from '../../types/common';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  isLoading?: boolean;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  rightIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none tracking-tight';

    const variantStyles: Record<ComponentVariant, string> = {
      primary: 'bg-[#4F46E5] text-white hover:bg-[#4338CA] shadow-[0_1px_2px_0_rgba(79,70,229,0.2)] active:bg-[#3730A3]',
      secondary: 'bg-white text-slate-700 hover:bg-[#F6F6FB] border border-[#E7E7F0] hover:border-[#D8D8E5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] active:bg-[#F1F1F8]',
      outline: 'bg-white text-slate-700 border border-[#E7E7F0] hover:bg-[#F6F6FB] hover:border-[#D8D8E5] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]',
      ghost: 'bg-transparent text-slate-600 hover:bg-[#F3F4F9] hover:text-slate-900',
      danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm active:bg-rose-800',
      neutral: 'bg-slate-800 text-white hover:bg-slate-900 shadow-sm',
    };

    const sizeStyles: Record<ComponentSize, string> = {
      sm: 'text-xs px-3 py-1.5 min-h-[32px] gap-1.5',
      md: 'text-xs sm:text-sm px-4 py-2 min-h-[40px] gap-2',
      lg: 'text-sm sm:text-base px-5 py-2.5 min-h-[44px] gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          LeftIcon && <LeftIcon className="w-4 h-4 shrink-0" />
        )}
        {children}
        {!isLoading && RightIcon && <RightIcon className="w-4 h-4 shrink-0" />}
      </button>
    );
  }
);

Button.displayName = 'Button';
