import { Module, Lesson } from '../types/lms';
import { mockModules } from '../features/modules/mockData';

class ModuleService {
  private modulesMap: Record<string, Module[]> = { ...mockModules };

  async getModulesByCourse(courseId: string): Promise<Module[]> {
    return this.modulesMap[courseId] || [];
  }

  async createModule(courseId: string, title: string, description?: string): Promise<Module> {
    if (!this.modulesMap[courseId]) {
      this.modulesMap[courseId] = [];
    }
    const currentList = this.modulesMap[courseId];
    const newModule: Module = {
      id: `mod-${Date.now()}`,
      courseId,
      title,
      description,
      orderIndex: currentList.length + 1,
      lessonsCount: 0,
      durationMinutes: 0,
      progress: 0,
      lessons: [],
    };
    currentList.push(newModule);
    return newModule;
  }

  async updateModule(courseId: string, moduleId: string, updates: Partial<Module>): Promise<Module> {
    const list = this.modulesMap[courseId] || [];
    const idx = list.findIndex((m) => m.id === moduleId);
    if (idx === -1) throw new Error(`Module ${moduleId} not found`);

    list[idx] = { ...list[idx], ...updates };
    return list[idx];
  }

  async deleteModule(courseId: string, moduleId: string): Promise<void> {
    if (!this.modulesMap[courseId]) return;
    this.modulesMap[courseId] = this.modulesMap[courseId].filter((m) => m.id !== moduleId);
  }

  async reorderModules(courseId: string, moduleIds: string[]): Promise<Module[]> {
    const list = this.modulesMap[courseId] || [];
    const reordered = moduleIds
      .map((id, index) => {
        const mod = list.find((m) => m.id === id);
        if (mod) {
          return { ...mod, orderIndex: index + 1 };
        }
        return null;
      })
      .filter((m): m is Module => m !== null);

    this.modulesMap[courseId] = reordered;
    return reordered;
  }
}

export const moduleService = new ModuleService();
