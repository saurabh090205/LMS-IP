import { Quiz, QuizAttempt, QuizQuestion } from '../types/lms';
import { mockQuizzes } from '../features/quizzes/mockData';

class QuizService {
  private quizzes: Quiz[] = [...mockQuizzes];

  async getQuizzes(courseId?: string): Promise<Quiz[]> {
    if (courseId) {
      return this.quizzes.filter((q) => q.courseId === courseId);
    }
    return this.quizzes;
  }

  async getQuizById(id: string): Promise<Quiz | undefined> {
    return this.quizzes.find((q) => q.id === id);
  }

  async submitQuizAttempt(quizId: string, studentId: string, answers: Record<string, string>, timeSpentSeconds: number): Promise<QuizAttempt> {
    const quiz = await this.getQuizById(quizId);
    if (!quiz) throw new Error(`Quiz ${quizId} not found`);

    let score = 0;
    const questions = quiz.questions || [];

    // Calculate score based on correct options
    questions.forEach((q) => {
      const studentAns = answers[q.id];
      if (q.type === 'MCQ' || q.type === 'TRUE_FALSE') {
        if (studentAns !== undefined && q.correctOptionIndex !== undefined && parseInt(studentAns, 10) === q.correctOptionIndex) {
          score += q.marks;
        }
      } else if (q.type === 'SHORT_ANSWER') {
        // Generous mock short answer evaluation
        if (studentAns && studentAns.trim().length > 3) {
          score += q.marks;
        }
      }
    });

    const maxScore = quiz.totalMarks || 25;
    const percentage = Math.round((score / maxScore) * 100);
    const passed = percentage >= quiz.passingScorePercent;

    const attempt: QuizAttempt = {
      id: `att-${Date.now()}`,
      quizId,
      studentId,
      startedAt: new Date(Date.now() - timeSpentSeconds * 1000).toLocaleTimeString(),
      submittedAt: new Date().toLocaleTimeString(),
      timeSpentSeconds,
      score,
      maxScore,
      percentage,
      passed,
      attemptNumber: (quiz.userAttemptsCount || 0) + 1,
      answers,
    };

    quiz.userAttemptsCount = (quiz.userAttemptsCount || 0) + 1;
    if (score > (quiz.bestScore || 0)) {
      quiz.bestScore = score;
    }

    return attempt;
  }

  async createQuiz(courseId: string, quizData: Omit<Quiz, 'id' | 'courseId' | 'userAttemptsCount' | 'bestScore'>): Promise<Quiz> {
    const newQuiz: Quiz = {
      ...quizData,
      id: `quiz-${Date.now()}`,
      courseId,
      userAttemptsCount: 0,
    };
    this.quizzes.push(newQuiz);
    return newQuiz;
  }

  async addQuestionToQuiz(quizId: string, question: Omit<QuizQuestion, 'id'>): Promise<QuizQuestion> {
    const quiz = await this.getQuizById(quizId);
    if (!quiz) throw new Error(`Quiz ${quizId} not found`);

    if (!quiz.questions) quiz.questions = [];
    const newQ: QuizQuestion = {
      ...question,
      id: `q-${Date.now()}`,
      quizId,
    };
    quiz.questions.push(newQ);
    quiz.questionsCount = quiz.questions.length;
    quiz.totalMarks += newQ.marks;
    return newQ;
  }
}

export const quizService = new QuizService();
