import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  File,
  Download,
  Link2,
  Menu,
  X,
  Sparkles,
  Layers,
  HelpCircle,
  CheckSquare,
} from 'lucide-react';
import { courseService } from '../../services/courseService';
import { moduleService } from '../../services/moduleService';
import { lessonService } from '../../services/lessonService';
import { Course, Module, Lesson } from '../../types/lms';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { ToastContainer } from '../../components/ui/Toast';
import { useToast } from '../../context/ToastContext';

export default function LearningPlayerPage() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const cId = courseId || 'cs301';
  const lId = lessonId || 'lsn-101';

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [cId, lId]);

  const loadData = async () => {
    const c = await courseService.getCourseById(cId);
    if (c) setCourse(c);
    const m = await moduleService.getModulesByCourse(cId);
    setModules(m);

    const l = await lessonService.getLessonById(cId, lId);
    if (l) {
      setCurrentLesson(l);
    } else if (m.length > 0 && m[0].lessons && m[0].lessons.length > 0) {
      setCurrentLesson(m[0].lessons[0]);
    }
  };

  // Flatten all lessons across modules for prev/next calculations
  const allLessons: Lesson[] = [];
  modules.forEach((mod) => {
    if (mod.lessons) {
      mod.lessons.forEach((les) => allLessons.push(les));
    }
  });

  const currentIndex = allLessons.findIndex((l) => l.id === currentLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleMarkComplete = async () => {
    if (!currentLesson) return;
    try {
      await lessonService.markLessonComplete(cId, currentLesson.id);
      addToast({
        title: 'Lesson Completed! 🎉',
        description: 'Progress updated. Next module unit is unlocked.',
        type: 'success',
      });
      loadData();
      if (nextLesson) {
        navigate(`/courses/${cId}/learn/${nextLesson.id}`);
      }
    } catch (err) {
      addToast({ title: 'Error completing lesson', type: 'danger' });
    }
  };

  const completedCount = allLessons.filter((l) => l.isCompleted).length;
  const totalLessons = allLessons.length || 1;
  const overallProgress = Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#F6F6FB] text-slate-800 flex flex-col antialiased selection:bg-[#4F46E5] selection:text-white">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-[#E7E7F0] bg-white/95 px-4 sm:px-6 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${cId}`}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-[#F6F6FB] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Course Overview</span>
          </Link>

          <div className="h-4 w-px bg-[#E7E7F0]" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#3730A3] bg-[#EEF0FF] px-2 py-0.5 rounded-md border border-[#D0D7FF]">
              {course?.code || 'CS-301'}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate max-w-md hidden md:inline">
              {course?.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 w-48">
            <ProgressBar value={overallProgress} showPercentage size="sm" label="Overall" />
          </div>

          {/* Mobile Sidebar Drawer Toggle */}
          <button
            onClick={() => setIsSidebarOpenMobile(!isSidebarOpenMobile)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-[#F6F6FB]"
            aria-label="Toggle Syllabus Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Two-Column Learning Area */}
      <div className="flex flex-1 w-full max-w-[1600px] mx-auto overflow-hidden">
        {/* LEFT SYLLABUS NAVIGATION SIDEBAR (Desktop persistent, Mobile drawer) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-[#E7E7F0] lg:static lg:block transition-transform duration-200 ease-in-out ${
            isSidebarOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } flex flex-col h-[calc(100vh-3.5rem)]`}
        >
          {/* Drawer Header for Mobile */}
          <div className="p-4 border-b border-[#F1F1F8] flex items-center justify-between lg:hidden">
            <span className="font-semibold text-sm text-slate-900">Course Syllabus</span>
            <button onClick={() => setIsSidebarOpenMobile(false)} className="p-1 text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 border-b border-[#F1F1F8] bg-[#F6F6FB]/70">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Curriculum Units ({completedCount}/{totalLessons} Completed)
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
            {modules.map((module) => (
              <div key={module.id} className="flex flex-col gap-1">
                <div className="px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-[#F6F6FB] rounded-xl border border-[#E7E7F0] flex items-center justify-between">
                  <span className="truncate">Module {module.orderIndex}: {module.title.split(':')[1] || module.title}</span>
                  {module.progress !== undefined && (
                    <span className="text-[10px] text-[#4F46E5] shrink-0 font-semibold">{module.progress}%</span>
                  )}
                </div>

                <div className="flex flex-col gap-0.5 pl-2">
                  {module.lessons?.map((lesson) => {
                    const isActive = lesson.id === currentLesson?.id;

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          navigate(`/courses/${cId}/learn/${lesson.id}`);
                          setIsSidebarOpenMobile(false);
                        }}
                        className={`flex items-start gap-2.5 p-2 rounded-xl text-xs text-left transition-colors tracking-tight ${
                          isActive
                            ? 'bg-[#EEF0FF] text-[#4F46E5] font-semibold border border-[#D0D7FF]'
                            : 'text-slate-600 hover:bg-[#F6F6FB]'
                        }`}
                      >
                        {lesson.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                        )}
                        <span className="line-clamp-2 leading-snug">{lesson.title}</span>
                      </button>
                    );
                  })}

                  {/* Quizzes */}
                  {module.quizzes?.map((quiz) => (
                    <Link
                      key={quiz.id}
                      to={`/courses/${cId}/quizzes/${quiz.id}`}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs text-slate-700 hover:bg-[#F8F0C8]/50 hover:text-[#854D0E] transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                      <span className="font-medium truncate">{quiz.title}</span>
                    </Link>
                  ))}

                  {/* Assignments */}
                  {module.assignments?.map((asg) => (
                    <Link
                      key={asg.id}
                      to={`/courses/${cId}/assignments/${asg.id}`}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs text-slate-700 hover:bg-[#DDF4EA]/50 hover:text-[#065F46] transition-colors"
                    >
                      <CheckSquare className="w-4 h-4 text-[#059669] shrink-0" />
                      <span className="font-medium truncate">{asg.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Backdrop for Mobile Drawer */}
        {isSidebarOpenMobile && (
          <div
            className="fixed inset-0 bg-slate-900/30 z-40 lg:hidden"
            onClick={() => setIsSidebarOpenMobile(false)}
          />
        )}

        {/* CENTER LESSON CONTENT WORKSPACE */}
        <main className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-y-auto">
          {currentLesson ? (
            <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full flex flex-col gap-6">
              {/* Lesson Title Header */}
              <div className="flex flex-col gap-1 pb-4 border-b border-[#E7E7F0]">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Badge variant="primary" size="sm">{currentLesson.contentType}</Badge>
                  <span>•</span>
                  <span>{currentLesson.durationMinutes} Minutes Expected</span>
                  {currentLesson.isCompleted && (
                    <>
                      <span>•</span>
                      <span className="text-[#059669] font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                      </span>
                    </>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  {currentLesson.title}
                </h1>
                {currentLesson.description && (
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">{currentLesson.description}</p>
                )}
              </div>

              {/* VIDEO CONTENT AREA */}
              {currentLesson.contentType === 'VIDEO' && (
                <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-[#E7E7F0] shadow-md aspect-video">
                  {currentLesson.videoUrl ? (
                    <iframe
                      src={currentLesson.videoUrl}
                      title={currentLesson.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white">
                      <PlayCircle className="w-12 h-12 text-indigo-400 mb-2" />
                      <span className="text-sm font-semibold">Video Stream Ready</span>
                    </div>
                  )}
                </div>
              )}

              {/* TEXT CONTENT AREA - EDITORIAL SERIF TYPOGRAPHY */}
              {currentLesson.contentText && (
                <article className="reading-content max-w-none text-slate-800 text-sm sm:text-base leading-relaxed p-6 sm:p-8 rounded-2xl bg-white border border-[#E7E7F0] shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] whitespace-pre-line font-serif">
                  {currentLesson.contentText}
                </article>
              )}

              {/* DOCUMENT & DOWNLOAD RESOURCE AREA */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="flex flex-col gap-3 p-5 rounded-2xl bg-[#F6F6FB] border border-[#E7E7F0]">
                  <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                    <File className="w-4 h-4 text-[#4F46E5]" />
                    Lecture Attachments & Supplementary Materials
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentLesson.resources.map((res) => (
                      <div
                        key={res.id}
                        onClick={() => addToast({ title: 'Resource Downloaded', description: `Saved ${res.title}`, type: 'info' })}
                        className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E7E7F0] hover:border-[#D0D7FF] hover:bg-[#EEF0FF]/30 cursor-pointer transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Badge variant="primary" size="sm">{res.type}</Badge>
                          <span className="text-xs font-semibold text-slate-800 truncate">{res.title}</span>
                        </div>
                        <Download className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-slate-400 text-sm">
              Select a lesson from the syllabus on the left to begin learning.
            </div>
          )}

          {/* BOTTOM PERSISTENT NAVIGATION BAR */}
          <footer className="sticky bottom-0 z-30 flex items-center justify-between p-4 bg-white border-t border-[#E7E7F0] shadow-[0_-2px_8px_0_rgba(0,0,0,0.02)]">
            <Button
              variant="outline"
              size="md"
              leftIcon={ChevronLeft}
              disabled={!prevLesson}
              onClick={() => prevLesson && navigate(`/courses/${cId}/learn/${prevLesson.id}`)}
            >
              Previous Unit
            </Button>

            <Button
              variant={currentLesson?.isCompleted ? 'secondary' : 'primary'}
              size="md"
              leftIcon={CheckCircle2}
              onClick={handleMarkComplete}
            >
              {currentLesson?.isCompleted ? 'Marked as Complete ✓' : 'Mark as Complete & Next'}
            </Button>

            <Button
              variant="outline"
              size="md"
              rightIcon={ChevronRight}
              disabled={!nextLesson}
              onClick={() => nextLesson && navigate(`/courses/${cId}/learn/${nextLesson.id}`)}
            >
              Next Unit
            </Button>
          </footer>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
