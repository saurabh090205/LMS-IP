import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { LucideIcon } from 'lucide-react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface DropdownProps {
  trigger: ReactNode;
  items?: DropdownItem[];
  children?: ReactNode;
  align?: 'left' | 'right';
  className?: string;
  menuClassName?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  children,
  align = 'right',
  className,
  menuClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={cn(
            'absolute z-50 mt-1.5 w-56 rounded-2xl bg-white border border-[#E7E7F0] p-1.5 shadow-[0_4px_20px_0_rgba(0,0,0,0.06)] animate-in fade-in-50 zoom-in-95 focus:outline-none',
            align === 'right' ? 'right-0' : 'left-0',
            menuClassName
          )}
        >
          {items
            ? items.map((item) => {
                if (item.divider) {
                  return <div key={item.id} className="my-1 border-t border-slate-100" />;
                }
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    disabled={item.disabled}
                    onClick={() => {
                      if (!item.disabled) {
                        item.onClick?.();
                        setIsOpen(false);
                      }
                    }}
                    className={cn(
                      'w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors text-left',
                      item.danger
                        ? 'text-rose-600 hover:bg-rose-50'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
                      item.disabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4 shrink-0 text-slate-400" />}
                    <span>{item.label}</span>
                  </button>
                );
              })
            : children}
        </div>
      )}
    </div>
  );
};
