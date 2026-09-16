import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  Clock,
  Award,
  Users,
  FileText,
  HelpCircle,
  ArrowRight,
  Sparkles,
  Layers,
  Bell,
  ChevronDown,
  ChevronRight,
  Lock,
  FlaskConical,
  FolderGit2,
  GraduationCap,
  Library,
  ExternalLink,
  Briefcase,
  GitBranch,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { moduleService } from '../../services/moduleService';
import { assignmentService } from '../../services/assignmentService';
import { quizService } from '../../services/quizService';
import { announcementService } from '../../services/announcementService';
import { Course, Module, Assignment, Quiz, CourseAnnouncement } from '../../types/lms';
import { getCourseByCodeOrId, allCurriculumCourses } from '../../features/academics/data/courses';
import { CurriculumCourse } from '../../features/academics/types';
import { CourseLayout } from '../../components/layout/CourseLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Avatar } from '../../components/ui/Avatar';
import { useToast } from '../../context/ToastContext';

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const id = courseId || 'ci3001';
  const [searchParams] = useSearchParams();
  const currentTab = searchParams.get('tab') || 'overview';

  const [course, setCourse] = useState<Course | null>(null);
  const [curriculumCourse, setCurriculumCourse] = useState<CurriculumCourse | undefined>(undefined);
  const [modules, setModules] = useState<Module[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [announcements, setAnnouncements] = useState<CourseAnnouncement[]>([]);
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({ 'dl-unit-1': true, 'dl-unit-2': true });

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadCourseDetails();
  }, [id]);

  const loadCourseDetails = async () => {
    const c = await courseService.getCourseById(id);
    if (c) {
      setCourse(c);
      const curr = getCourseByCodeOrId(c.code) || getCourseByCodeOrId(c.id);
      setCurriculumCourse(curr);
    } else {
      const curr = getCourseByCodeOrId(id);
      if (curr) {
        setCurriculumCourse(curr);
        const placeholderCourse: Course = {
          id: curr.id,
          code: curr.canonicalCode,
          title: curr.title,
          shortDescription: curr.relevance.slice(0, 140) + '...',
          description: curr.relevance,
          category: curr.category,
          difficulty: 'ADVANCED',
          instructorId: 'usr_tch_202',
          instructorName: 'Faculty of Computer Science & Engineering',
          status: 'PUBLISHED',
          visibility: 'PUBLIC',
          startDate: '2026-08-01',
          endDate: '2026-12-15',
          enrolledStudentsCount: 65,
          durationHours: curr.teachingScheme.theoryHoursPerWeek * 14 + curr.teachingScheme.labHoursPerWeek * 14,
          modulesCount: curr.units.length,
          lastUpdated: '2026-09-10',
          prerequisites: curr.prerequisites,
          learningOutcomes: curr.courseOutcomes.map((co) => `${co.code}: ${co.description}`),
          isEnrolled: true,
          progress: 45,
        };
        setCourse(placeholderCourse);
      }
    }

    const m = await moduleService.getModulesByCourse(id);
    setModules(m);
    const a = await assignmentService.getAssignments(id);
    setAssignments(a);
    const q = await quizService.getQuizzes(id);
    setQuizzes(q);
    const ann = await announcementService.getAnnouncements(id);
    setAnnouncements(ann);
  };

  const handleEnroll = async () => {
    if (!course) return;
    await courseService.enrollCourse(course.id);
    addToast({
      title: 'Enrolled Successfully',
      description: `You now have full access to all lectures and labs in "${course.title}".`,
      type: 'success',
    });
    loadCourseDetails();
  };

  if (!course) return null;

  const activeCurriculum = curriculumCourse || allCurriculumCourses[0];

  return (
    <CourseLayout>
      <div className="flex flex-col gap-6">
        {/* OVERVIEW / HERO BANNER */}
        {currentTab === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Top Course Hero Card */}
            <Card className="p-6 sm:p-8 bg-gradient-to-r from-white via-[#EEF0FF]/30 to-white border-[#E7E7F0]">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="flex flex-col gap-3 max-w-3xl">
                  {/* Institutional & Accreditation Metadata */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[#4F46E5] bg-[#EEF0FF] px-2 py-0.5 rounded-md border border-[#D0D7FF]">
                      <Building2 className="w-3 h-3" />
                      VIT Pune
                    </span>
                    <span>•</span>
                    <span>B.Tech CSE (AI)</span>
                    <span>•</span>
                    <span>AY 2026-27</span>
                    <span>•</span>
                    <span>T.Y. Module V</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    <Badge variant="primary" size="md">{activeCurriculum.canonicalCode}</Badge>
                    {activeCurriculum.syllabusTemplateCode && activeCurriculum.syllabusTemplateCode !== activeCurriculum.canonicalCode && (
                      <Badge variant="neutral" size="md">
                        Syllabus Template: {activeCurriculum.syllabusTemplateCode}
                      </Badge>
                    )}
                    <Badge variant="blue" size="md">{activeCurriculum.credits} Credits</Badge>
                    <Badge variant="lavender" size="md">
                      Theory: {activeCurriculum.teachingScheme.theoryHoursPerWeek}h/wk • Lab: {activeCurriculum.teachingScheme.labHoursPerWeek}h/wk
                    </Badge>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {activeCurriculum.title}
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeCurriculum.relevance}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 flex-wrap">
                    <div className="flex items-center gap-2">
                      <Avatar name={course.instructorName} size="sm" />
                      <span className="font-medium text-slate-800">{course.instructorName}</span>
                    </div>
                    <span>•</span>
                    <span>{activeCurriculum.units.length} Syllabus Units</span>
                    <span>•</span>
                    <span>{activeCurriculum.practicals?.length || 0} Prescribed Practicals</span>
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="flex flex-col gap-3 min-w-[240px] shrink-0 p-5 rounded-2xl bg-[#F6F6FB] border border-[#E7E7F0] shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
                  {course.isEnrolled ? (
                    <>
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-slate-600">Your Progress (Mock)</span>
                        <ProgressBar value={course.progress || 0} showPercentage />
                      </div>
                      <Button
                        size="md"
                        variant="primary"
                        rightIcon={ArrowRight}
                        onClick={() => navigate(`/courses/${course.id}/learn/lsn-${activeCurriculum.id}-1-1`)}
                      >
                        Launch Learning Player
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-semibold text-slate-700">Official Curriculum Enrolled</div>
                      <Button
                        size="md"
                        variant="primary"
                        leftIcon={CheckCircle2}
                        onClick={handleEnroll}
                      >
                        Enroll in Course
                      </Button>
                    </>
                  )}

                  <div className="text-[11px] text-slate-400 text-center">
                    Source: VIT Structure & Syllabus AY 2026-27
                  </div>
                </div>
              </div>
            </Card>

            {/* Grid: Course Objectives & Prerequisites */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Objectives */}
              <Card className="p-6 border-[#E7E7F0]">
                <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4F46E5]" />
                    Official Course Objectives
                  </CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-3 pt-4">
                  {activeCurriculum.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#EEF0FF] text-[#4F46E5] font-bold text-[11px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Prerequisites & Future Mapping */}
              <div className="flex flex-col gap-6">
                <Card className="p-6 border-[#E7E7F0]">
                  <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                    <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#4F46E5]" />
                      Course Prerequisites
                    </CardTitle>
                  </CardHeader>
                  <div className="flex flex-wrap gap-2 pt-4">
                    {activeCurriculum.prerequisites.map((prereq, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-800 bg-[#F6F6FB] px-3 py-1.5 rounded-xl border border-[#E7E7F0] font-medium"
                      >
                        <Award className="w-3.5 h-3.5 text-[#4F46E5]" />
                        {prereq}
                      </span>
                    ))}
                  </div>
                </Card>

                {activeCurriculum.jobMapping && (
                  <Card className="p-6 border-[#E7E7F0]">
                    <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                      <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-[#059669]" />
                        Industry & Career Mapping
                      </CardTitle>
                    </CardHeader>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {activeCurriculum.jobMapping.map((job, idx) => (
                        <Badge key={idx} variant="mint" size="md">
                          {job}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>

            {/* SYLLABUS UNITS ACCORDION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-slate-800 tracking-tight">
                    Syllabus Units & Topics (FF No. 654)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Exact syllabus topics, teaching hours, and section distribution from source document.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {activeCurriculum.units.map((unit) => {
                  const isExpanded = Boolean(expandedUnits[unit.id]);

                  return (
                    <Card key={unit.id} className="border-[#E7E7F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
                      <div
                        onClick={() =>
                          setExpandedUnits((prev) => ({ ...prev, [unit.id]: !prev[unit.id] }))
                        }
                        className="p-4 bg-[#F6F6FB]/80 border-b border-[#E7E7F0] flex items-center justify-between cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-3">
                          <button className="p-1 text-slate-400 rounded-lg">
                            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                          <div>
                            <span className="text-xs font-bold text-[#4F46E5] uppercase tracking-wider">
                              {unit.unitNumber} {unit.section ? `• ${unit.section}` : ''}
                            </span>
                            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 mt-0.5">{unit.title}</h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge variant="lavender" size="sm">
                            {unit.teachingHours} Hours
                          </Badge>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="p-5 bg-white flex flex-col gap-3">
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            Syllabus Topics:
                          </div>
                          <div className="flex flex-col gap-2">
                            {unit.topics.map((topic, tIdx) => (
                              <div
                                key={topic.id}
                                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F6F6FB]/60 border border-[#E7E7F0] hover:bg-[#EEF0FF]/30 transition-colors"
                              >
                                <span className="w-5 h-5 rounded-full bg-white border border-[#E7E7F0] text-slate-600 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                                  {tIdx + 1}
                                </span>
                                <div className="flex-1 text-xs text-slate-800 leading-relaxed font-medium">
                                  {topic.title}
                                </div>
                              </div>
                            ))}
                          </div>

                          {unit.caseStudies && unit.caseStudies.length > 0 && (
                            <div className="mt-2 p-3 bg-[#DDF4EA]/40 rounded-xl border border-[#A7F3D0] text-xs text-[#065F46]">
                              <span className="font-bold">Case Study Focus: </span>
                              {unit.caseStudies.join('; ')}
                            </div>
                          )}
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PRACTICALS & LABS TAB */}
        {currentTab === 'practicals' && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                List of Prescribed Practicals ({activeCurriculum.practicals?.length || 0})
              </h2>
              <p className="text-xs text-slate-500">
                Official laboratory activities, implementation tasks, and experimental benchmarks for {activeCurriculum.title}.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCurriculum.practicals?.map((prac) => (
                <Card key={prac.id} className="p-5 border-[#E7E7F0] flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#EEF0FF] text-[#4F46E5] text-xs font-bold border border-[#D0D7FF]">
                        <FlaskConical className="w-3.5 h-3.5" />
                        Practical {prac.practicalNumber}
                      </span>
                      <Badge variant="blue" size="sm">2h Lab Session</Badge>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug pt-1">
                      {prac.title}
                    </h3>
                  </div>

                  <div className="pt-3 border-t border-[#F1F1F8] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Status: Prescribed Lab</span>
                    <Button
                      size="sm"
                      variant="outline"
                      rightIcon={ArrowRight}
                      onClick={() => navigate(`/courses/${course.id}/assignments`)}
                    >
                      View in Assignments
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* PROJECT AREAS TAB */}
        {currentTab === 'projects' && (
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                List of Course Project Areas ({activeCurriculum.projectAreas?.length || 0})
              </h2>
              <p className="text-xs text-slate-500">
                Official source-derived capstone project themes. Students undertake real-world technical problems with empirical validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeCurriculum.projectAreas?.map((proj, idx) => (
                <Card key={proj.id} className="p-5 border-[#E7E7F0] flex flex-col justify-between gap-3 hover:border-[#4F46E5]/40 transition-colors">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-lg bg-[#FBE1D8] text-[#9A3412] flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </span>
                      <Badge variant="peach" size="sm">Project Area</Badge>
                    </div>

                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="pt-2 border-t border-[#F1F1F8] text-[11px] text-slate-400">
                    Syllabus Assessment: ESE 100 → 30 Marks
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* OUTCOMES & ASSESSMENT SCHEME TAB */}
        {currentTab === 'outcomes' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Course Outcomes (CO) & Examination Scheme
              </h2>
              <p className="text-xs text-slate-500">
                Modified Bloom’s Taxonomy mapping, evaluation heads, and target competencies.
              </p>
            </div>

            {/* Assessment Scheme Breakdown */}
            <Card className="p-6 border-[#E7E7F0]">
              <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#4F46E5]" />
                  Examination & Evaluation Scheme (Total: {activeCurriculum.assessmentScheme.totalMarks} Marks)
                </CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {activeCurriculum.assessmentScheme.heads.map((head, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex flex-col gap-1">
                    <span className="text-xs font-bold text-[#4F46E5]">{head.head}</span>
                    <h4 className="text-xs font-semibold text-slate-800">{head.name}</h4>
                    <div className="text-xs text-slate-500 mt-2">
                      Weightage: <span className="font-bold text-slate-800">{head.weightagePercent}%</span>
                      {head.convertedMarks && ` (${head.maxMarks} → ${head.convertedMarks} Marks)`}
                    </div>
                  </div>
                ))}
              </div>

              {activeCurriculum.assessmentScheme.bloomsLevels && (
                <div className="mt-4 pt-4 border-t border-[#F1F1F8] flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-semibold text-slate-600">Bloom's Taxonomy Levels:</span>
                  {activeCurriculum.assessmentScheme.bloomsLevels.map((lvl, idx) => (
                    <Badge key={idx} variant="lavender" size="sm">{lvl}</Badge>
                  ))}
                </div>
              )}
            </Card>

            {/* Course Outcomes List */}
            <Card className="p-6 border-[#E7E7F0]">
              <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#059669]" />
                  Course Outcomes (CO1 – CO6)
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-3 pt-4">
                {activeCurriculum.courseOutcomes.map((co) => (
                  <div key={co.code} className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex items-start gap-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#DDF4EA] text-[#065F46] font-bold text-xs shrink-0">
                      {co.code}
                    </span>
                    <div className="flex-1 text-xs text-slate-800 leading-relaxed">
                      {co.description}
                    </div>
                    {co.bloomsLevel && (
                      <Badge variant="blue" size="sm">{co.bloomsLevel}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* REFERENCES & MOOCS TAB */}
        {currentTab === 'references' && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Textbooks, Reference Books & MOOCs
              </h2>
              <p className="text-xs text-slate-500">
                Official academic literature formatted according to IEEE citation guidelines and recognized online MOOC platforms.
              </p>
            </div>

            {/* Textbooks */}
            <Card className="p-6 border-[#E7E7F0]">
              <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Library className="w-4 h-4 text-[#4F46E5]" />
                  Prescribed Text Books (As per IEEE format)
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-3 pt-4">
                {activeCurriculum.textbooks.map((tb, idx) => (
                  <div key={tb.id} className="p-4 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-[#E7E7F0] text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div className="text-xs text-slate-800 leading-relaxed">
                      <span className="font-semibold text-slate-900">{tb.authors}</span>,{' '}
                      <span className="italic font-medium">{tb.title}</span>
                      {tb.edition ? `, ${tb.edition}` : ''}. {tb.publisher}, {tb.year}.
                      {tb.isbn && <span className="text-slate-500 ml-1.5">[ISBN: {tb.isbn}]</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Reference Books */}
            <Card className="p-6 border-[#E7E7F0]">
              <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#5B21B6]" />
                  Reference Books (As per IEEE format)
                </CardTitle>
              </CardHeader>
              <div className="flex flex-col gap-3 pt-4">
                {activeCurriculum.referenceBooks.map((rb, idx) => (
                  <div key={rb.id} className="p-4 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white border border-[#E7E7F0] text-slate-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <div className="text-xs text-slate-800 leading-relaxed">
                      <span className="font-semibold text-slate-900">{rb.authors}</span>,{' '}
                      <span className="italic font-medium">{rb.title}</span>
                      {rb.edition ? `, ${rb.edition}` : ''}. {rb.publisher}, {rb.year}.
                      {rb.isbn && <span className="text-slate-500 ml-1.5">[ISBN: {rb.isbn}]</span>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* MOOCs Links */}
            <Card className="p-6 border-[#E7E7F0]">
              <CardHeader className="p-0 pb-4 border-b border-[#F1F1F8]">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-[#065F46]" />
                  MOOCs Links & Additional Reading Material
                </CardTitle>
              </CardHeader>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {activeCurriculum.moocs.map((mooc) => (
                  <a
                    key={mooc.id}
                    href={mooc.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-[#F6F6FB] border border-[#E7E7F0] hover:border-[#4F46E5] hover:bg-[#EEF0FF]/30 transition-all flex items-center justify-between gap-3 group"
                  >
                    <div>
                      <Badge variant="mint" size="sm">{mooc.platform}</Badge>
                      <h4 className="text-xs font-semibold text-slate-800 mt-1.5 group-hover:text-[#4F46E5] transition-colors">
                        {mooc.title}
                      </h4>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5] shrink-0" />
                  </a>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* ASSIGNMENTS TAB */}
        {currentTab === 'assignments' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Course Assignments & Labs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {assignments.map((asg) => (
                <Card key={asg.id} className="p-5 flex flex-col justify-between gap-4 border-[#E7E7F0]">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#4F46E5]">{asg.courseCode}</span>
                      <Badge variant={asg.status === 'GRADED' ? 'mint' : 'primary'} size="sm">
                        {asg.status}
                      </Badge>
                    </div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800">{asg.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{asg.description}</p>
                  </div>

                  <div className="pt-3 border-t border-[#F1F1F8] flex items-center justify-between text-xs">
                    <span className="text-slate-400">Due: {asg.dueDate}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate(`/courses/${course.id}/assignments/${asg.id}`)}
                    >
                      {asg.status === 'GRADED' ? 'View Grade & Feedback' : 'Open Assignment'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* QUIZZES TAB */}
        {currentTab === 'quizzes' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Module Quizzes & Self-Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className="p-5 flex flex-col justify-between gap-4 border-[#E7E7F0]">
                  <div className="flex flex-col gap-1.5">
                    <Badge variant="yellow" size="sm" className="w-fit">Timed Assessment</Badge>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{quiz.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2">{quiz.description}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                      <span>{quiz.questionsCount} Questions</span>
                      <span>•</span>
                      <span>{quiz.timeLimitMinutes} Minutes</span>
                      <span>•</span>
                      <span>Passing: {quiz.passingScorePercent}%</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F1F1F8] flex items-center justify-between">
                    {quiz.bestScore !== undefined && (
                      <span className="text-xs font-semibold text-[#065F46]">Best Score: {quiz.bestScore}/{quiz.totalMarks}</span>
                    )}
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => navigate(`/courses/${course.id}/quizzes/${quiz.id}`)}
                    >
                      Take Quiz
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ANNOUNCEMENTS TAB */}
        {currentTab === 'announcements' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-sm sm:text-base font-semibold text-slate-800">Faculty Announcements</h2>
            <div className="flex flex-col gap-4">
              {announcements.map((ann) => (
                <Card key={ann.id} className="p-5 border-[#E7E7F0]">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <Avatar name={ann.authorName} size="sm" />
                      <div>
                        <h4 className="text-xs sm:text-sm font-semibold text-slate-800">{ann.title}</h4>
                        <p className="text-xs text-slate-400">{ann.authorName} ({ann.authorRole}) • {ann.publishedAt}</p>
                      </div>
                    </div>
                    {ann.isPinned && <Badge variant="primary" size="sm">Pinned</Badge>}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed mt-2 bg-[#F6F6FB]/70 p-3.5 rounded-xl border border-[#E7E7F0]">
                    {ann.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </CourseLayout>
  );
}
