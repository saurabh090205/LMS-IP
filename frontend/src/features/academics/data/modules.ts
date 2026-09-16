import { AcademicModule } from '../types';
import {
  deepLearningCourse,
  operatingSystemCourse,
  mlopsCourse,
  distributedFederatedLearningCourse,
  ethicalResponsibleAICourse,
  informationSecurityCourse,
  automataTheoryCourse,
  designThinkingPLMCourse,
  generativeAICourse,
  naturalLanguageProcessingCourse,
  imageProcessingCourse,
} from './courses';

export const vitModuleV: AcademicModule = {
  id: 'module-v',
  academicYearId: 'ay-2026-27',
  yearLevel: 'T.Y. B.Tech',
  moduleCode: 'Module V',
  title: 'Third Year Module V (T.Y. B.Tech CSE AI)',
  totalCredits: 24,
  courses: [
    deepLearningCourse,
    operatingSystemCourse,
    mlopsCourse,
    distributedFederatedLearningCourse,
    ethicalResponsibleAICourse,
    informationSecurityCourse,
    automataTheoryCourse,
    designThinkingPLMCourse,
  ],
};

export const vitModuleVII: AcademicModule = {
  id: 'module-vii',
  academicYearId: 'ay-2026-27',
  yearLevel: 'Final Year B.Tech',
  moduleCode: 'Module VII',
  title: 'Final Year Module VII (B.Tech CSE AI)',
  totalCredits: 16,
  courses: [
    generativeAICourse,
  ],
};

export const vitModuleVIII: AcademicModule = {
  id: 'module-viii',
  academicYearId: 'ay-2026-27',
  yearLevel: 'Final Year B.Tech',
  moduleCode: 'Module VIII',
  title: 'Final Year Module VIII (B.Tech CSE AI)',
  totalCredits: 16,
  courses: [
    naturalLanguageProcessingCourse,
    imageProcessingCourse,
  ],
};

export const allAcademicModules: AcademicModule[] = [
  vitModuleV,
  vitModuleVII,
  vitModuleVIII,
];
