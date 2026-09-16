import { Course, CourseStatus } from '../types/lms';
import { mockCourses } from '../features/courses/mockData';

class CourseService {
  private courses: Course[] = [...mockCourses];

  async getCourses(filters?: { status?: CourseStatus; category?: string; search?: string; instructorId?: string }): Promise<Course[]> {
    let result = [...this.courses];

    if (filters?.status) {
      result = result.filter((c) => c.status === filters.status);
    }
    if (filters?.category && filters.category !== 'ALL') {
      result = result.filter((c) => c.category === filters.category);
    }
    if (filters?.instructorId) {
      result = result.filter((c) => c.instructorId === filters.instructorId);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getCourseById(id: string): Promise<Course | undefined> {
    return this.courses.find((c) => c.id === id);
  }

  async createCourse(data: Omit<Course, 'id' | 'enrolledStudentsCount' | 'modulesCount' | 'lastUpdated'>): Promise<Course> {
    const id = `crs-${Date.now()}`;
    const newCourse: Course = {
      ...data,
      id,
      enrolledStudentsCount: 0,
      modulesCount: 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      progress: 0,
    };
    this.courses.unshift(newCourse);
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const idx = this.courses.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Course not found: ${id}`);

    this.courses[idx] = {
      ...this.courses[idx],
      ...updates,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    return this.courses[idx];
  }

  async updateCourseStatus(id: string, status: CourseStatus): Promise<Course> {
    return this.updateCourse(id, { status });
  }

  async enrollCourse(id: string): Promise<Course> {
    const course = await this.getCourseById(id);
    if (!course) throw new Error(`Course not found: ${id}`);
    return this.updateCourse(id, {
      isEnrolled: true,
      enrolledStudentsCount: course.enrolledStudentsCount + 1,
      progress: 0,
    });
  }
}

export const courseService = new CourseService();
