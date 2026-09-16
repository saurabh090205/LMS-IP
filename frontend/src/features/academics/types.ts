export type DeliveryMode = 'THEORY' | 'LAB' | 'TUTORIAL' | 'PROJECT' | 'INTERNSHIP';

export interface AssessmentHeadWeight {
  head: string; // e.g., 'CA', 'MSA', 'ESE(R)', 'ESE TH(W)', 'LAB', 'CP', 'GD/PPT', 'HA', 'VIVA', 'CVV'
  name: string;
  maxMarks?: number;
  convertedMarks?: number;
  weightagePercent?: number;
}

export interface AssessmentSchemeDetails {
  heads: AssessmentHeadWeight[];
  totalMarks: number;
  bloomsLevels?: string[]; // e.g. ['L2 Understanding', 'L3 Apply', 'L3 Design', 'L4 Analyze', 'L5 Evaluate']
  description?: string;
}

export interface ReferenceBookItem {
  id: string;
  authors: string;
  title: string;
  edition?: string;
  publisher: string;
  year: number | string;
  isbn?: string;
  format?: 'PRINT' | 'ELECTRONIC';
  url?: string;
}

export interface MoocResourceItem {
  id: string;
  title: string;
  platform: string; // e.g. 'NPTEL', 'Coursera', 'edX', 'Udemy', 'fast.ai', 'LinkedIn Learning'
  url: string;
  instructorOrOrg?: string;
}

export interface ProjectAreaItem {
  id: string;
  title: string;
  description?: string;
  domain?: string;
}

export interface CourseOutcomeItem {
  code: string; // e.g. 'CO1', 'CO2'
  description: string;
  bloomsLevel?: string;
  attainmentTarget?: string;
}

export interface CurriculumTopic {
  id: string;
  unitId: string;
  title: string;
  orderIndex: number;
  estimatedMinutes?: number;
  subtopics?: string[];
}

export interface CurriculumUnit {
  id: string;
  courseId: string;
  unitNumber: number | string; // 'Unit-I', 'Unit-II', etc.
  title: string;
  teachingHours: number;
  section?: 'Section 1' | 'Section 2' | string;
  orderIndex: number;
  topics: CurriculumTopic[];
  caseStudies?: string[];
}

export interface CurriculumPractical {
  id: string;
  courseId: string;
  practicalNumber: number;
  title: string;
  description?: string;
  tasks?: string[];
  datasetUsed?: string;
}

export interface CurriculumCourse {
  id: string;
  // Source fidelity: support both course-structure code and syllabus-template code if they differ in source
  canonicalCode: string; // primary display code
  courseStructureCode?: string; // code in FF No. 653
  syllabusTemplateCode?: string; // code in FF No. 654
  title: string;
  altTitle?: string;
  credits: number;
  teachingScheme: {
    theoryHoursPerWeek: number;
    labHoursPerWeek: number;
    tutorialHoursPerWeek: number;
  };
  category: string; // e.g. 'PCC: Program Core Course', 'PEC: Program Elective Course', 'MDM3', 'OE'
  nepClassification?: string;
  prerequisites: string[];
  objectives: string[];
  relevance: string;
  units: CurriculumUnit[];
  practicals?: CurriculumPractical[];
  tutorials?: string[];
  projectAreas?: ProjectAreaItem[];
  assessmentScheme: AssessmentSchemeDetails;
  textbooks: ReferenceBookItem[];
  referenceBooks: ReferenceBookItem[];
  moocs: MoocResourceItem[];
  courseOutcomes: CourseOutcomeItem[];
  futureCourseMapping?: string[];
  jobMapping?: string[];
}

export interface AcademicModule {
  id: string;
  academicYearId: string;
  yearLevel: 'F.Y. B.Tech' | 'S.Y. B.Tech' | 'T.Y. B.Tech' | 'Final Year B.Tech' | string;
  moduleCode: 'Module I' | 'Module II' | 'Module III' | 'Module IV' | 'Module V' | 'Module VI' | 'Module VII' | 'Module VIII' | string;
  title: string;
  totalCredits: number;
  courses: CurriculumCourse[];
}

export interface AcademicYear {
  id: string;
  programId: string;
  code: string; // e.g. 'AY 2026-27'
  name: string;
  effectiveFrom: string;
  modules: AcademicModule[];
}

export interface Program {
  id: string;
  institutionId: string;
  name: string;
  degree: 'B.Tech' | 'M.Tech' | 'B.Sc' | 'Ph.D' | string;
  department: string;
  boardOfStudies: string;
  programEducationalObjectives: { id: string; focus: string; statement: string }[];
  programOutcomes: { id: string; title: string; description: string }[];
  programSpecificOutcomes: { id: string; title: string; description: string }[];
  academicYears: AcademicYear[];
}

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  affiliation: string;
  trustName: string;
  vision: string;
  mission: string[];
  programs: Program[];
}
