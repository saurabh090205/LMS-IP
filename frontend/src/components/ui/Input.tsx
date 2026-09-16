import React, { InputHTMLAttributes, forwardRef } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  rightIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon: LeftIcon, rightIcon: RightIcon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-slate-700 select-none">
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {LeftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
              <LeftIcon className="w-4 h-4" />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#EEF0FF] focus:border-[#4F46E5] disabled:bg-[#F6F6FB] disabled:text-slate-400 disabled:cursor-not-allowed',
              error ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-500' : 'border-[#E7E7F0] hover:border-[#D8D8E5]',
              LeftIcon && 'pl-9',
              RightIcon && 'pr-9',
              className
            )}
            {...props}
          />
          {RightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-slate-400">
              <RightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
        {error ? (
          <p className="text-xs text-rose-600 mt-0.5">{error}</p>
        ) : hint ? (
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
