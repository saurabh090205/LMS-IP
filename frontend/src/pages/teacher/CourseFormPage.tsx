import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  BookOpen,
  ArrowLeft,
  Save,
  CheckCircle,
  Calendar,
  Layers,
  Sparkles,
  Image as ImageIcon,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { Course, CourseDifficulty, CourseVisibility } from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useToast } from '../../context/ToastContext';

const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long'),
  code: z.string().min(3, 'Course code is required (e.g., CS-301)'),
  shortDescription: z.string().min(15, 'Please provide a short summary (at least 15 chars)'),
  description: z.string().min(30, 'Full course syllabus description must be at least 30 characters'),
  category: z.string().min(2, 'Please select a discipline category'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  visibility: z.enum(['PUBLIC', 'RESTRICTED', 'PRIVATE']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  thumbnail: z.string().optional(),
  durationHours: z.number().min(1, 'Duration must be at least 1 hour'),
});

type CourseFormData = z.infer<typeof courseSchema>;

export default function CourseFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      difficulty: 'INTERMEDIATE',
      visibility: 'PUBLIC',
      category: 'Computer Science & AI',
      durationHours: 36,
      startDate: '2026-09-01',
      endDate: '2026-12-15',
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      loadCourse(id);
    }
  }, [id, isEditing]);

  const loadCourse = async (courseId: string) => {
    setLoading(true);
    const course = await courseService.getCourseById(courseId);
    if (course) {
      setValue('title', course.title);
      setValue('code', course.code);
      setValue('shortDescription', course.shortDescription);
      setValue('description', course.description);
      setValue('category', course.category);
      setValue('difficulty', course.difficulty);
      setValue('visibility', course.visibility);
      setValue('startDate', course.startDate);
      setValue('endDate', course.endDate);
      setValue('thumbnail', course.thumbnail || '');
      setValue('durationHours', course.durationHours);
    }
    setLoading(false);
  };

  const onSubmit = async (data: CourseFormData, publish = false) => {
    try {
      if (isEditing && id) {
        await courseService.updateCourse(id, {
          ...data,
          status: publish ? 'PUBLISHED' : 'DRAFT',
        });
        addToast({
          title: 'Course Updated',
          description: `"${data.title}" has been saved successfully.`,
          type: 'success',
        });
      } else {
        const newCourse = await courseService.createCourse({
          ...data,
          status: publish ? 'PUBLISHED' : 'DRAFT',
          instructorId: 'usr_tch_202',
          instructorName: 'Dr. Elena Rostova',
          instructorTitle: 'Chair of Machine Intelligence',
        });
        addToast({
          title: publish ? 'Course Published' : 'Draft Created',
          description: `"${newCourse.title}" created successfully. You can now build its modules.`,
          type: 'success',
        });
        navigate(`/teacher/courses/${newCourse.id}/builder`);
        return;
      }
      navigate('/teacher/courses');
    } catch (err) {
      addToast({
        title: 'Error Saving Course',
        description: 'An unexpected error occurred while saving.',
        type: 'danger',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <PageHeader
        title={isEditing ? 'Edit Course Details' : 'Create New Academic Course'}
        subtitle="Specify curriculum metadata, academic level, schedule windows, and access permissions."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'My Courses', href: '/teacher/courses' },
          { label: isEditing ? 'Edit Course' : 'New Course', isCurrent: true },
        ]}
        actions={
          <Link to="/teacher/courses">
            <Button variant="outline" size="sm" leftIcon={ArrowLeft}>
              Back to Courses
            </Button>
          </Link>
        }
      />

      <form onSubmit={handleSubmit((d) => onSubmit(d, false))} className="flex flex-col gap-6">
        {/* Core Metadata Card */}
        <Card className="p-6 flex flex-col gap-5 border-slate-200">
          <CardHeader className="p-0 pb-4 border-b border-slate-100">
            <CardTitle>Course Information</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Course Title"
                placeholder="e.g., Advanced Neural Networks & Deep Learning"
                {...register('title')}
                error={errors.title?.message}
                required
              />
            </div>
            <div>
              <Input
                label="Course Code"
                placeholder="e.g., CS-301"
                {...register('code')}
                error={errors.code?.message}
                required
              />
            </div>
          </div>

          <Input
            label="Short Summary"
            placeholder="A concise overview shown on course catalog cards..."
            {...register('shortDescription')}
            error={errors.shortDescription?.message}
            required
          />

          <Textarea
            label="Full Description & Syllabus Narrative"
            placeholder="Detailed academic overview, topics covered, target audience, and expectations..."
            {...register('description')}
            error={errors.description?.message}
            rows={4}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Academic Category"
              {...register('category')}
              error={errors.category?.message}
              options={[
                { label: 'Computer Science & AI', value: 'Computer Science & AI' },
                { label: 'Systems & Infrastructure', value: 'Systems & Infrastructure' },
                { label: 'Mathematics', value: 'Mathematics' },
                { label: 'Robotics & Hardware', value: 'Robotics & Hardware' },
                { label: 'Bioinformatics & Health', value: 'Bioinformatics & Health' },
                { label: 'Entrepreneurship & Leadership', value: 'Entrepreneurship & Leadership' },
              ]}
            />

            <Select
              label="Difficulty Level"
              {...register('difficulty')}
              error={errors.difficulty?.message}
              options={[
                { label: 'Beginner (100 Level)', value: 'BEGINNER' },
                { label: 'Intermediate (200-300 Level)', value: 'INTERMEDIATE' },
                { label: 'Advanced (400-500 Level)', value: 'ADVANCED' },
              ]}
            />

            <Select
              label="Course Visibility"
              {...register('visibility')}
              error={errors.visibility?.message}
              options={[
                { label: 'Public (All Students)', value: 'PUBLIC' },
                { label: 'Restricted (Cohort Only)', value: 'RESTRICTED' },
                { label: 'Private (Invitation Only)', value: 'PRIVATE' },
              ]}
            />
          </div>
        </Card>

        {/* Schedule & Duration Card */}
        <Card className="p-6 flex flex-col gap-5 border-slate-200">
          <CardHeader className="p-0 pb-4 border-b border-slate-100">
            <CardTitle>Schedule & Term Duration</CardTitle>
          </CardHeader>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              type="date"
              label="Start Date"
              {...register('startDate')}
              error={errors.startDate?.message}
              required
            />

            <Input
              type="date"
              label="End Date"
              {...register('endDate')}
              error={errors.endDate?.message}
              required
            />

            <Input
              type="number"
              label="Total Instructional Hours"
              placeholder="e.g. 48"
              {...register('durationHours', { valueAsNumber: true })}
              error={errors.durationHours?.message}
            />
          </div>
        </Card>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/teacher/courses')}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="secondary"
            leftIcon={Save}
            isLoading={isSubmitting}
          >
            Save Draft
          </Button>

          <Button
            type="button"
            variant="primary"
            leftIcon={CheckCircle}
            isLoading={isSubmitting}
            onClick={handleSubmit((d) => onSubmit(d, true))}
          >
            Publish Course
          </Button>
        </div>
      </form>
    </div>
  );
}
