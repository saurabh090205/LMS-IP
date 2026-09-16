import { describe, it, expect } from 'vitest';
import { courseService } from '../courseService';
import { moduleService } from '../moduleService';
import { lessonService } from '../lessonService';
import { assignmentService } from '../assignmentService';
import { quizService } from '../quizService';
import { gradeService } from '../gradeService';
import { allCurriculumCourses, getCourseByCodeOrId } from '../../features/academics/data/courses';

describe('Core LMS Services with Real VIT Curriculum', () => {
  it('should verify real curriculum course registry contains Deep Learning and Module V subjects', () => {
    expect(allCurriculumCourses.length).toBeGreaterThanOrEqual(8);
    const dl = getCourseByCodeOrId('CI3001');
    expect(dl).toBeDefined();
    expect(dl?.title).toBe('Deep Learning');
    expect(dl?.canonicalCode).toBe('CI3001');
    expect(dl?.syllabusTemplateCode).toBe('CI3201');
    expect(dl?.credits).toBe(4);
    expect(dl?.units.length).toBe(6);
    expect(dl?.practicals?.length).toBe(10);
    expect(dl?.projectAreas?.length).toBe(18);
  });

  it('should fetch published courses matching real VIT course codes', async () => {
    const courses = await courseService.getCourses({ status: 'PUBLISHED' });
    expect(courses.length).toBeGreaterThan(0);
    expect(courses.some((c) => c.code === 'CI3001')).toBe(true);
    expect(courses.some((c) => c.code === 'CI3202')).toBe(true);
  });

  it('should get course details by id', async () => {
    const course = await courseService.getCourseById('ci3001');
    expect(course).toBeDefined();
    expect(course?.title).toBe('Deep Learning');
    expect(course?.difficulty).toBe('ADVANCED');
    expect(course?.modulesCount).toBe(6);
  });

  it('should enroll in a course', async () => {
    const enrolled = await courseService.enrollCourse('ci4001');
    expect(enrolled.isEnrolled).toBe(true);
    expect(enrolled.enrolledStudentsCount).toBeGreaterThan(0);
  });

  it('should load real curriculum units for Deep Learning', async () => {
    const modules = await moduleService.getModulesByCourse('ci3001');
    expect(modules.length).toBe(6);
    expect(modules[0].title).toContain('Unit-I: Fundamental of Deep Learning');
    expect(modules[2].title).toContain('Unit-III: RNN, LSTM and GRU Architectures');
  });

  it('should submit an assignment and retrieve submission', async () => {
    const sub = await assignmentService.submitAssignment('asg-dl-prac-3', {
      studentId: 'usr_std_101',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@shreenil.edu',
      textResponse: 'Completed custom training loop with tf.GradientTape for practical 3.',
    });
    expect(sub.id).toBeDefined();
    expect(sub.status).toBe('PENDING');

    const asg = await assignmentService.getAssignmentById('asg-dl-prac-3');
    expect(asg?.status).toBe('SUBMITTED');
  });

  it('should evaluate and submit quiz attempt accurately', async () => {
    const attempt = await quizService.submitQuizAttempt(
      'quiz-101',
      'usr_std_101',
      { 'q-1': '2', 'q-2': '0', 'q-3': '1', 'q-4': '0', 'q-5': 'Overfitting' },
      180
    );
    expect(attempt.score).toBeGreaterThan(15);
    expect(attempt.passed).toBe(true);
    expect(attempt.percentage).toBeGreaterThanOrEqual(75);
  });

  it('should fetch gradebook matrix and grade submissions in queue', async () => {
    const pending = await gradeService.getPendingSubmissions();
    expect(pending.length).toBeGreaterThan(0);

    const first = pending[0];
    const graded = await gradeService.gradeSubmission(first.id, 96, 'Great proofs and confusion matrix', 'Dr. Elena Rostova');
    expect(graded.status).toBe('GRADED');
    expect(graded.marksAwarded).toBe(96);
  });
});
