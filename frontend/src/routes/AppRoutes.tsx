import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Layout
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public & Auth Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/auth/LoginPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

// Role Dashboards
import StudentDashboard from '../pages/dashboards/StudentDashboard';
import TeacherDashboard from '../pages/dashboards/TeacherDashboard';
import ParentDashboard from '../pages/dashboards/ParentDashboard';
import AdminDashboard from '../pages/dashboards/AdminDashboard';

// Teacher LMS Pages
import TeacherCoursesPage from '../pages/teacher/TeacherCoursesPage';
import TeacherClassesPage from '../pages/teacher/TeacherClassesPage';
import TeacherAssignmentsPage from '../pages/teacher/TeacherAssignmentsPage';
import TeacherAttendancePage from '../pages/teacher/TeacherAttendancePage';
import CourseFormPage from '../pages/teacher/CourseFormPage';
import CourseBuilderPage from '../pages/teacher/CourseBuilderPage';
import CourseRosterPage from '../pages/teacher/CourseRosterPage';
import GradingQueuePage from '../pages/teacher/GradingQueuePage';
import TeacherGradebookPage from '../pages/teacher/TeacherGradebookPage';

// Student LMS & Academic Pages
import StudentCoursesPage from '../pages/student/StudentCoursesPage';
import StudentAcademicsPage from '../pages/student/StudentAcademicsPage';
import StudentAssignmentsPage from '../pages/student/StudentAssignmentsPage';
import StudentGradesPage from '../pages/student/StudentGradesPage';
import CourseDetailPage from '../pages/student/CourseDetailPage';
import LearningPlayerPage from '../pages/student/LearningPlayerPage';
import AssignmentDetailPage from '../pages/student/AssignmentDetailPage';
import QuizPlayerPage from '../pages/student/QuizPlayerPage';
import StudentTimetablePage from '../pages/student/StudentTimetablePage';
import StudentAttendancePage from '../pages/student/StudentAttendancePage';
import StudentExaminationsPage from '../pages/student/StudentExaminationsPage';
import StudentReportCardPage from '../pages/student/StudentReportCardPage';
import StudentClassroomPage from '../pages/student/StudentClassroomPage';
import StudentLibraryPage from '../pages/student/StudentLibraryPage';
import StudentAiMentorPage from '../pages/student/StudentAiMentorPage';
import StudentSportsPage from '../pages/student/StudentSportsPage';
import StudentEventsPage from '../pages/student/StudentEventsPage';
import StudentPortfolioPage from '../pages/student/StudentPortfolioPage';
import StudentFeesPage from '../pages/student/StudentFeesPage';
import StudentCommunicationsPage from '../pages/student/StudentCommunicationsPage';
import StudentNotificationsPage from '../pages/student/StudentNotificationsPage';
import StudentDocumentsPage from '../pages/student/StudentDocumentsPage';
import StudentSettingsPage from '../pages/student/StudentSettingsPage';
import StudentHelpPage from '../pages/student/StudentHelpPage';

// Common Pages
import ProfilePage from '../pages/common/ProfilePage';
import SettingsPage from '../pages/common/SettingsPage';
import ComingSoonPage from '../pages/common/ComingSoonPage';
import PrototypeViewPage from '../pages/common/PrototypeViewPage';

// Error Pages
import NotFoundPage from '../pages/error/NotFoundPage';
import ForbiddenPage from '../pages/error/ForbiddenPage';
import ServerErrorPage from '../pages/error/ServerErrorPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public & Auth Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />

      {/* Contextual Course Routes */}
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/courses/:courseId/learn/:lessonId" element={<LearningPlayerPage />} />
      <Route path="/courses/:courseId/assignments/:assignmentId" element={<AssignmentDetailPage />} />
      <Route path="/courses/:courseId/quizzes/:quizId" element={<QuizPlayerPage />} />
      <Route path="/academics/:courseId" element={<CourseDetailPage />} />

      {/* Authenticated Global Application Shell */}
      <Route element={<DashboardLayout />}>
        {/* STUDENT PORTAL ROUTES */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/profile" element={<ProfilePage />} />
        <Route path="/student/academics" element={<StudentAcademicsPage />} />
        <Route path="/student/courses" element={<StudentCoursesPage />} />
        <Route path="/student/timetable" element={<StudentTimetablePage />} />
        <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
        <Route path="/student/attendance" element={<StudentAttendancePage />} />
        <Route path="/student/examinations" element={<StudentExaminationsPage />} />
        <Route path="/student/results" element={<StudentExaminationsPage />} />
        <Route path="/student/report-card" element={<StudentReportCardPage />} />
        <Route path="/student/grades" element={<StudentGradesPage />} />
        <Route path="/student/classroom" element={<StudentClassroomPage />} />
        <Route path="/student/library" element={<StudentLibraryPage />} />
        <Route path="/student/ai-mentor" element={<StudentAiMentorPage />} />
        <Route path="/student/sports" element={<StudentSportsPage />} />
        <Route path="/student/events" element={<StudentEventsPage />} />
        <Route path="/student/portfolio" element={<StudentPortfolioPage />} />
        <Route path="/student/fees" element={<StudentFeesPage />} />
        <Route path="/student/communications" element={<StudentCommunicationsPage />} />
        <Route path="/student/notifications" element={<StudentNotificationsPage />} />
        <Route path="/student/documents" element={<StudentDocumentsPage />} />
        <Route path="/student/settings" element={<StudentSettingsPage />} />
        <Route path="/student/help" element={<StudentHelpPage />} />

        {/* Shorthand Navigation Aliases */}
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/academics" element={<StudentAcademicsPage />} />
        <Route path="/timetable" element={<StudentTimetablePage />} />
        <Route path="/homework" element={<StudentAssignmentsPage />} />
        <Route path="/homework/:assignmentId" element={<AssignmentDetailPage />} />
        <Route path="/attendance" element={<StudentAttendancePage />} />
        <Route path="/report-card" element={<StudentReportCardPage />} />
        <Route path="/classroom" element={<StudentClassroomPage />} />
        <Route path="/library" element={<StudentLibraryPage />} />
        <Route path="/settings" element={<StudentSettingsPage />} />

        {/* TEACHER / FACULTY ROUTES */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
        <Route path="/teacher/courses/new" element={<CourseFormPage />} />
        <Route path="/teacher/courses/:courseId/edit" element={<CourseFormPage />} />
        <Route path="/teacher/courses/:courseId/builder" element={<CourseBuilderPage />} />
        <Route path="/teacher/courses/:courseId/roster" element={<CourseRosterPage />} />
        <Route path="/teacher/courses/:courseId/students" element={<CourseRosterPage />} />
        <Route path="/teacher/classes" element={<TeacherClassesPage />} />
        <Route path="/teacher/assignments" element={<TeacherAssignmentsPage />} />
        <Route path="/teacher/attendance" element={<TeacherAttendancePage />} />
        <Route path="/teacher/grading" element={<GradingQueuePage />} />
        <Route path="/teacher/gradebook" element={<TeacherGradebookPage />} />
        <Route path="/teacher/calendar" element={<StudentTimetablePage />} />

        {/* PARENT & ADMIN ROUTES */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/children" element={<PrototypeViewPage title="Children Profiles" />} />
        <Route path="/parent/progress" element={<StudentGradesPage />} />
        <Route path="/parent/attendance" element={<StudentAttendancePage />} />
        <Route path="/parent/grades" element={<StudentReportCardPage />} />
        <Route path="/parent/assignments" element={<StudentAssignmentsPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Campus Life Modules */}
        <Route
          path="/sports"
          element={<StudentSportsPage />}
        />
        <Route
          path="/spiritual"
          element={
            <ComingSoonPage
              title="Spiritual Growth & Mindfulness"
              category="University Life & Well-Being"
              description="Guided mindfulness routines, reflective journaling, ethics workshops, and holistic inner development."
              iconType="spiritual"
            />
          }
        />
        <Route
          path="/innovation"
          element={
            <ComingSoonPage
              title="Innovation, Patents & Incubation"
              category="University Life & Research"
              description="Ideation pipelines, patent disclosure filings, student startup grants, and university IP mentorship."
              iconType="innovation"
            />
          }
        />
        <Route
          path="/career"
          element={
            <ComingSoonPage
              title="Career & Placement Portal"
              category="University Life & Industry"
              description="Campus placement drives, corporate internships, AI resume review, and alumni career mentorship networks."
              iconType="career"
            />
          }
        />
        <Route
          path="/xr-labs"
          element={
            <ComingSoonPage
              title="XR & Spatial Learning Labs"
              category="Immersive Technologies"
              description="Next-generation WebXR spatial simulations, virtual robotics dissection, and 3D architectural engineering models."
              iconType="xr-labs"
            />
          }
        />
      </Route>

      {/* Error Routes */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
