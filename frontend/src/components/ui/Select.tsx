import React, { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Option } from '../../types/common';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  hint?: string;
  options?: Option[];
  placeholder?: string;
  leftIcon?: LucideIcon | React.ComponentType<{ className?: string }>;
  children?: React.ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, options, placeholder, leftIcon: LeftIcon, children, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-slate-700 select-none">
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
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-800 transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#EEF0FF] focus:border-[#4F46E5] disabled:bg-[#F6F6FB] disabled:text-slate-400 disabled:cursor-not-allowed pr-10',
              error ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-500' : 'border-[#E7E7F0] hover:border-[#D8D8E5]',
              LeftIcon && 'pl-9',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
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

Select.displayName = 'Select';
