import { Lesson } from '../types/lms';
import { mockModules } from '../features/modules/mockData';

class LessonService {
  async getLessonById(courseId: string, lessonId: string): Promise<Lesson | undefined> {
    const modules = mockModules[courseId] || [];
    for (const mod of modules) {
      const found = mod.lessons?.find((l) => l.id === lessonId);
      if (found) return found;
    }
    return undefined;
  }

  async markLessonComplete(courseId: string, lessonId: string): Promise<Lesson> {
    const modules = mockModules[courseId] || [];
    for (const mod of modules) {
      const found = mod.lessons?.find((l) => l.id === lessonId);
      if (found) {
        found.isCompleted = true;
        // Recalculate module progress
        const completedCount = mod.lessons?.filter((l) => l.isCompleted).length || 0;
        const totalCount = mod.lessons?.length || 1;
        mod.progress = Math.round((completedCount / totalCount) * 100);
        return found;
      }
    }
    throw new Error(`Lesson ${lessonId} not found`);
  }

  async addLessonToModule(courseId: string, moduleId: string, lessonData: Omit<Lesson, 'id' | 'courseId' | 'moduleId' | 'orderIndex'>): Promise<Lesson> {
    const modules = mockModules[courseId] || [];
    const mod = modules.find((m) => m.id === moduleId);
    if (!mod) throw new Error(`Module ${moduleId} not found`);

    if (!mod.lessons) mod.lessons = [];
    const newLesson: Lesson = {
      ...lessonData,
      id: `lsn-${Date.now()}`,
      courseId,
      moduleId,
      orderIndex: mod.lessons.length + 1,
    };
    mod.lessons.push(newLesson);
    mod.lessonsCount = mod.lessons.length;
    mod.durationMinutes += newLesson.durationMinutes || 0;
    return newLesson;
  }
}

export const lessonService = new LessonService();
