import React, { TextareaHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  maxCharacters?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, maxCharacters, className, id, value, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const charCount = typeof value === 'string' ? value.length : 0;

    return (
      <div className="w-full flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          {label && (
            <label htmlFor={textareaId} className="text-xs font-semibold text-slate-700 select-none">
              {label}
              {props.required && <span className="text-rose-500 ml-1">*</span>}
            </label>
          )}
          {maxCharacters && (
            <span className="text-xs text-slate-400">
              {charCount}/{maxCharacters}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          id={textareaId}
          value={value}
          className={cn(
            'w-full rounded-xl border bg-white px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.02)] focus:outline-none focus:ring-2 focus:ring-[#EEF0FF] focus:border-[#4F46E5] disabled:bg-[#F6F6FB] disabled:text-slate-400 min-h-[96px] resize-y',
            error ? 'border-rose-300 focus:ring-rose-100 focus:border-rose-500' : 'border-[#E7E7F0] hover:border-[#D8D8E5]',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-600 mt-0.5">{error}</p>
        ) : hint ? (
          <p className="text-xs text-slate-500 mt-0.5">{hint}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
