-- V6__indexes_constraints.sql: Performance Indexes & Constraints
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_keycloak_id ON users(keycloak_id);
CREATE INDEX IF NOT EXISTS idx_courses_module ON courses(academic_module_id);
CREATE INDEX IF NOT EXISTS idx_courses_code ON courses(canonical_code);
CREATE INDEX IF NOT EXISTS idx_units_course ON units(course_id);
CREATE INDEX IF NOT EXISTS idx_topics_unit ON topics(unit_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_assignments_course ON assignments(course_id);
CREATE INDEX IF NOT EXISTS idx_submissions_asg_student ON submissions(assignment_id, student_profile_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance_records(student_profile_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance_records(session_date);
CREATE INDEX IF NOT EXISTS idx_timetable_module ON timetable_slots(academic_module_id);
CREATE INDEX IF NOT EXISTS idx_library_category ON library_items(category);
CREATE INDEX IF NOT EXISTS idx_library_subject ON library_items(subject_tag);
