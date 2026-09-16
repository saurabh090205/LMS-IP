import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  CheckCircle,
  GraduationCap,
  Clock,
  Users,
  ArrowRight,
  Filter,
  Sparkles,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { Course } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Tabs, TabList, TabTrigger, TabContent } from '../../components/ui/Tabs';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';

import { CourseCard } from '../../components/dashboard/CourseCard';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [activeTab, setActiveTab] = useState('my-courses');
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourses();
  }, [categoryFilter, search]);

  const loadCourses = async () => {
    const list = await courseService.getCourses({
      status: 'PUBLISHED',
      category: categoryFilter,
      search,
    });
    setCourses(list);
  };

  const enrolledCourses = courses.filter((c) => c.isEnrolled);
  const catalogCourses = courses;

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <PageHeader
        title="Academic Courses"
        subtitle="Explore your active enrolled syllabus modules or browse the university-wide course catalog."
        breadcrumbs={[
          { label: 'Student Portal', href: '/student/dashboard' },
          { label: 'Courses', isCurrent: true },
        ]}
      />

      <Tabs defaultValue="my-courses" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E7E7F0] pb-2 mb-6">
          <TabList className="border-b-0 mb-0 pb-0">
            <TabTrigger value="my-courses" badge={enrolledCourses.length}>
              <BookOpen className="w-4 h-4 mr-1.5" />
              My Enrolled Courses
            </TabTrigger>
            <TabTrigger value="catalog" badge={catalogCourses.length}>
              <GraduationCap className="w-4 h-4 mr-1.5" />
              Browse University Catalog
            </TabTrigger>
          </TabList>

          {/* Search & Category Filter */}
          <div className="flex items-center gap-3">
            <Input
              placeholder="Search courses, keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={Search}
              className="w-full sm:w-64"
            />
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={[
                { label: 'All Disciplines', value: 'ALL' },
                { label: 'Computer Science & AI', value: 'Computer Science & AI' },
                { label: 'Systems & Infrastructure', value: 'Systems & Infrastructure' },
                { label: 'Mathematics', value: 'Mathematics' },
                { label: 'Robotics & Hardware', value: 'Robotics & Hardware' },
              ]}
              className="w-48"
            />
          </div>
        </div>

        {/* MY ENROLLED COURSES TAB */}
        <TabContent value="my-courses">
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  role="student"
                  onActionClick={() => navigate(`/courses/${course.id}`)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={BookOpen}
              title="No courses currently enrolled"
              description="Browse our university catalogue to find courses in AI, Robotics, Systems, and Mathematics."
              action={{
                label: 'Browse Catalog',
                onClick: () => setActiveTab('catalog'),
              }}
            />
          )}
        </TabContent>

        {/* BROWSE CATALOG TAB */}
        <TabContent value="catalog">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {catalogCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                role="student"
                onActionClick={() => navigate(`/courses/${course.id}`)}
              />
            ))}
          </div>
        </TabContent>
      </Tabs>
    </div>
  );
}
