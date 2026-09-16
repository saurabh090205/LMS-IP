import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  PlusCircle,
  Video,
  FileText,
  HelpCircle,
  CheckSquare,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronRight,
  Save,
  CheckCircle,
  Eye,
  ArrowLeft,
  UploadCloud,
  File,
  X,
  Clock,
  Sparkles,
  Link2,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { moduleService } from '../../services/moduleService';
import { lessonService } from '../../services/lessonService';
import { quizService } from '../../services/quizService';
import { assignmentService } from '../../services/assignmentService';
import {
  Course,
  Module,
  Lesson,
  LessonContentType,
  ResourceType,
  QuizQuestion,
} from '../../types/lms';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Select } from '../../components/ui/Select';
import { Modal } from '../../components/ui/Modal';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { useToast } from '../../context/ToastContext';

export default function CourseBuilderPage() {
  const { id } = useParams<{ id: string }>();
  const courseId = id || 'cs301';
  const { addToast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'mod-1': true, 'mod-2': true });

  // Modal States
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleDesc, setModuleDesc] = useState('');
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  // Lesson Authoring Modal
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [activeModuleIdForLesson, setActiveModuleIdForLesson] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonDesc, setLessonDesc] = useState('');
  const [lessonContentType, setLessonContentType] = useState<LessonContentType>('TEXT');
  const [lessonText, setLessonText] = useState('');
  const [lessonVideoUrl, setLessonVideoUrl] = useState('');
  const [lessonDuration, setLessonDuration] = useState(45);
  const [mockResources, setMockResources] = useState<{ title: string; type: ResourceType; size: string }[]>([]);

  // Quiz Modal inside Builder
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [activeModuleIdForQuiz, setActiveModuleIdForQuiz] = useState<string | null>(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDesc, setQuizDesc] = useState('');
  const [quizTimeLimit, setQuizTimeLimit] = useState(15);
  const [quizPassingScore, setQuizPassingScore] = useState(70);
  const [quizQuestions, setQuizQuestions] = useState<Omit<QuizQuestion, 'id'>[]>([
    {
      type: 'MCQ',
      prompt: 'What mathematical property prevents gradient vanishing in ReLU?',
      options: ['Constant unit derivative for positive inputs', 'Exponential decay', 'Bounded outputs between 0 and 1'],
      correctOptionIndex: 0,
      marks: 5,
    },
  ]);

  // Assignment Modal inside Builder
  const [isAssignmentModalOpen, setIsAssignmentModalOpen] = useState(false);
  const [activeModuleIdForAsg, setActiveModuleIdForAsg] = useState<string | null>(null);
  const [asgTitle, setAsgTitle] = useState('');
  const [asgDesc, setAsgDesc] = useState('');
  const [asgDueDate, setAsgDueDate] = useState('2026-09-25');
  const [asgMarks, setAsgMarks] = useState(100);

  useEffect(() => {
    loadData();
  }, [courseId]);

  const loadData = async () => {
    const c = await courseService.getCourseById(courseId);
    if (c) setCourse(c);
    const mods = await moduleService.getModulesByCourse(courseId);
    setModules(mods);
  };

  const toggleModuleAccordion = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const handleSaveModule = async () => {
    if (!moduleTitle.trim()) return;
    if (editingModuleId) {
      await moduleService.updateModule(courseId, editingModuleId, {
        title: moduleTitle,
        description: moduleDesc,
      });
      addToast({ title: 'Module Updated', description: `Saved changes to "${moduleTitle}"`, type: 'success' });
    } else {
      await moduleService.createModule(courseId, moduleTitle, moduleDesc);
      addToast({ title: 'Module Created', description: `Added "${moduleTitle}" to course`, type: 'success' });
    }
    setIsAddModuleOpen(false);
    setModuleTitle('');
    setModuleDesc('');
    setEditingModuleId(null);
    loadData();
  };

  const handleDeleteModule = async (moduleId: string) => {
    await moduleService.deleteModule(courseId, moduleId);
    addToast({ title: 'Module Deleted', type: 'info' });
    loadData();
  };

  const handleMoveModule = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= modules.length) return;

    const newOrder = [...modules];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    const moduleIds = newOrder.map((m) => m.id);
    await moduleService.reorderModules(courseId, moduleIds);
    loadData();
  };

  // Lesson save handler
  const handleSaveLesson = async () => {
    if (!activeModuleIdForLesson || !lessonTitle.trim()) return;

    await lessonService.addLessonToModule(courseId, activeModuleIdForLesson, {
      title: lessonTitle,
      description: lessonDesc,
      contentType: lessonContentType,
      contentText: lessonText,
      videoUrl: lessonVideoUrl,
      durationMinutes: Number(lessonDuration),
      isPublished: true,
      resources: mockResources.map((r, i) => ({
        id: `res-${Date.now()}-${i}`,
        title: r.title,
        type: r.type,
        fileUrl: `/uploads/${r.title}`,
        fileSize: r.size,
      })),
    });

    addToast({
      title: 'Lesson Added',
      description: `"${lessonTitle}" added to module.`,
      type: 'success',
    });

    setIsLessonModalOpen(false);
    setLessonTitle('');
    setLessonDesc('');
    setLessonText('');
    setLessonVideoUrl('');
    setMockResources([]);
    loadData();
  };

  // Mock file drop handler
  const handleMockDrop = (e: React.DragEvent | React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const mockFiles = [
      { title: 'Lecture Notes & Proofs.pdf', type: 'PDF' as ResourceType, size: '2.4 MB' },
      { title: 'Interactive Code Notebook.ipynb', type: 'DOC' as ResourceType, size: '850 KB' },
    ];
    setMockResources((prev) => [...prev, ...mockFiles]);
    addToast({
      title: 'Resource Attached (Prototype)',
      description: 'Files staged for lesson publishing.',
      type: 'info',
    });
  };

  // Quiz save handler
  const handleSaveQuiz = async () => {
    if (!quizTitle.trim() || !activeModuleIdForQuiz) return;

    await quizService.createQuiz(courseId, {
      title: quizTitle,
      description: quizDesc,
      instructions: 'Answer all questions before submitting.',
      timeLimitMinutes: quizTimeLimit,
      maxAttempts: 2,
      passingScorePercent: quizPassingScore,
      questionsCount: quizQuestions.length,
      totalMarks: quizQuestions.reduce((acc, q) => acc + q.marks, 0),
      questions: quizQuestions.map((q, idx) => ({ ...q, id: `q-temp-${idx}` })),
    });

    addToast({
      title: 'Quiz Published to Module',
      description: `"${quizTitle}" with ${quizQuestions.length} questions is now ready for students.`,
      type: 'success',
    });

    setIsQuizModalOpen(false);
    setQuizTitle('');
    setQuizDesc('');
    loadData();
  };

  // Assignment save handler
  const handleSaveAssignment = async () => {
    if (!asgTitle.trim() || !activeModuleIdForAsg) return;

    await assignmentService.createAssignment(courseId, {
      title: asgTitle,
      description: asgDesc,
      instructions: asgDesc,
      dueDate: asgDueDate,
      totalMarks: asgMarks,
    });

    addToast({
      title: 'Assignment Created',
      description: `"${asgTitle}" is now scheduled for students.`,
      type: 'success',
    });

    setIsAssignmentModalOpen(false);
    setAsgTitle('');
    setAsgDesc('');
    loadData();
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto">
      <PageHeader
        title={`Course Builder — ${course?.code || 'CS-301'}`}
        subtitle="Organize curriculum modules, author rich media lessons, integrate rubrics, and construct assessments."
        breadcrumbs={[
          { label: 'Faculty Hub', href: '/teacher/dashboard' },
          { label: 'My Courses', href: '/teacher/courses' },
          { label: course?.code || 'Course', href: `/courses/${courseId}` },
          { label: 'Builder', isCurrent: true },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to={`/courses/${courseId}`}>
              <Button size="sm" variant="outline" leftIcon={Eye}>
                Preview Student View
              </Button>
            </Link>
            <Button
              size="sm"
              variant="primary"
              leftIcon={PlusCircle}
              onClick={() => {
                setModuleTitle('');
                setModuleDesc('');
                setEditingModuleId(null);
                setIsAddModuleOpen(true);
              }}
            >
              Add New Module
            </Button>
          </div>
        }
      />

      {/* Modules List Accordion */}
      {modules.length > 0 ? (
        <div className="flex flex-col gap-4">
          {modules.map((module, index) => {
            const isExpanded = Boolean(expandedModules[module.id]);

            return (
              <Card key={module.id} className="border-slate-200 shadow-xs overflow-hidden">
                {/* Module Header Bar */}
                <div className="p-4 bg-slate-50/90 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-3 cursor-pointer flex-1 select-none"
                    onClick={() => toggleModuleAccordion(module.id)}
                  >
                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded">
                      {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </button>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                          Module {module.orderIndex}
                        </span>
                        <h3 className="text-sm font-bold text-slate-900">{module.title}</h3>
                      </div>
                      {module.description && (
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{module.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Module Action Toolbar */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMoveModule(index, 'UP')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/50"
                      title="Move module up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      disabled={index === modules.length - 1}
                      onClick={() => handleMoveModule(index, 'DOWN')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-slate-200/50"
                      title="Move module down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1" />

                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={PlusCircle}
                      className="text-xs px-2.5 py-1"
                      onClick={() => {
                        setActiveModuleIdForLesson(module.id);
                        setIsLessonModalOpen(true);
                      }}
                    >
                      Add Lesson
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={HelpCircle}
                      className="text-xs px-2.5 py-1"
                      onClick={() => {
                        setActiveModuleIdForQuiz(module.id);
                        setIsQuizModalOpen(true);
                      }}
                    >
                      Add Quiz
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      leftIcon={CheckSquare}
                      className="text-xs px-2.5 py-1"
                      onClick={() => {
                        setActiveModuleIdForAsg(module.id);
                        setIsAssignmentModalOpen(true);
                      }}
                    >
                      Add Task
                    </Button>

                    <button
                      onClick={() => {
                        setEditingModuleId(module.id);
                        setModuleTitle(module.title);
                        setModuleDesc(module.description || '');
                        setIsAddModuleOpen(true);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200/50"
                      title="Edit module name"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteModule(module.id)}
                      className="p-1.5 text-rose-400 hover:text-rose-600 rounded hover:bg-rose-50"
                      title="Delete module"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Module Items Body (Lessons, Quizzes, Assignments) */}
                {isExpanded && (
                  <div className="p-4 bg-white flex flex-col gap-2.5 divide-y divide-slate-100">
                    {/* Lessons */}
                    {module.lessons && module.lessons.length > 0 ? (
                      module.lessons.map((lesson) => {
                        const ContentIcon = {
                          TEXT: FileText,
                          VIDEO: Video,
                          DOCUMENT: File,
                          LINK: Link2,
                          MIXED: Sparkles,
                        }[lesson.contentType] || FileText;

                        return (
                          <div
                            key={lesson.id}
                            className="pt-2.5 first:pt-0 flex items-center justify-between gap-3 text-xs"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                                <ContentIcon className="w-3.5 h-3.5" />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-semibold text-slate-800">{lesson.title}</span>
                                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                  <span>{lesson.contentType}</span>
                                  <span>•</span>
                                  <span>{lesson.durationMinutes} mins</span>
                                  {lesson.resources && lesson.resources.length > 0 && (
                                    <>
                                      <span>•</span>
                                      <span>{lesson.resources.length} resources</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <Badge variant="neutral" size="sm">
                              Published
                            </Badge>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-xs text-slate-400 italic py-2">
                        No lessons added to this module yet. Click "Add Lesson" above.
                      </p>
                    )}

                    {/* Quizzes inside module */}
                    {module.quizzes?.map((quiz) => (
                      <div key={quiz.id} className="pt-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                            <HelpCircle className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">{quiz.title}</span>
                            <span className="text-[11px] text-slate-400">
                              {quiz.questionsCount} Questions • {quiz.timeLimitMinutes} min limit • {quiz.totalMarks} Marks
                            </span>
                          </div>
                        </div>
                        <Badge variant="warning" size="sm">
                          Quiz
                        </Badge>
                      </div>
                    ))}

                    {/* Assignments inside module */}
                    {module.assignments?.map((asg) => (
                      <div key={asg.id} className="pt-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckSquare className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-slate-800">{asg.title}</span>
                            <span className="text-[11px] text-slate-400">
                              Due: {asg.dueDate} • {asg.totalMarks} Marks
                            </span>
                          </div>
                        </div>
                        <Badge variant="success" size="sm">
                          Assignment
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Layers}
          title="No modules defined yet"
          description="Start building your syllabus structure by adding the first course module."
          action={{
            label: 'Add First Module',
            onClick: () => setIsAddModuleOpen(true),
            icon: PlusCircle,
          }}
        />
      )}

      {/* CREATE/EDIT MODULE MODAL */}
      <Modal
        isOpen={isAddModuleOpen}
        onClose={() => setIsAddModuleOpen(false)}
        title={editingModuleId ? 'Edit Module' : 'Add New Curriculum Module'}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAddModuleOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" leftIcon={Save} onClick={handleSaveModule}>
              Save Module
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Module Title"
            placeholder="e.g., Module 1: Mathematical Foundations of Optimization"
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            required
          />
          <Textarea
            label="Module Learning Objectives & Scope"
            placeholder="Describe what concepts and theorems students will master in this unit..."
            value={moduleDesc}
            onChange={(e) => setModuleDesc(e.target.value)}
            rows={3}
          />
        </div>
      </Modal>

      {/* LESSON AUTHORING MODAL */}
      <Modal
        isOpen={isLessonModalOpen}
        onClose={() => setIsLessonModalOpen(false)}
        title="Author Lesson Content"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsLessonModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" leftIcon={CheckCircle} onClick={handleSaveLesson}>
              Publish Lesson to Module
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                label="Lesson Title"
                placeholder="e.g., 1.1 Forward Pass & Activation Functions"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <Select
                label="Content Type"
                value={lessonContentType}
                onChange={(e) => setLessonContentType(e.target.value as LessonContentType)}
                options={[
                  { label: 'Text & Markdown', value: 'TEXT' },
                  { label: 'Video Lecture', value: 'VIDEO' },
                  { label: 'Document & PDF', value: 'DOCUMENT' },
                  { label: 'External Resource Link', value: 'LINK' },
                ]}
              />
            </div>
          </div>

          <Input
            label="Lesson Summary / Abstract"
            placeholder="Brief 1-line description of key takeaways..."
            value={lessonDesc}
            onChange={(e) => setLessonDesc(e.target.value)}
          />

          {lessonContentType === 'VIDEO' && (
            <Input
              label="Video Embed / Stream URL"
              placeholder="e.g. https://www.youtube.com/embed/aircAruvnKk or HLS stream link"
              value={lessonVideoUrl}
              onChange={(e) => setLessonVideoUrl(e.target.value)}
            />
          )}

          {lessonContentType === 'TEXT' && (
            <Textarea
              label="Structured Content & Markdown Editor"
              placeholder="Write academic lecture narrative, LaTeX formulas ($E=mc^2$), code snippets, and explanations..."
              value={lessonText}
              onChange={(e) => setLessonText(e.target.value)}
              rows={6}
            />
          )}

          {/* Resource Mock Upload Dropper */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700">
              Attach Supplementary Resources (PDF, PPT, Code, Datasets)
            </label>
            <div
              onClick={() => handleMockDrop({ preventDefault: () => {} } as any)}
              className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/60 p-4 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors text-center"
            >
              <UploadCloud className="w-6 h-6 text-indigo-600 mb-1" />
              <span className="text-xs font-semibold text-slate-800">
                Click to attach mock files (PDF, PPT, DOC, Datasets)
              </span>
              <span className="text-[11px] text-slate-400">Prototype staging environment</span>
            </div>

            {mockResources.length > 0 && (
              <div className="flex flex-col gap-1.5 mt-2">
                {mockResources.map((res, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-100 border border-slate-200 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">{res.type}</Badge>
                      <span className="font-medium text-slate-800">{res.title}</span>
                      <span className="text-slate-400 text-[10px]">({res.size})</span>
                    </div>
                    <button
                      onClick={() => setMockResources((prev) => prev.filter((_, idx) => idx !== i))}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Estimated Duration (Minutes)"
              value={lessonDuration}
              onChange={(e) => setLessonDuration(Number(e.target.value))}
            />
          </div>
        </div>
      </Modal>

      {/* QUIZ BUILDER MODAL */}
      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Create Module Assessment Quiz"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsQuizModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" leftIcon={Save} onClick={handleSaveQuiz}>
              Save & Attach Quiz
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Quiz Title"
            placeholder="e.g., Quiz 1: Gradient Descent & Loss Landscapes"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              label="Time Limit (Minutes)"
              value={quizTimeLimit}
              onChange={(e) => setQuizTimeLimit(Number(e.target.value))}
            />
            <Input
              type="number"
              label="Passing Score (%)"
              value={quizPassingScore}
              onChange={(e) => setQuizPassingScore(Number(e.target.value))}
            />
          </div>

          {/* Questions Builder Section */}
          <div className="border-t border-slate-200 pt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Questions ({quizQuestions.length})
              </h4>
              <Button
                size="sm"
                variant="outline"
                leftIcon={PlusCircle}
                onClick={() =>
                  setQuizQuestions((prev) => [
                    ...prev,
                    {
                      type: 'MCQ',
                      prompt: 'New question prompt...',
                      options: ['Option A', 'Option B', 'Option C'],
                      correctOptionIndex: 0,
                      marks: 5,
                    },
                  ])
                }
              >
                Add Question
              </Button>
            </div>

            {quizQuestions.map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-700">Question {idx + 1} ({q.type})</span>
                  <button
                    onClick={() => setQuizQuestions((prev) => prev.filter((_, i) => i !== idx))}
                    className="text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <Input
                  value={q.prompt}
                  onChange={(e) => {
                    const next = [...quizQuestions];
                    next[idx].prompt = e.target.value;
                    setQuizQuestions(next);
                  }}
                  placeholder="Enter question prompt..."
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* ASSIGNMENT MODAL */}
      <Modal
        isOpen={isAssignmentModalOpen}
        onClose={() => setIsAssignmentModalOpen(false)}
        title="Create Module Assignment"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsAssignmentModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" leftIcon={Save} onClick={handleSaveAssignment}>
              Save Assignment
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <Input
            label="Assignment Title"
            placeholder="e.g. Lab 2: Multi-GPU Distributed Training"
            value={asgTitle}
            onChange={(e) => setAsgTitle(e.target.value)}
            required
          />
          <Textarea
            label="Instructions & Evaluation Criteria"
            placeholder="Specify deliverables, grading rubric, format requirements..."
            value={asgDesc}
            onChange={(e) => setAsgDesc(e.target.value)}
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              label="Due Date"
              value={asgDueDate}
              onChange={(e) => setAsgDueDate(e.target.value)}
            />
            <Input
              type="number"
              label="Total Marks"
              value={asgMarks}
              onChange={(e) => setAsgMarks(Number(e.target.value))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
