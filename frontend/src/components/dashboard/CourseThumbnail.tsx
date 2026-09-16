import React from 'react';
import {
  Cpu,
  Server,
  Sigma,
  Bot,
  Dna,
  Rocket,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CourseThumbnailProps {
  category?: string;
  code?: string;
  className?: string;
}

export const CourseThumbnail: React.FC<CourseThumbnailProps> = ({
  category = 'Computer Science & AI',
  code,
  className,
}) => {
  // Controlled pastel palette mapping per category
  const getTheme = () => {
    const cat = category.toLowerCase();
    if (cat.includes('ai') || cat.includes('neural') || cat.includes('intelligence')) {
      return {
        bg: 'bg-[#E7DFFF]', // Soft lavender
        border: 'border-[#DDD6FE]',
        badgeBg: 'bg-white/80',
        badgeText: 'text-[#5B21B6]',
        accent: 'text-[#7C3AED]',
        lineColor: '#C4B5FD',
        icon: Cpu,
        label: 'Machine Intelligence',
      };
    }
    if (cat.includes('computer') || cat.includes('systems') || cat.includes('cloud') || cat.includes('network')) {
      return {
        bg: 'bg-[#DCEEFF]', // Soft blue
        border: 'border-[#BFDBFE]',
        badgeBg: 'bg-white/80',
        badgeText: 'text-[#1E40AF]',
        accent: 'text-[#2563EB]',
        lineColor: '#93C5FD',
        icon: Server,
        label: 'Computer Science',
      };
    }
    if (cat.includes('math') || cat.includes('calculus') || cat.includes('probability') || cat.includes('data')) {
      return {
        bg: 'bg-[#F8F0C8]', // Soft yellow
        border: 'border-[#FDE68A]',
        badgeBg: 'bg-white/80',
        badgeText: 'text-[#854D0E]',
        accent: 'text-[#D97706]',
        lineColor: '#FCD34D',
        icon: Sigma,
        label: 'Applied Mathematics',
      };
    }
    if (cat.includes('robot') || cat.includes('hardware') || cat.includes('spatial') || cat.includes('science')) {
      return {
        bg: 'bg-[#DDF4EA]', // Soft mint
        border: 'border-[#A7F3D0]',
        badgeBg: 'bg-white/80',
        badgeText: 'text-[#065F46]',
        accent: 'text-[#059669]',
        lineColor: '#6EE7B7',
        icon: Bot,
        label: 'Spatial & Robotics',
      };
    }
    if (cat.includes('bio') || cat.includes('health') || cat.includes('genom')) {
      return {
        bg: 'bg-[#F6DFEC]', // Soft pink
        border: 'border-[#FBCFE8]',
        badgeBg: 'bg-white/80',
        badgeText: 'text-[#9D174D]',
        accent: 'text-[#DB2777]',
        lineColor: '#F472B6',
        icon: Dna,
        label: 'Computational Bio',
      };
    }
    return {
      bg: 'bg-[#FBE1D8]', // Soft peach
      border: 'border-[#FED7AA]',
      badgeBg: 'bg-white/80',
      badgeText: 'text-[#9A3412]',
      accent: 'text-[#EA580C]',
      lineColor: '#FDBA74',
      icon: Rocket,
      label: 'Deep Venture',
    };
  };

  const theme = getTheme();
  const Icon = theme.icon;

  return (
    <div
      className={cn(
        'relative w-full h-36 sm:h-40 overflow-hidden select-none flex flex-col justify-between p-4 border-b border-[#E7E7F0]/60 transition-colors',
        theme.bg,
        className
      )}
    >
      {/* Refined Academic Geometric Background Grid & Iso Shapes */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            <pattern id={`pat-${theme.label.replace(/\s+/g, '')}`} width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={theme.lineColor} />
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke={theme.lineColor} strokeWidth="0.75" strokeDasharray="3 3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pat-${theme.label.replace(/\s+/g, '')})`} />
        </svg>
      </div>

      {/* Decorative subtle ambient soft circle */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/40 blur-xl pointer-events-none" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className={cn('flex items-center gap-1.5 px-2.5 py-1 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] border border-white/60 text-[11px] font-semibold tracking-tight', theme.badgeBg, theme.badgeText)}>
          <Icon className="w-3.5 h-3.5" />
          <span>{code || theme.label}</span>
        </div>

        <div className="w-7 h-7 rounded-xl bg-white/80 border border-white/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)] flex items-center justify-center text-slate-600">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Center Illustrated Motif */}
      <div className="relative z-10 flex items-center justify-center py-1 opacity-70">
        <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-xs border border-white/80 shadow-[0_2px_8px_0_rgba(0,0,0,0.03)] flex items-center justify-center">
          <Icon className={cn('w-6 h-6', theme.accent)} />
        </div>
      </div>

      {/* Bottom Center Graphic Discipline Pill */}
      <div className="relative z-10 flex items-center justify-between mt-auto pt-1">
        <span className="text-[11px] font-medium text-slate-700/80 tracking-tight">
          Shreenil Faculty Series
        </span>
        <span className={cn('w-2 h-2 rounded-full shadow-xs', theme.accent, 'bg-current')} />
      </div>
    </div>
  );
};
