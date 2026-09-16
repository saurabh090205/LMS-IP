import React, { ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb';
import { BreadcrumbItem } from '../../types/common';
import { cn } from '../../lib/utils';

export interface PageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumbs?: BreadcrumbItem[];
  actions?: ReactNode;
  className?: string;
  badge?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  badge,
}) => {
  return (
    <div className={cn('flex flex-col gap-3 pb-6 border-b border-slate-200/80 mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumb items={breadcrumbs} />}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
              {title}
            </h1>
            {badge}
          </div>
          {subtitle && <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">{subtitle}</p>}
        </div>

        {actions && <div className="flex items-center gap-2.5 flex-wrap shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
