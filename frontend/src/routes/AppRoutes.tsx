import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Layout
import { DashboardLayout } from '../components/layout/DashboardLayout';

// Public & Auth Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/auth/LoginPage';

// Role Dashboards
import StudentDashboard from '../pages/dashboards/StudentDashboard';
import TeacherDashboard from '../pages/dashboards/TeacherDashboard';
import ParentDashboard from '../pages/dashboards/ParentDashboard';
import AdminDashboard from '../pages/dashboards/AdminDashboard';

// Teacher LMS Pages
import TeacherCoursesPage from '../pages/teacher/TeacherCoursesPage';
import CourseFormPage from '../pages/teacher/CourseFormPage';
import CourseBuilderPage from '../pages/teacher/CourseBuilderPage';
import CourseRosterPage from '../pages/teacher/CourseRosterPage';
import GradingQueuePage from '../pages/teacher/GradingQueuePage';
import TeacherGradebookPage from '../pages/teacher/TeacherGradebookPage';

// Student LMS & Academic Pages
import StudentCoursesPage from '../pages/student/StudentCoursesPage';
import StudentAssignmentsPage from '../pages/student/StudentAssignmentsPage';
import StudentGradesPage from '../pages/student/StudentGradesPage';
import CourseDetailPage from '../pages/student/CourseDetailPage';
import LearningPlayerPage from '../pages/student/LearningPlayerPage';
import AssignmentDetailPage from '../pages/student/AssignmentDetailPage';
import QuizPlayerPage from '../pages/student/QuizPlayerPage';
import StudentTimetablePage from '../pages/student/StudentTimetablePage';
import StudentAttendancePage from '../pages/student/StudentAttendancePage';
import StudentReportCardPage from '../pages/student/StudentReportCardPage';
import StudentClassroomPage from '../pages/student/StudentClassroomPage';
import StudentLibraryPage from '../pages/student/StudentLibraryPage';
import StudentAiMentorPage from '../pages/student/StudentAiMentorPage';

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
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Contextual Course Routes */}
      <Route path="/courses/:courseId" element={<CourseDetailPage />} />
      <Route path="/courses/:courseId/learn/:lessonId" element={<LearningPlayerPage />} />
      <Route path="/courses/:courseId/assignments/:assignmentId" element={<AssignmentDetailPage />} />
      <Route path="/courses/:courseId/quizzes/:quizId" element={<QuizPlayerPage />} />
      <Route path="/academics/:courseId" element={<CourseDetailPage />} />

      {/* Authenticated Global Application Shell */}
      <Route element={<DashboardLayout />}>
        {/* Student Routes */}
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCoursesPage />} />
        <Route path="/student/assignments" element={<StudentAssignmentsPage />} />
        <Route path="/student/grades" element={<StudentGradesPage />} />
        <Route path="/student/timetable" element={<StudentTimetablePage />} />
        <Route path="/student/attendance" element={<StudentAttendancePage />} />
        <Route path="/student/report-card" element={<StudentReportCardPage />} />
        <Route path="/student/classroom" element={<StudentClassroomPage />} />
        <Route path="/student/library" element={<StudentLibraryPage />} />
        <Route path="/student/ai-mentor" element={<StudentAiMentorPage />} />

        {/* Shorthand Navigation Aliases */}
        <Route path="/academics" element={<StudentCoursesPage />} />
        <Route path="/timetable" element={<StudentTimetablePage />} />
        <Route path="/homework" element={<StudentAssignmentsPage />} />
        <Route path="/homework/:assignmentId" element={<AssignmentDetailPage />} />
        <Route path="/attendance" element={<StudentAttendancePage />} />
        <Route path="/report-card" element={<StudentReportCardPage />} />
        <Route path="/classroom" element={<StudentClassroomPage />} />
        <Route path="/library" element={<StudentLibraryPage />} />
        <Route path="/ai-mentor" element={<StudentAiMentorPage />} />

        {/* University Life / Coming Soon Modules */}
        <Route
          path="/sports"
          element={
            <ComingSoonPage
              title="Sports & Athletic Tracking"
              category="University Life & Fitness"
              description="Track varsity sports performance, physical training routines, tournament schedules, and biometric milestones."
              iconType="sports"
            />
          }
        />
        <Route
          path="/spiritual"
          element={
            <ComingSoonPage
              title="Spiritual Growth & Mindfulness"
              category="University Life & Well-Being"
              description="Guided mindfulness routines, reflective journaling, ethics workshops, and holistic inner development tracks."
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
              description="Ideation pipelines, patent disclosure filings, student startup incubator grants, and university IP mentorship."
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

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeacherCoursesPage />} />
        <Route path="/teacher/courses/new" element={<CourseFormPage />} />
        <Route path="/teacher/courses/:id/edit" element={<CourseFormPage />} />
        <Route path="/teacher/courses/:id/builder" element={<CourseBuilderPage />} />
        <Route path="/teacher/courses/:id/students" element={<CourseRosterPage />} />
        <Route path="/teacher/grading" element={<GradingQueuePage />} />
        <Route path="/teacher/gradebook" element={<TeacherGradebookPage />} />
        <Route path="/teacher/classes" element={<StudentClassroomPage />} />
        <Route path="/teacher/assignments" element={<GradingQueuePage />} />
        <Route path="/teacher/attendance" element={<StudentAttendancePage />} />
        <Route path="/teacher/calendar" element={<StudentTimetablePage />} />
        <Route path="/teacher/messages" element={<PrototypeViewPage title="Student Messages" />} />

        {/* Parent Routes */}
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/children" element={<PrototypeViewPage title="Children Profiles" />} />
        <Route path="/parent/progress" element={<StudentGradesPage />} />
        <Route path="/parent/attendance" element={<StudentAttendancePage />} />
        <Route path="/parent/grades" element={<StudentReportCardPage />} />
        <Route path="/parent/assignments" element={<StudentAssignmentsPage />} />
        <Route path="/parent/messages" element={<PrototypeViewPage title="Teacher Communications" />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<PrototypeViewPage title="User & Faculty Management" />} />
        <Route path="/admin/institutions" element={<PrototypeViewPage title="Institutions & Campuses" />} />
        <Route path="/admin/academic" element={<TeacherCoursesPage />} />
        <Route path="/admin/reports" element={<PrototypeViewPage title="Institutional Reports & Analytics" />} />

        {/* Common Shared Pages */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* Error Routes */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
