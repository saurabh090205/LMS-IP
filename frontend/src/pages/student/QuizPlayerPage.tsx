import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  HelpCircle,
  Clock,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Award,
  Send,
  Sparkles,
} from 'lucide-react';
import { quizService } from '../../services/quizService';
import { Quiz, QuizAttempt, QuizQuestion } from '../../types/lms';
import { CourseLayout } from '../../components/layout/CourseLayout';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Textarea } from '../../components/ui/Textarea';
import { useToast } from '../../context/ToastContext';

export default function QuizPlayerPage() {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const cId = courseId || 'cs301';
  const qId = quizId || 'quiz-101';

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(15 * 60);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);
  const [showReview, setShowReview] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadQuiz();
  }, [qId]);

  const loadQuiz = async () => {
    const q = await quizService.getQuizById(qId);
    if (q) {
      setQuiz(q);
      setTimeRemainingSeconds(q.timeLimitMinutes * 60);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (!isQuizStarted || isSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitQuiz();
          return 0;
        }
        if (prev === 60) {
          addToast({
            title: '1 Minute Remaining! ⚠️',
            description: 'Please finalize and submit your answers soon.',
            type: 'warning',
          });
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isQuizStarted, isSubmitted]);

  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionIndexStr: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndexStr }));
  };

  const handleSubmitQuiz = async () => {
    if (!quiz) return;
    setIsConfirmModalOpen(false);

    const timeSpent = quiz.timeLimitMinutes * 60 - timeRemainingSeconds;
    const result = await quizService.submitQuizAttempt(quiz.id, 'usr_std_101', selectedAnswers, timeSpent);

    setAttemptResult(result);
    setIsSubmitted(true);

    addToast({
      title: result.passed ? 'Quiz Passed! 🎉' : 'Quiz Submitted',
      description: `You scored ${result.score}/${result.maxScore} (${result.percentage}%).`,
      type: result.passed ? 'success' : 'warning',
    });
  };

  if (!quiz) return null;

  return (
    <CourseLayout>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {/* START SCREEN (Before starting quiz) */}
        {!isQuizStarted && !isSubmitted && (
          <Card className="p-8 flex flex-col gap-6 border-slate-200 text-center items-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shadow-xs">
              <HelpCircle className="w-8 h-8" />
            </div>

            <div className="flex flex-col gap-1 max-w-xl">
              <Badge variant="warning" size="md" className="mx-auto">
                Timed Assessment
              </Badge>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                {quiz.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">{quiz.description}</p>
            </div>

            {/* Assessment Rules Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl text-left border-y border-slate-100 py-6 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Questions</span>
                <span className="font-bold text-slate-900 text-sm">{quiz.questionsCount} Items</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Time Limit</span>
                <span className="font-bold text-slate-900 text-sm">{quiz.timeLimitMinutes} Minutes</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Passing Score</span>
                <span className="font-bold text-slate-900 text-sm">{quiz.passingScorePercent}%</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-slate-400 font-semibold uppercase text-[10px]">Total Points</span>
                <span className="font-bold text-indigo-700 text-sm">{quiz.totalMarks} Marks</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 max-w-xl text-left">
              <strong>Assessment Instructions:</strong> {quiz.instructions} Once started, the timer cannot be paused.
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate(`/courses/${cId}?tab=quizzes`)}>
                Back to Course
              </Button>
              <Button size="lg" variant="primary" onClick={() => setIsQuizStarted(true)}>
                Begin Assessment Now
              </Button>
            </div>
          </Card>
        )}

        {/* ACTIVE QUIZ TAKER */}
        {isQuizStarted && !isSubmitted && currentQuestion && (
          <div className="flex flex-col gap-6">
            {/* Top Timer Bar & Navigator Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Question {currentQuestionIndex + 1} of {questions.length}</span>
                <Badge variant="primary" size="sm">{currentQuestion.marks} Points</Badge>
              </div>

              {/* Countdown Timer Component */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono font-bold text-sm ${
                timeRemainingSeconds < 120 ? 'bg-rose-50 text-rose-700 border border-rose-200 animate-pulse' : 'bg-slate-100 text-slate-800'
              }`}>
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            </div>

            {/* Main Question Card */}
            <Card className="p-6 sm:p-8 border-slate-200 bg-white">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-6">
                {currentQuestion.prompt}
              </h3>

              {/* Multiple Choice / True-False Options */}
              {(currentQuestion.type === 'MCQ' || currentQuestion.type === 'TRUE_FALSE') && currentQuestion.options && (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === String(idx);

                    return (
                      <div
                        key={idx}
                        onClick={() => handleSelectOption(currentQuestion.id, String(idx))}
                        className={`flex items-center gap-3.5 p-4 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-semibold ring-2 ring-indigo-500/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Short Answer Input */}
              {currentQuestion.type === 'SHORT_ANSWER' && (
                <Textarea
                  placeholder="Type your analytical answer here..."
                  value={selectedAnswers[currentQuestion.id] || ''}
                  onChange={(e) => handleSelectOption(currentQuestion.id, e.target.value)}
                  rows={4}
                />
              )}
            </Card>

            {/* Bottom Question Controls & Navigator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-1.5">
                {questions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQuestionIndex;

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={ChevronLeft}
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                >
                  Previous
                </Button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    variant="outline"
                    size="sm"
                    rightIcon={ChevronRight}
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    leftIcon={Send}
                    onClick={() => setIsConfirmModalOpen(true)}
                  >
                    Finish & Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SUBMIT CONFIRMATION MODAL */}
        <Modal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          title="Submit Assessment"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsConfirmModalOpen(false)}>
                Return to Questions
              </Button>
              <Button variant="primary" onClick={handleSubmitQuiz}>
                Confirm Final Submission
              </Button>
            </>
          }
        >
          <div className="flex flex-col gap-2 text-xs text-slate-600">
            <p className="text-sm font-bold text-slate-900">Are you sure you want to finish the quiz?</p>
            <p>
              You have answered <strong>{Object.keys(selectedAnswers).length} of {questions.length}</strong> questions.
            </p>
          </div>
        </Modal>

        {/* QUIZ RESULTS & REVIEW SCREEN */}
        {isSubmitted && attemptResult && (
          <div className="flex flex-col gap-6">
            <Card className="p-8 border-slate-200 bg-white text-center flex flex-col items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-xs ${
                attemptResult.passed ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'
              }`}>
                {attemptResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
              </div>

              <div className="flex flex-col gap-1">
                <Badge variant={attemptResult.passed ? 'success' : 'danger'} size="lg" className="mx-auto font-bold">
                  {attemptResult.passed ? 'PASSED' : 'DID NOT PASS'}
                </Badge>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {attemptResult.percentage}%
                </h2>
                <p className="text-xs text-slate-500">
                  You scored <strong>{attemptResult.score} out of {attemptResult.maxScore}</strong> marks.
                </p>
              </div>

              {/* Stats Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl text-left border-y border-slate-100 py-4 text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-400">Time Spent</span>
                  <span className="font-bold text-slate-900">{Math.floor(attemptResult.timeSpentSeconds / 60)}m {attemptResult.timeSpentSeconds % 60}s</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Attempt</span>
                  <span className="font-bold text-slate-900">#{attemptResult.attemptNumber} of {quiz.maxAttempts}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Passing Cutoff</span>
                  <span className="font-bold text-slate-900">{quiz.passingScorePercent}%</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Recorded Grade</span>
                  <span className="font-bold text-emerald-700">{attemptResult.passed ? 'Satisfied' : 'Retake Allowed'}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  leftIcon={RotateCcw}
                  onClick={() => {
                    setIsSubmitted(false);
                    setIsQuizStarted(false);
                    setSelectedAnswers({});
                  }}
                >
                  Retake Quiz
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setShowReview(!showReview)}
                >
                  {showReview ? 'Hide Explanations' : 'Review Answers & Explanations'}
                </Button>
                <Link to={`/courses/${cId}?tab=quizzes`}>
                  <Button variant="secondary">Back to Course</Button>
                </Link>
              </div>
            </Card>

            {/* REVIEW ANSWERS PANEL */}
            {showReview && (
              <div className="flex flex-col gap-4">
                <h3 className="text-base font-bold text-slate-900">Question-by-Question Review</h3>
                {questions.map((q, idx) => (
                  <Card key={q.id} className="p-6 border-slate-200">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-bold text-indigo-700">Question {idx + 1}</span>
                      <span className="text-xs text-slate-500">{q.marks} Marks</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 mb-4">{q.prompt}</p>

                    {q.options && (
                      <div className="flex flex-col gap-2 mb-4">
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = q.correctOptionIndex === oIdx;
                          const wasChosen = selectedAnswers[q.id] === String(oIdx);

                          return (
                            <div
                              key={oIdx}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between ${
                                isCorrect
                                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold'
                                  : wasChosen
                                  ? 'border-rose-300 bg-rose-50 text-rose-900'
                                  : 'border-slate-200 text-slate-600'
                              }`}
                            >
                              <span>{opt}</span>
                              {isCorrect && <span className="text-[10px] text-emerald-700 font-bold uppercase">Correct Answer</span>}
                              {!isCorrect && wasChosen && <span className="text-[10px] text-rose-700 font-bold uppercase">Your Selection</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {q.explanation && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                        <strong className="text-slate-900 block mb-0.5">Explanation:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </CourseLayout>
  );
}
