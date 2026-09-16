import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Users,
  ArrowRight,
  Bookmark,
  MoreVertical,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { Course } from '../../types/lms';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { CourseThumbnail } from './CourseThumbnail';
import { cn } from '../../lib/utils';
import { useToast } from '../../context/ToastContext';

export interface CourseCardProps {
  course: Course;
  role?: 'student' | 'teacher';
  onActionClick?: () => void;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  role = 'student',
  onActionClick,
  className,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { addToast } = useToast();

  const handleBookmarkToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    addToast({
      title: !isBookmarked ? 'Course Bookmarked' : 'Bookmark Removed',
      description: `${course.title} added to quick bookmarks.`,
      type: 'info',
    });
  };

  const getCategoryBadgeVariant = (cat: string = ''): 'blue' | 'lavender' | 'mint' | 'peach' | 'yellow' | 'pink' => {
    const c = cat.toLowerCase();
    if (c.includes('ai') || c.includes('neural') || c.includes('intelligence')) return 'lavender';
    if (c.includes('computer') || c.includes('software') || c.includes('systems')) return 'blue';
    if (c.includes('math') || c.includes('calculus') || c.includes('probability')) return 'yellow';
    if (c.includes('robot') || c.includes('spatial') || c.includes('science')) return 'mint';
    if (c.includes('bio') || c.includes('health')) return 'pink';
    return 'peach';
  };

  const statusVariant = {
    PUBLISHED: 'success',
    DRAFT: 'warning',
    ARCHIVED: 'neutral',
  }[course.status || 'PUBLISHED'] as 'success' | 'warning' | 'neutral';

  return (
    <Card
      hoverable
      onClick={onActionClick}
      className={cn(
        'group flex flex-col h-full overflow-hidden border-[#E7E7F0] hover:border-[#D8D8E5] hover:shadow-[0_4px_16px_0_rgba(31,41,55,0.04)] transition-all duration-200 bg-white rounded-2xl',
        className
      )}
    >
      {/* Visual Thumbnail Banner */}
      <div className="relative">
        <CourseThumbnail category={course.category} code={course.code} />

        {/* Bookmark Overlay Button */}
        <button
          type="button"
          onClick={handleBookmarkToggle}
          className="absolute top-3 right-3 p-1.5 rounded-xl bg-white/80 backdrop-blur-xs text-slate-600 hover:text-amber-500 hover:bg-white transition-colors z-20 border border-white/60 shadow-[0_1px_2px_0_rgba(0,0,0,0.03)]"
          title={isBookmarked ? 'Remove bookmark' : 'Bookmark course'}
        >
          <Bookmark className={cn('w-3.5 h-3.5', isBookmarked && 'fill-amber-400 text-amber-500')} />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3.5">
        <div className="flex flex-col gap-2">
          {/* Category & Status Bar */}
          <div className="flex items-center justify-between gap-2">
            <Badge variant={getCategoryBadgeVariant(course.category)} size="sm">
              {course.category || 'Computer Science'}
            </Badge>

            {role === 'teacher' ? (
              <Badge variant={statusVariant} size="sm" dot>
                {course.status}
              </Badge>
            ) : (
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                {course.difficulty || 'ADVANCED'}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug group-hover:text-[#4F46E5] transition-colors line-clamp-2 tracking-tight">
            {course.title}
          </h3>

          {/* Short Narrative */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>

          {/* Instructor and Metadata Pill Strip */}
          <div className="flex items-center gap-2 text-xs text-slate-600 pt-1">
            <Avatar name={course.instructorName || 'Dr. Elena Rostova'} size="sm" />
            <span className="font-medium text-slate-700 truncate text-xs">
              {course.instructorName || 'Dr. Elena Rostova'}
            </span>
          </div>

          {/* Meta specs (lessons, duration) */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
            <span className="flex items-center gap-1 font-normal">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {course.modulesCount || 4} Modules
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-normal">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {course.durationHours || 48}h Duration
            </span>
          </div>
        </div>

        {/* Bottom Section: Progress Bar & CTA */}
        <div className="flex flex-col gap-2.5 pt-3 border-t border-[#F1F1F8] mt-auto">
          {course.progress !== undefined && course.progress > 0 ? (
            <div className="flex flex-col gap-1">
              <ProgressBar
                value={course.progress}
                showPercentage
                label={role === 'student' ? 'Syllabus Progress' : 'Cohort Completion'}
              />
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                {course.enrolledStudentsCount || 62} Scholars
              </span>
              <span className="font-medium text-[#4F46E5] text-xs">Open Access</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-between font-medium hover:bg-[#EEF0FF]/50 hover:text-[#4F46E5] hover:border-[#D0D7FF]"
            onClick={(e) => {
              e.stopPropagation();
              onActionClick?.();
            }}
          >
            <span>{role === 'student' ? 'Continue Learning' : 'Manage Curriculum'}</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5] group-hover:translate-x-0.5 transition-all" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
