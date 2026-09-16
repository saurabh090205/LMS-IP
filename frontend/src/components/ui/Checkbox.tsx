import React, { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, checked, ...props }, ref) => {
    const checkboxId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={checkboxId} className="flex items-start gap-3 cursor-pointer select-none">
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              checked={checked}
              className={cn(
                'peer h-4 w-4 appearance-none rounded border border-slate-300 bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
                error && 'border-rose-400',
                className
              )}
              {...props}
            />
            <Check className="pointer-events-none absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 stroke-[3] transition-opacity" />
          </div>
          {(label || description) && (
            <div className="flex flex-col">
              {label && <span className="text-sm font-medium text-slate-800">{label}</span>}
              {description && <span className="text-xs text-slate-500">{description}</span>}
            </div>
          )}
        </label>
        {error && <p className="text-xs text-rose-600 ml-7">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
