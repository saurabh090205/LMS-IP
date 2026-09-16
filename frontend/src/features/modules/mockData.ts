import { Module, Lesson } from '../../types/lms';
import { allCurriculumCourses } from '../academics/data/courses';
import { deepLearningCourse } from '../academics/data/courses/deepLearning';

function buildModulesFromCurriculum(): Record<string, Module[]> {
  const result: Record<string, Module[]> = {};

  allCurriculumCourses.forEach((curriculumCourse) => {
    // We map both canonical ID and lower-case course structure code / ID
    const keys = [
      curriculumCourse.id,
      curriculumCourse.canonicalCode.toLowerCase(),
      curriculumCourse.courseStructureCode?.toLowerCase(),
      curriculumCourse.syllabusTemplateCode?.toLowerCase().replace(/[\s:]+/g, ''),
    ].filter(Boolean) as string[];

    const modules: Module[] = curriculumCourse.units.map((unit, uIdx) => {
      const moduleId = `mod-${curriculumCourse.id}-${uIdx + 1}`;

      const lessons: Lesson[] = unit.topics.map((topic, tIdx) => {
        const lessonId = `lsn-${curriculumCourse.id}-${uIdx + 1}-${tIdx + 1}`;
        const isFirstCourse = curriculumCourse.id === 'course-deep-learning';

        // Provide real detailed text for Unit I topics in Deep Learning
        let contentText: string | undefined;
        let contentType: Lesson['contentType'] = 'TEXT';
        let isCompleted = false;

        if (isFirstCourse && uIdx === 0) {
          if (tIdx === 0) {
            isCompleted = true;
            contentText = `## ${topic.title}

### 1. Evolution of Machine Intelligence
Artificial Intelligence represents the overarching discipline of creating computational systems capable of performing tasks requiring human cognition. Machine Learning introduced statistical optimization where machines learn patterns from empirical data rather than hand-coded rules.

### 2. The Deep Learning Paradigm
Deep Learning utilizes multi-layered artificial neural network representations to automatically discover hierarchical feature abstractions directly from raw sensory data (pixels, audio waveforms, text tokens).

### 3. Key Advantages
- **Automatic Feature Representation**: Eliminates manual handcrafted feature engineering.
- **Scalability with Data & Compute**: Performance continues to scale with larger parameter counts and dataset volumes.
- **Universal Approximation Theorem**: Feedforward neural networks with non-linear activation functions can approximate any continuous function on compact subsets of $\\mathbb{R}^n$.`;
          } else if (tIdx === 1) {
            isCompleted = true;
            contentText = `## ${topic.title}

### 1. Limitations of Classical Machine Learning
- Handcrafted feature extractors (SIFT, HOG, Bag-of-Words) fail to capture rich contextual subtleties.
- Saturated performance asymptotes when exposed to massive data scales.
- Fragility against complex non-linear spatial and temporal transformations.

### 2. Challenges in Deep Learning
- High computational requirements (massive GPU/TPU matrix accelerators required).
- Sample efficiency: Requires extensive labeled training corpora.
- Non-convex optimization landscapes with vanishing/exploding gradients.
- Interpretability and model verification in mission-critical domains.`;
          } else {
            isCompleted = false;
            contentText = `## ${topic.title}

### Official Syllabus Topic Overview
**Unit**: ${unit.unitNumber} — ${unit.title} (${unit.teachingHours} Hours)
**Program**: B.Tech CSE (AI) — AY 2026-27

### Topics Covered:
${unit.topics.map((t) => `- ${t.title}`).join('\n')}

> [!NOTE]
> **Learning Resource Notice**: Interactive video stream and lab notebook for this specific topic are currently scheduled for lecture delivery in accordance with the AY 2026-27 Academic Calendar. The official syllabus topics and recommended textbooks (Buduma, Aggarwal, Chollet) serve as the primary curriculum source.`;
          }
        } else {
          contentText = `## ${topic.title}

### Official Syllabus Topic Overview
**Course**: ${curriculumCourse.title} (${curriculumCourse.canonicalCode})
**Unit**: ${unit.unitNumber} — ${unit.title} (${unit.teachingHours} Hours)
**Section**: ${unit.section || 'General'}

### Topics Covered in this Unit:
${unit.topics.map((t) => `- ${t.title}`).join('\n')}

> [!NOTE]
> **Learning Resource Status**: In development for AY 2026-27. Please refer to prescribed textbooks and official reference materials listed in the course overview.`;
        }

        return {
          id: lessonId,
          moduleId,
          courseId: curriculumCourse.id,
          title: topic.title,
          description: `Topic from ${unit.unitNumber}: ${unit.title}`,
          contentType,
          contentText,
          durationMinutes: Math.round((unit.teachingHours * 60) / unit.topics.length),
          isPublished: true,
          isCompleted,
          orderIndex: tIdx + 1,
        };
      });

      const isFirstCourse = curriculumCourse.id === 'course-deep-learning';
      let progress = 0;
      if (isFirstCourse) {
        if (uIdx === 0) progress = 100;
        else if (uIdx === 1) progress = 60;
        else if (uIdx === 2) progress = 20;
        else progress = 0;
      }

      return {
        id: moduleId,
        courseId: curriculumCourse.id,
        title: `${unit.unitNumber}: ${unit.title}`,
        description: `${unit.teachingHours} Hours • ${unit.topics.length} Syllabus Topics${unit.section ? ` • ${unit.section}` : ''}`,
        orderIndex: uIdx + 1,
        lessonsCount: lessons.length,
        durationMinutes: unit.teachingHours * 60,
        progress,
        lessons,
      };
    });

    keys.forEach((k) => {
      result[k] = modules;
    });
  });

  // Also preserve legacy mock key 'cs301' pointing to deep learning
  result['cs301'] = result['ci3001'] || result['course-deep-learning'];
  result['cs314'] = result['ci3202'] || result['course-operating-system'];

  return result;
}

export const mockModules: Record<string, Module[]> = buildModulesFromCurriculum();
