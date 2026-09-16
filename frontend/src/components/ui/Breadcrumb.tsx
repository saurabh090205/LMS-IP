import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '../../lib/utils';
import { BreadcrumbItem } from '../../types/common';

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true, className }) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-slate-500', className)}>
      <ol className="flex items-center gap-1.5 list-none m-0 p-0 flex-wrap">
        {showHome && (
          <li className="flex items-center gap-1.5">
            <Link
              to="/"
              className="text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1"
              aria-label="Home"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
            {items.length > 0 && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
          </li>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link to={item.href} className="hover:text-slate-800 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className={cn('font-medium', isLast ? 'text-slate-800 font-semibold' : 'text-slate-500')}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
