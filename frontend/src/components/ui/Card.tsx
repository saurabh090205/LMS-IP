import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hoverable = false, ...props }) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[#E7E7F0] bg-white text-slate-800 transition-all duration-150 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]',
        hoverable && 'hover:shadow-[0_4px_16px_0_rgba(31,41,55,0.04)] hover:border-[#D8D8E5] hover:-translate-y-0.5 cursor-pointer',
        className
      )}
      {...props}
    />
  );
};

export const CardHeader: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col gap-1.5 p-5 sm:p-6 border-b border-[#F1F1F8]', className)} {...props} />
);

export const CardTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = ({ className, ...props }) => (
  <h3 className={cn('text-sm sm:text-base font-semibold text-slate-800 leading-snug tracking-tight', className)} {...props} />
);

export const CardDescription: React.FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={cn('text-xs text-slate-500 leading-normal', className)} {...props} />
);

export const CardContent: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('p-5 sm:p-6', className)} {...props} />
);

export const CardFooter: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex items-center p-5 sm:p-6 pt-0 border-t border-[#F1F1F8] mt-auto', className)} {...props} />
);
