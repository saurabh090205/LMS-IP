import { AcademicYear } from '../types';
import { vitModuleV, vitModuleVII, vitModuleVIII } from './modules';

export const vitAcademicYear2026_27: AcademicYear = {
  id: 'ay-2026-27',
  programId: 'program-btech-cse-ai',
  code: 'AY 2026-27',
  name: 'Academic Year 2026-27',
  effectiveFrom: '2026-08-01',
  modules: [vitModuleV, vitModuleVII, vitModuleVIII],
};

export const allAcademicYears: AcademicYear[] = [vitAcademicYear2026_27];
