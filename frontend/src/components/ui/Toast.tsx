import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useToast, ToastMessage } from '../../context/ToastContext';
import { cn } from '../../lib/utils';
import { StatusType } from '../../types/common';

export const ToastItem: React.FC<{ toast: ToastMessage; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  const iconMap: Record<StatusType, React.ReactNode> = {
    info: <Info className="w-5 h-5 text-sky-500 shrink-0" />,
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    danger: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
  };

  const type = toast.type || 'info';

  return (
    <div
      role="alert"
      className="flex items-start gap-3 w-full max-w-sm rounded-xl border border-slate-200 bg-white p-4 shadow-lg ring-1 ring-black/5 animate-in slide-in-from-top-2 fade-in duration-200"
    >
      {iconMap[type]}
      <div className="flex-1 flex flex-col gap-0.5">
        <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
        {toast.description && <p className="text-xs text-slate-500">{toast.description}</p>}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Dismiss toast"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-auto">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
};
