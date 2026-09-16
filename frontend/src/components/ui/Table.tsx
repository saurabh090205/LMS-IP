import React, { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export const Table: React.FC<TableHTMLAttributes<HTMLTableElement>> = ({ className, ...props }) => (
  <div className="w-full overflow-x-auto rounded-2xl border border-[#E7E7F0] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.02)]">
    <table className={cn('w-full caption-bottom text-sm text-left', className)} {...props} />
  </div>
);

export const TableHeader: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <thead className={cn('bg-[#F6F6FB] border-b border-[#E7E7F0] text-[11px] font-semibold text-slate-500 uppercase tracking-wider', className)} {...props} />
);

export const TableBody: React.FC<HTMLAttributes<HTMLTableSectionElement>> = ({ className, ...props }) => (
  <tbody className={cn('divide-y divide-[#F1F1F8] bg-white text-slate-700', className)} {...props} />
);

export const TableRow: React.FC<HTMLAttributes<HTMLTableRowElement>> = ({ className, ...props }) => (
  <tr className={cn('hover:bg-[#F6F6FB]/80 transition-colors', className)} {...props} />
);

export const TableHead: React.FC<ThHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <th className={cn('px-4 py-3.5 text-xs font-semibold text-slate-600', className)} {...props} />
);

export const TableCell: React.FC<TdHTMLAttributes<HTMLTableCellElement>> = ({ className, ...props }) => (
  <td className={cn('px-4 py-3.5 text-xs sm:text-sm text-slate-700 align-middle', className)} {...props} />
);
