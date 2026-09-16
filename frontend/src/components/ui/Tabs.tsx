import React, { createContext, useContext, useState } from 'react';
import { cn } from '../../lib/utils';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  const [internalTab, setInternalTab] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalTab;

  const setActiveTab = (tab: string) => {
    if (value === undefined) {
      setInternalTab(tab);
    }
    onValueChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full flex flex-col', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      'flex items-center gap-1 border-b border-[#E7E7F0] pb-px mb-4 overflow-x-auto no-scrollbar',
      className
    )}
  >
    {children}
  </div>
);

export const TabTrigger: React.FC<{
  value: string;
  children: React.ReactNode;
  className?: string;
  badge?: string | number;
}> = ({ value, children, className, badge }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabTrigger must be used inside Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      type="button"
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'inline-flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap outline-none select-none tracking-tight',
        isActive
          ? 'border-[#4F46E5] text-[#4F46E5] font-semibold'
          : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-[#D8D8E5]',
        className
      )}
    >
      <span>{children}</span>
      {badge !== undefined && (
        <span
          className={cn(
            'px-1.5 py-0.5 text-[10px] font-semibold rounded-full',
            isActive ? 'bg-[#EEF0FF] text-[#3730A3]' : 'bg-[#F3F4F9] text-slate-500'
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};

export const TabContent: React.FC<{ value: string; children: React.ReactNode; className?: string }> = ({
  value,
  children,
  className,
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabContent must be used inside Tabs');

  if (context.activeTab !== value) return null;

  return <div className={cn('animate-in fade-in-50 duration-150', className)}>{children}</div>;
};
