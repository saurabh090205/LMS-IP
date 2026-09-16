import { Program } from '../types';
import { vitAcademicYear2026_27 } from './academicYears';

export const btechCseAiProgram: Program = {
  id: 'program-btech-cse-ai',
  institutionId: 'institution-vit',
  name: 'B.Tech. Computer Science & Engineering (Artificial Intelligence)',
  degree: 'B.Tech',
  department: 'Computer Science and Engineering (Artificial Intelligence)',
  boardOfStudies: 'Board of Studies in CSE (Artificial Intelligence)',
  programEducationalObjectives: [
    {
      id: 'PEO1',
      focus: 'Core competence',
      statement: 'Demonstrate core competence in principles of computing and AI based technologies.',
    },
    {
      id: 'PEO2',
      focus: 'Breadth',
      statement: 'Apply AI principles, methodologies, algorithms, and tools, to effectively design, develop, and implement AI-driven solutions.',
    },
    {
      id: 'PEO3',
      focus: 'Professionalism',
      statement: 'Excel as professionalism with the necessary soft skills to work collaboratively in interdisciplinary teams.',
    },
    {
      id: 'PEO4',
      focus: 'Learning Environment',
      statement: 'Aim for continuing education and entrepreneurship in emerging areas of computing and Artificial Intelligence.',
    },
  ],
  programOutcomes: [
    { id: 'PO1', title: 'Engineering knowledge', description: 'Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.' },
    { id: 'PO2', title: 'Problem analysis', description: 'Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.' },
    { id: 'PO3', title: 'Design/development of solutions', description: 'Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.' },
    { id: 'PO4', title: 'Conduct investigations of complex problems', description: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.' },
    { id: 'PO5', title: 'Modern tool usage', description: 'Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.' },
    { id: 'PO6', title: 'The engineer and society', description: 'Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.' },
    { id: 'PO7', title: 'Environment and sustainability', description: 'Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.' },
    { id: 'PO8', title: 'Ethics', description: 'Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.' },
    { id: 'PO9', title: 'Individual and team work', description: 'Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.' },
    { id: 'PO10', title: 'Communication', description: 'Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.' },
    { id: 'PO11', title: 'Project management and finance', description: 'Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.' },
    { id: 'PO12', title: 'Life-long Learning', description: 'Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change.' },
  ],
  programSpecificOutcomes: [
    { id: 'PSO1', title: 'Essential Concepts', description: 'Demonstrate proficiency in essential concepts of computer science and programming solutions.' },
    { id: 'PSO2', title: 'Robust Design & AI Solutions', description: 'Formulate robust software design, execution, and testing strategies employing a software paradigms and Artificial Intelligence knowledge to solve real word problems.' },
    { id: 'PSO3', title: 'Evolving Areas Expertise', description: 'Adapt and exhibit expertise in evolving areas of computer science, engineering and technology.' },
  ],
  academicYears: [vitAcademicYear2026_27],
};

export const allPrograms: Program[] = [btechCseAiProgram];
