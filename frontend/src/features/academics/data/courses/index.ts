import { deepLearningCourse } from './deepLearning';
import { operatingSystemCourse } from './operatingSystem';
import { mlopsCourse } from './mlops';
import { distributedFederatedLearningCourse } from './distributedFederatedLearning';
import { ethicalResponsibleAICourse } from './ethicalResponsibleAI';
import { informationSecurityCourse } from './informationSecurity';
import { automataTheoryCourse } from './automataTheory';
import { designThinkingPLMCourse } from './designThinkingPLM';
import { generativeAICourse } from './generativeAI';
import { naturalLanguageProcessingCourse } from './naturalLanguageProcessing';
import { imageProcessingCourse } from './imageProcessing';
import { CurriculumCourse } from '../../types';

export {
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
};

export const allCurriculumCourses: CurriculumCourse[] = [
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
];

export function getCourseByCodeOrId(identifier: string): CurriculumCourse | undefined {
  const norm = identifier.toLowerCase().replace(/[\s-_:]+/g, '');
  return allCurriculumCourses.find((course) => {
    const idMatch = course.id.toLowerCase().replace(/[\s-_:]+/g, '') === norm;
    const canonMatch = course.canonicalCode.toLowerCase().replace(/[\s-_:]+/g, '') === norm;
    const structMatch = course.courseStructureCode?.toLowerCase().replace(/[\s-_:]+/g, '') === norm;
    const templateMatch = course.syllabusTemplateCode?.toLowerCase().replace(/[\s-_:]+/g, '') === norm;
    const titleMatch = course.title.toLowerCase().replace(/[\s-_:]+/g, '') === norm;
    return idMatch || canonMatch || structMatch || templateMatch || titleMatch;
  });
}
